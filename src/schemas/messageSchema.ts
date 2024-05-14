import {z} from 'zod'

export const messageSchema = z.object({
    content : z.string().min(5,'Content has to length of atleast 5').max(300,'Content must be less than 300 characters.'),
})