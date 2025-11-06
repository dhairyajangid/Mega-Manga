// first need to create the docker file that have the image of the mongoDB So, I can run the mongo

const mongoose = require('mongoose');

const DB_URL = process.env.atlas_URL;
mongoose.connect(DB_URL,{})
.then(()=>console.log("connect the DB") )
.catch((e)=>console.log("error will connecting :",e));

const NovelSchema = new mongoose.Schema({
    novelName:{
        type: String,
        required:true,
        unique: true
    },

    artist: {type: mongoose.Types.ObjectId, ref:"Uploader"},
    uploadBy: {type: mongoose.Types.ObjectId, ref: "User"},
    
    synopsis: {
        type: String,
        required: true,
    },

    genre: {type: [String], required: true},
    
    imageURL:{
        type: String,
        required: true,
    },
    noveltype:{type: String, required: true,},
    
    views:{
        type: Number,
        default: 0
    },

    bookmarks: { type: Number, default: 0 },
    
    commentsCount: { type: Number, default: 0 },

    rating: {
        type: Number,
        default: 0
    },
    releaseDate: {
        type: Date,
        default: Date.now
    }
},{timestamps: true})



const UploaderSchema = new mongoose.Schema({
    artistName:{
        type: String,
        required: true,
        unique: true
    },
    imageURL:{
        type: String,
        default: " "
    }
},{timestamps: true})

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
    },
    artistName:{
        type: String,
        default: ""
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    profileImage:{
        type: String,
        default: " "
    },
    artists:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Uploader"
        }
    ]

},{timestamps: true})



const User = mongoose.model('User', UserSchema);
const Uploader = mongoose.model('Uploader', UploaderSchema);
const Novel = mongoose.model('Novel', NovelSchema);

module.exports = {User, Uploader, Novel}