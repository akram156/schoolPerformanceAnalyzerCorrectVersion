const express = require("express");
const { forgetPassword } = require("../controllers/forgetPassword.controller");
const {
  resetPassword,
  resetPassword2,
} = require("../controllers/resetPassword.controller");
const router = express.Router();

router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword", resetPassword);
router.put("/resetPassword2", resetPassword2);
module.exports = router;
