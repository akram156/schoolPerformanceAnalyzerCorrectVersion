const { body, validationResult } = require("express-validator");

exports.profileEditValidation = [
  body("firstName").notEmpty().withMessage("الاسم مطلوب"),
  body("lastName").notEmpty().withMessage("اللقب مطلوب"),
  body("role")
    .isIn(["Teacher", "Administrator", "Principal"])
    .withMessage("الدور غير صحيح"),
];

exports.profileEditErrors=(req,res,next)=>{
  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({
      errors:errors.array()
    })
  }
  next()
}