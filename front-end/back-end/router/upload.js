const express = required('express');
import { Collection } from "mongoose";
import {Uploader, Novel} from "../db";
import {novelVal} from "../userValidation"
const router = express.Router();

router.get("/novel", async(req,res)=>{
    try{
        const novel = await Novel.find({},"imageURL title rating");
        res.status(200).json(novel)
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
})

