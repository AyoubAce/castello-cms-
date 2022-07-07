const path = require("path")
const express = require("express")
const bodyParser= require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const multer = require("multer")
const dotenv =require("dotenv").config()
const connectDB = require("./configdb/mongodb")
const menuRoutes = require("./routes/menuRoutes")
const fileRoutes = require("./routes/fileRoutes")
const userRoutes= require("./routes/userRoutes")

const PORT = process.env.PORT || 5001

connectDB()

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors())

app.use("/api/menu", menuRoutes)
app.use("/api/thumbs", fileRoutes)
app.use("/api/user", userRoutes)

//frontend
app.use(express.static(path.join(__dirname, "../frontend/build")))
app.get("*", (req, res)=>res.sendFile(path.resolve(__dirname,"../","frontend", "build", "index.html")))

app.listen(PORT, ()=>{
    console.log("listening on", PORT);
})
