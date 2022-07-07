const express = require("express")
const multer = require("multer")
const multerS3= require("multer-s3")

const {upload}= require("../s3/s3")
const {protect} = require("../middleware/auth")
const router = express.Router()
const {getFile, setFile, deleteFile} = require("../controllers/imgFileController")

router.get("/" , getFile)
router.post("/",protect, upload.single("image"), setFile)
// router.put("/:id", updateFile)
router.delete("/:id",protect, deleteFile)


module.exports = router

