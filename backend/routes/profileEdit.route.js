const express = require("express");
const { profileEdit } = require("../controllers/profileEdit.controller");
const {
  profileEditValidation,
  profileEditErrors,
} = require("../middlewares/profileEditVerification");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();

router.put("/edit", profileEditValidation, profileEditErrors, profileEdit);

module.exports = router;
