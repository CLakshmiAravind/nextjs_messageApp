import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs'


export async function GET(request: Request) {
    await dbConnect()

    try {
        const { username, email, password } = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })
        if (existingUserVerifiedByUsername) {
            return Response.json({ success: true, message: "Username is already taken." }, { status: 400 })
        }

        const existingUserByEmail = await UserModel.findOne({ email })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success:false,
                    message:"User already registered."
                },{
                    status:400
                })
            }
            else{
                const hassedPwd = await bcrypt.hash(password, 10)
                const expiryDate = new Date()
                expiryDate.setHours(expiryDate.getHours() + 1)

                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.password = hassedPwd
                existingUserByEmail.verifyCodeExpiry = expiryDate

                await existingUserByEmail.save()
            }
            // TODO:
        }
        else {
            const hassedPwd = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hassedPwd,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                messages: []
            })

            await newUser.save()
        }

        // send Verification Email
        const emailResponse = await sendVerificationEmail(email,username,verifyCode)
        if(emailResponse.success){
            return Response.json({
                success:false,
                message: emailResponse.message
            },{
                status:500
            })
        }
        return Response.json({
            success:true,
            message: "Please check your mail.  E-mail is sent successfully."
        },{
            status:201
        })

    } catch (error) {
        console.error("Error registering User ", error);
        return Response.json({ success: false, message: "Error registering User." }, { status: 500 })

    }
}