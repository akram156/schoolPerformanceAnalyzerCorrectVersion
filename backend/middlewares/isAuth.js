const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Licence = require("../models/Licence");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(400).json({
        error: "غير مسجل",
      });
    }
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decode token", decodeToken);
    const foundUser = await User.findOne({
      _id: decodeToken.id,
    });
    if (!foundUser) {
      return res.status(400).json({
        error: "المستخدم غير موجود",
      });
    }
    const licence = await Licence.findOne({ _id: foundUser.licence });
    const today = new Date();
    const expirationDate = new Date(licence.expiresAt);
    if (expirationDate < today) {
      return res.status(403).json({
        error: "انتهت مدة صلاحية الرخصة اتصل بالمطور لتحصل على رخصة جديدة",
      });
    }
    req.user = foundUser;
    req.licence = licence;
    next();
  } catch (error) {
    console.log(error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى",
      });
    }

    return res.status(401).json({
      error: "غير متحقق منه",
    });
  }
};

module.exports = isAuth;
