
const express =require("express")
const router = express.Router()
const {getMenu, setMeal, updateMeal, deleteMeal} = require('../controllers/menuController')
const {protect} = require("../middleware/auth")

// set post put and delete to private
// leave get public
router.get("/",getMenu)
router.post("/",protect, setMeal )
router.put("/:id",protect, updateMeal)
router.delete("/:id",protect,deleteMeal)

module.exports= router

