const express = require('express');

import {Uploader, Novel} from "../db";
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

router.post("/upload",(req,res, next)=>{
    
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