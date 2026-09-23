const User = require("../models/User");

exports.profileEdit = async (req, res) => {
  try {
    const { id, firstName, lastName, role } = req.body;
    console.log("id", id);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        role,
      },
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({
        error: "المستخدم غير موجود",
      });
    }
    return res.status(200).json({
      msg: "تم التعديل بنجاح",
    });
  } catch (e) {
    return res.status(500).json({
      error: "خطا في التعديل حاول مجددا",
    });
  }
};
