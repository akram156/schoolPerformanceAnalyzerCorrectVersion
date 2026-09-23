const User = require("../models/User");
const bcrypt=require('bcrypt')
exports.resetPassword = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "المستخدم غير موجود",
      });
    }
    if (user.code != code) {
      return res.status(403).json({
        error: "الرمز غير صحيح",
      });
    }
    user.code = null;
    await user.save();
    return res.status(200).json({
      msg: "success",
    });
  } catch (error) {
    return res.status(500).json({
      error: "حدث خطاء حاول مجددا ",
    });
  }
};
 exports.resetPassword2=async(req,res)=>{
  try{
    const {email,password,confirmPassword}=req.body
    if(password!==confirmPassword){
      return res.status(409).json({
        error:"تاكيد كلمة المرور خاطىء"
      })
    }
    if(password.trim().length<=8){
      return res.status(400).json({
        error:'كلمة المرور قصيرة'
      })
    }
    const user=await User.findOne({email})
    if(!user){
      return res.status(404).json({
        error:"المستخدم غير موجود"
      })
    }
    const saltRound=10
    const hashedPassword=await bcrypt.hash(password,saltRound)
    user.password=hashedPassword
    await user.save()
    return res.status(200).json({
      msg:'تم تغيير كلمة المرور بنجاح'
    })
  }catch(error){
    return res.status(500).json({
      error:"حدث خطاء حاول مجددا"
    })
  }
 }