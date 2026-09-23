const Analyses = require("../models/Analyses");

exports.renameAnalyses = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (name.trim() == "") {
      return res.status(400).json({
        error: "اسم التحليل فارغ ادخل اسم صحيح",
      });
    }
    const updatedAnalyse = await Analyses.findByIdAndUpdate(id, {
      $set: { name },
    });
    if (!updatedAnalyse) {
      return res.status(404).json({
        error: "التحليل غير موجود",
      });
    }
    return res.status(200).json({
      msg: "تم اعادة التسمية بنجاح",
    });
  } catch (error) {
    return res.status(500).json({
      error: "حدث خطا في اعادة التسمية حاول مجددا",
    });
  }
};
