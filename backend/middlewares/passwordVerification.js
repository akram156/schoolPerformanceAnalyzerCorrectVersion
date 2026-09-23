const { body, validationResult } = require("express-validator");

exports.passwordValidation=[
  body("currentPassword").notEmpty().withMessage("ادخل كلمة المرور الحالية"),
  body("newPassword").notEmpty().withMessage("ادخل كلمة المرورالجديدة"),
  body("confirmPassword").notEmpty().withMessage("ادخل كلمة تاكيد المرورالجديدة"),
]

exports.passwordErrors=(req,res,next)=>{
  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({
      errors:errors.array()
    })
  }
  next()
}