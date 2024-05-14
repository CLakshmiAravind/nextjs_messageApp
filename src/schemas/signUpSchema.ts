import {z} from 'zod'


export const usernameValidation = z.string().min(6).max(20)

export const signUpSchema = z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invcalid Email Address."}),
    password:z.string().min(6,{message:"Password should contain atleast 6 characters."})
})