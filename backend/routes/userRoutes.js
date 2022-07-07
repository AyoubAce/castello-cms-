const express = require("express")
const router= express.Router()
const {userLogin, setUser}= require("../controllers/userController")



router.post("/login", userLogin)
router.post("/register", setUser)

module.exports= router
