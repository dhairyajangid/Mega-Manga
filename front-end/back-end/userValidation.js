import { z } from 'zod';

export const UserSignup = z.object({
    username: z.string().min(2).max(50),
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    artistName: z.string().min(2).max(50),  // ADD THIS
    email: z.string().email(),
    password: z.string().min(6).max(8)
});

export const UserSignin = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(8)
});

export const novelVal = z.object({
    synopsis: z.string().min(20).max(500),
    novelName: z.string().min(3),
    novelType: z.enum(["Light Novel", "Web Novel", "Manga", "Manhua", "Manhwa", "Novel"]),
    // artistName: z.string().min(2),  // CHANGE: from ObjectId to string
    genre: z.array(z.string()),
    releaseDate: z.coerce.date().optional(),
    rating: z.number().min(0).max(10)
});

export const fileUpload = z.object({
    mimetype: z.enum(["image/jpeg", "image/png", "image/webp"]),
    size: z.number().max(5 * 1024 * 1024)
});