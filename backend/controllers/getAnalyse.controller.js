const Analyses = require("../models/Analyses");

exports.getAnalyse = async (req, res) => {
  try {
    const { id } = req.params;
    const analyse = await Analyses.findOne({ _id: id });
    if (!analyse) {
      return res.status(404).json({
        msg: "التحليل غير موجود",
      });
    }
    return res.status(200).json({
      msg: "تم التحليل بنجاح",
      analyse,
    });
  } catch (error) {
    return res.status(500).json({
      error: "حاول مجددا",
    });
  }
};
