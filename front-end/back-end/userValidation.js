import {z} from zod;
export const UserSignup = z.object({
    firstname: z.string().min(15),
    lastname: z.string().min(15),
    email: z.string().email(),
    password: z.string().min(6)
})

export const UserSignin = z.object({
    email:z.string().email(),
    password: z.string().min(6)
})