const express = require("express");
const { register, login } = require("../controllers/user.controller");
const {
  registerValidation,
  validation,
  loginValidation,
} = require("../middlewares/validation");
const router = express.Router();

router.post("/register", registerValidation, validation, register);
router.post("/login", loginValidation, validation, login);

module.exports = router;
