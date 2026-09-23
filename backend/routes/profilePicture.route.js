const express = require("express");
const { profilePicture } = require("../controllers/profilePicture.controller");
const upload = require("../utils/multer");
const router = express.Router();

router.put("/profilePicture", upload.single("profileImage"), profilePicture);
module.exports = router;
