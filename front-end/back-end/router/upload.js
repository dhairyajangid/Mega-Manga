import express from 'express';
import { Novel } from '../db.js';
import { fileUpload, novelVal } from '../userValidation.js';
import authToken from '../middleware/middleware.js';
import upload from '../middleware/upload.js';
import imageKit from '../config/imageKit.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();


router.get("/novelDt", async(req,res)=>{
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
});

// router.post("/upload", authToken, upload.single("image"), async (req, res) => {
//   try {
//     const fileMeta = {
//       mimetype: req.file.mimetype,
//       size: req.file.size
//     };

//     const validated = fileUpload.safeParse(fileMeta);
//     if (!validated.success) {
//       return res.status(400).json({
//         msg: "invalid file type or size"
//       });
//     }

//     const uploadImage = await imageKit.upload({
//       file: req.file.buffer.toString("base64"),
//       fileName: req.file.originalname
//     });

//     const newUpload = new Uploader({
//       artistName: req.body.artistName,
//       imageURL: uploadImage.url,
//       uploadBy: req.user.userId
//     });

//     await newUpload.save();

//     res.status(201).json({
//       msg: "Novel uploaded successfully",
//       data: newUpload
//     });

//   } catch (err) {
//     res.status(500).json({
//       msg: "something went wrong",
//       error: err.message
//     });
//   }
// });

router.post("/novel", authToken, upload.single("image"), async (req, res) => {
  try {
    // Validate file
    if (!req.file) {
      return res.status(400).json({ msg: "Image file required" });
    }

    const fileMeta = {
      mimetype: req.file.mimetype,
      size: req.file.size
    };

    const validatedFile = fileUpload.safeParse(fileMeta);
    if (!validatedFile.success) {
      return res.status(400).json({ msg: "Invalid file type or size" });
    }

    // PARSE FORM-DATA BEFORE VALIDATION
    const parsedBody = {
      novelName: req.body.novelName,
      synopsis: req.body.synopsis,
      novelType: req.body.novelType,
      artist: req.body.artist,
      genre: Array.isArray(req.body.genre) ? req.body.genre : [req.body.genre],
      rating: parseFloat(req.body.rating), // Convert string to number
      releaseDate: req.body.releaseDate ? req.body.releaseDate : undefined
    };

    console.log("Parsed body:", parsedBody);

    // Validate novel body
    const validatedNovel = novelVal.safeParse(parsedBody);
    if (!validatedNovel.success) {
      console.log("Validation errors:", validatedNovel.error.errors);
      return res.status(400).json({
        msg: "Invalid novel data",
        errors: validatedNovel.error.errors
      });
    }

    // Upload image to ImageKit
    const uploadedImage = await imageKit.upload({
      file: req.file.buffer.toString("base64"),
      fileName: req.file.originalname
    });

    const data = validatedNovel.data;

    // Create Novel
    const newNovel = new Novel({
      novelName: data.novelName,
      synopsis: data.synopsis,
      genre: data.genre,
      noveltype: data.novelType,
      artist: data.artist,
      rating: data.rating,
      releaseDate: data.releaseDate,
      imageURL: uploadedImage.url,
      uploadBy: req.user.userId,
      upvote: 0,
    });

    await newNovel.save();

    res.status(201).json({
      msg: "Novel uploaded successfully",
      data: newNovel
    });

  } catch (err) {
    res.status(500).json({
      msg: "Something went wrong",
      error: err.message
    });
  }
});


router.post("/novel/:id/upvote", async (req, res) => {
  try {
    const { id } = req.params;

    const novel = await Novel.findById(id);
    if (!novel) {
      return res.status(404).json({ msg: "Novel not found" });
    }

    novel.upvote += 1;
    await novel.save();

    res.status(200).json({ upvote: novel.upvote });
  } catch (err) {
    res.status(500).json({ msg: "Error while upvoting", error: err.message });
  }
});



router.get("/novel/trending", async (req, res) => {
  try {
    const novels = await Novel.find().sort({ upvote: -1 }).limit(10);

    res.status(200).json({
      msg: "Trending novels",
      data: novels,
    });

  } catch (err) {
    res.status(500).json({ msg: "Error loading trending novels", error: err.message });
  }
});


// router.put("/novel/:id",authToken,(req,res, next)=>{
    
// });

router.put("/novel/:id", authToken, async (req, res) => {
  try {
    // Validate body using zod
    const validated = novelVal.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({
        msg: "Invalid novel data",
        errors: validated.error.errors
      });
    }

    const { id } = req.params;

    // Find novel
    const novel = await Novel.findById(id);
    if (!novel) {
      return res.status(404).json({ msg: "Novel not found" });
    }

    // Only uploader can update
    if (novel.uploadBy.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "Unauthorized to update this novel" });
    }

    // Update allowed fields
    const data = validated.data;
    novel.novelName = data.novelName;
    novel.synopsis = data.synopsis;
    novel.genre = data.genre;
    novel.noveltype = data.novelType;
    novel.rating = data.rating;
    if (data.releaseDate) novel.releaseDate = data.releaseDate;

    await novel.save();

    res.status(200).json({
      msg: "Novel updated successfully",
      data: novel
    });

  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
});


// router.delete("/novel/:id",authToken,(req,res,next)=>{

// });

router.delete("/novel/:id", authToken, async (req, res) => {
  try {
    const { id } = req.params;

    const novel = await Novel.findById(id);
    if (!novel) {
      return res.status(404).json({ msg: "Novel not found" });
    }

    // Only uploader can delete
    if (novel.uploadBy.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "Unauthorized to delete this novel" });
    }

    await Novel.findByIdAndDelete(id);

    res.status(200).json({ msg: "Novel deleted successfully" });

  } catch (err) {
    res.status(500).json({
      msg: "Something went wrong",
      error: err.message
    });
  }
});



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