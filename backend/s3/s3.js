const aws = require("aws-sdk")
const multer = require("multer")
const multerS3= require("multer-s3")



const s3= new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_BUCKET_REGION
})
const upload = multer({
    storage: multerS3({
        s3,
        bucket:process.env.AWS_BUCKET_NAME,
       
        metadata: (req,file,cb)=>{
            cb(null, {fieldName: file.fieldname})
            console.log("multer s3 metaData:", file);
        },
        key: (req, file, cb)=>{
            cb(null, Date.now().toString()+file.originalname)
        }
    })
})
module.exports={upload}