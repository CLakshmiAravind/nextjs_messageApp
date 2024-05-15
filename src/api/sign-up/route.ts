import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs'


export async function GET(request: Request) {
    await dbConnect()

    try {
        const {username,email,password} = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified:true
        })
        if(existingUserVerifiedByUsername){
            return Response.json({},{status:400})
        }
    } catch (error) {
        console.error("Error registering User ", error);
        return Response.json({ success: false, message: "Error registering User." }, { status: 500 })

    }
}