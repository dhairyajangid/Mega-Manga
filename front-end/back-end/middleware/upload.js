const multer = require('multer');

const storage = multer.memoryStorage();

const fileType = (req,res,cb)=>{
    const allowType = ["image/jpge ","image/png", "image/webp"]
    if(allowType.includes(file.mimetype)){
        cb(null,ture);
    }else{
        cb(new Error("Only jpeg, png and webp files are allowed"));
    }
}

const upload = multer({
    storage,
    limits:{filesize:5*1024*1024},
    fileFilter
});

export default upload;