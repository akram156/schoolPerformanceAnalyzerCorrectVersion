const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.changePassword = async (req, res) => {
  try {
    const { id, currentPassword, newPassword, confirmPassword } = req.body;
    const foundUser = await User.findOne({ _id: id });
    if (!foundUser) {
      return res.status(404).json({
        error: "المستخدم غير موجود",
      });
    }
    if(newPassword!==confirmPassword){
      return res.status(409).json({
        error:'تاكيد كلمة المرور خاطىء'
      })
    }
    const checkPassword = await bcrypt.compare(currentPassword, foundUser.password);
    if (!checkPassword) {
      return res.status(409).json({
        error: "كلمة السر الحاليه التي ادخلت خاطءة",
      });
    }
    const saltRound = 10;
    const password =await  bcrypt.hash(newPassword, saltRound);
    await User.findByIdAndUpdate(id, {password});
    return res.status(200).json({
      msg: "تم تعديل كلمة المرور بنجاح",
    });
  } catch (e) {
    return res.status(500).json({
      error: "خطاء في التعديل حاول مجددا",
    });
  }
};
