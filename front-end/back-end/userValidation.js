import {z} from zod;
export const UserSchemazod = z.object({
    firstname: z.string().min(15),
    lastname: z.string().min(15),
    email: z.string().email(),
    password: z.string().min(6)
})