import {z} from zod;
export const UserSignup = z.object({
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6).max(8)
})

export const UserSignin = z.object({
    email:z.string().email(),
    password: z.string().min(6).max(8)
})

export const novelVal = z.object({
    synopsis: z.string().min(20).max(500),
    novelName: z.string().min(3),
    artist: z.string().min(6),
    genre: z.array(z.string()), // here in mongo schema genre is array of string not single string that why.
    imageURL: z.string().url(),
    releaseDate: z.string().datetime(),
    rating: z.number().min(0).max(5)

})