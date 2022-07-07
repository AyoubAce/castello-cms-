const express = require("express")
const mongoose = require("mongoose")

const menuSchema = mongoose.Schema({
    category: String,
    name: String,
    description: String,
    price: Number,
    active: Boolean,
},
{
    timestamps: true,
})
const MenuMessage = mongoose.model("MenuMessage",menuSchema)

const imageSchema = mongoose.Schema({
    key: String,
    name: String,
    selectedFile: String,
    createdAt:{
        type: Date,
        default: new Date()
    }
}
)
const ImgFileMessage = mongoose.model("ImageMessage", imageSchema)

const user= mongoose.Schema({
    name:{
        type: String,
        required: [true, "please add name"]
    },
    email:{
        type: String,
        required: [true, "please add email"],
        unique:true
    },
    password:{
        type: String,
        required: [true, "please add password"]
    }
},{
    timestamps:true,
})
const User= mongoose.model("User", user)

module.exports = {MenuMessage, ImgFileMessage,User}