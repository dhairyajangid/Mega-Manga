// first need to create the docker file that have the image of the mongoDB So, I can run the mongo

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/',{})
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
        required: true
    }
},{timestamps: true})

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
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