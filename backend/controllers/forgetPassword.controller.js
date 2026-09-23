const User = require("../models/User");
const sendVerificationEmail = require("../utils/SendVerificationEmail");

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "الايمايل الدي ادخلت خاطىء",
      });
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.code = code;
    await user.save();
    sendVerificationEmail(email,code)
    return res.status(200).json({
      msg: "ادخل رمز التحقق لاعادة ضبط كلمة المرور",
    });
  } catch (error) {
    return res.status(500).json({
      error: "حدث خطاء حاول مجددا ",
    });
  }
};
