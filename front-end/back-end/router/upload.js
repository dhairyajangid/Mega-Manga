import express from 'express';
import { Uploader, Novel } from '../db.js';
import { fileUpload } from '../userValidation.js';
import authToken from '../middleware/middleware.js';
import upload from '../middleware/upload.js';
import imageKit from '../config/imageKit.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();


router.get("/novel", async(req,res)=>{
    try{
        const novel = await Novel.find({},"imageURL novelName rating synopsis genre releaseDate uploadBy");
        if(!novel){
            return res.status(401).json({
                msg: "novel not found"
            });
        }
        res.status(200).json(novel)
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
})

router.post("/upload", authToken, upload.single("image"), async (req, res) => {
  try {
    const fileMeta = {
      mimetype: req.file.mimetype,
      size: req.file.size
    };

    const validated = fileUpload.safeParse(fileMeta);
    if (!validated.success) {
      return res.status(400).json({
        msg: "invalid file type or size"
      });
    }

    const uploadImage = await imageKit.upload({
      file: req.file.buffer.toString("base64"),
      fileName: req.file.originalname
    });

    const newUpload = new Uploader({
      artistName: req.body.artistName,
      imageURL: uploadImage.url,
      uploadBy: req.user.userId
    });

    await newUpload.save();

    res.status(201).json({
      msg: "Novel uploaded successfully",
      data: newUpload
    });

  } catch (err) {
    res.status(500).json({
      msg: "something went wrong",
      error: err.message
    });
  }
});


router.post("/novel/:id/upvote",async(req,res)=>{
    try {const {id} = req.params;
    const novel = await Novel.findById(id);
    if(!novel){
        res.status(404).json({
            msg: "Novel not found"
        })
    }
    novel.upvote +=1;
    await novel.save();

    res.status(200).json({
        Upvote: novel.upvote
    });
}catch(err){
    res.status(500).json({msg: "Error while upvoting", err});
}
});

router.get("/novel/:id/trending",async (req,res)=>{
    const {id} = req.params;
    const novel = await Novel.findById(id);

    if(!novel){
        res.status(404).json({
            msg: "novel not found"
        })
    }
    
    novel.isTrending = true;
    


});

// router.put("/novel/:id",authToken,(req,res, next)=>{
    
// });

// router.delete("/novel/:id",authToken,(req,res,next)=>{

// });


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
});

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