const express=require("express")
const { changePassword } = require("../controllers/changePassword.controller")
const { passwordValidation, passwordErrors } = require("../middlewares/passwordVerification")
const router=express.Router()
router.put("/changePassword",passwordValidation,passwordErrors,changePassword)

module.exports=router