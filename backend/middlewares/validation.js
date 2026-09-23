const { body, validationResult } = require("express-validator");

exports.registerValidation = [
  body("firstName").notEmpty().withMessage("الاسم مطلوب"),
  body("lastName").notEmpty().withMessage("اللقب مطلوب"),
  body("licence").notEmpty().withMessage("الرخصة غير صحيحة"),
  body("email").isEmail().withMessage("ادخل ايمايل صحيح"),
  body("password")
    .isLength({ min: 6, max: 15 })
    .withMessage("كلمة المرور قصيرة"),
];

exports.loginValidation = [
  body("email").isEmail().withMessage("ادخل ايمايل صحيح"),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};
