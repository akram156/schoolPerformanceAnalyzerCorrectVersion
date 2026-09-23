const express=require("express")
const { verify } = require("../controllers/verify.controller")
const router=express.Router()

router.post("/verify",verify)
module.exports=router