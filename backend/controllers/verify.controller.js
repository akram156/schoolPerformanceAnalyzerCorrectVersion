const Licence = require("../models/Licence");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
exports.verify = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "المستخدم غير موجود",
      });
    }
    if (user.isVerified) {
      return res.status(409).json({
        error: "هدا المستخدم موثق فقط قم بتسجيل الدخول",
      });
    }
    if (user.code !== code) {
      return res.status(403).json({
        error: "الرمز غير صحيح",
      });
    }
    ((user.isVerified = true), (user.code = null));
    await user.save();
    const foundLicence = await Licence.findOne({ _id: user.licence });
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    foundLicence.isActive = true;
    foundLicence.activatedAt = new Date();
    await foundLicence.save();
    res.status(200).json({
      msg: "تم انشاء الحساب بنجاح",
      token,
    });
  } catch (e) {
    res.status(500).json({
      error: "حدث خطا حاول مجددا",
    });
  }
};
