const jwt = require("jsonwebtoken");
const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");
exports.profilePicture = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const foundUser = await User.findOne({ _id: decodeToken.id });
    if (!foundUser) {
      return res.status(404).json({
        error: "المستخدم غير موجود",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        error: "لم يتم اختيار صورة",
      });
    }
    if (foundUser.cloudinary_id) {
      await cloudinary.uploader.destroy(foundUser.cloudinary_id);
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    foundUser.profilePicture = result.secure_url;
    foundUser.cloudinary_id = result.public_id;
    await foundUser.save();
    return res.status(200).json({
      msg: "تم تعديل الصورة",
    });
  } catch (e) {
    return res.status(500).json({
      error: "حدث خطاء اثناء تعديل الصورة حاول مرة اخرى",
    });
  }
};
