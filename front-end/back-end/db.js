// first need to create the docker file that have the image of the mongoDB So, I can run the mongo

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/',{})
.then(()=>console.log("connect the DB") )
.catch((e)=>console.log("error will connecting :",e));

const NovelSchema = new mongoose.Schema({
    NovelName:{
        type: String,
        require:true,
        unique: true
    },
    artistName: {type: mongoose.Types.ObjectId, ref:"UploaderSchema"},
    synpsis: {
        type: String,
        require: true,
    },
    genre: {type: String, require: true},
    imageURL:{
        type: String,
        require: true,
    },
    noveltype:{type: String, require: true,},
    rating:{type: Number}
})



const UploaderSchema = new mongoose.Schema({
    artistName:{
        type: String,
        require: true,
        unique: true
    },
    imageURL:{
        type: String,
        require: true
    }
})

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        require: true,
    },
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    artists:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Uploader"
        }
    ]

})



const User = mongoose.model('User', UserSchema);
const Upload = mongoose.model('upload', UploaderSchema);