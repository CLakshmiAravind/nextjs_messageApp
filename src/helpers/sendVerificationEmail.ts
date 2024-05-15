import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiRepsonse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiRepsonse>{
    try {
        await resend.emails.send({
            from:'onboarding@resend.dev',
            to:email,
            subject:'Verification Code.',
            react:VerificationEmail({username,otp:verifyCode})
        });
        return {success:true,message:"sent Verification mail"}
        
    } catch (error) {
        console.error("email failed to send ", error);
        return {success:false,message:"Failed to send Verification mail"}
        
    }
}