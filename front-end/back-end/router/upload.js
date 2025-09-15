const express = require('express');
const authToken = require('./middleware.js')
import {Uploader, Novel} from "../db";
import { fileUpload } from "../userValidation.js";
const router = express.Router();

router.get("/novel", async(req,res)=>{
    try{
        const novel = await Novel.find({},"imageURL novelName rating");
        res.status(200).json(novel)
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
})

router.post("/upload",authToken,async (req,res, next)=>{
    try
    {const fileMeta = {
        mimetype: req.file.mimetype,
        size: req.file.size
    }
    const isUpload = fileMeta.safeParse(req.file);
    if(!isUpload){
        return res.status(400).json({
            msg: "invalid file type or size"
        }); 
    }
    const uploadImage = await imageKit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname
    });

    const newUpload = new Uploader({
        aritistName: req.body.aritistName,
        imageURL: uploadRespose.url,
        uploadBy: req.user.userId
    });
    await newUpload.save();
    
    res.status(201).json({
            msg: "Novel uploaded successfully",
            data: newUpload
    });}
    catch(err){
        console.log(err);
        res.status(500).json({
            msg: "something went wrong", err: err.message
        })
    }

})

router.get("/bulk", async(req,res)=>{
    try{
    const filter = req.query.filter || "";
    
    const novel = await Novel.find({
        novelName: {$regex: filter, $options:"i"}
    }).select("imageURL novelName rating");
    
    res.status(200).json(novel);
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
})

export default router;




























// here is the upload with only imageURL, authToken without multer and cloudinary looks like ->
// Zod schema for validating image URL




// const imageSchema = z.object({
//   imageUrl: z.string().url(), // ensures it's a valid HTTP/HTTPS URL
// });

// // POST /upload
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     // Validate body with zod
//     const validatedData = imageSchema.parse(req.body);

//     // Save into DB (only the URL)
//     const newImage = await Image.create({
//       userId: req.user._id, // from auth token
//       imageUrl: validatedData.imageUrl,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Image URL stored successfully",
//       data: newImage,
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });