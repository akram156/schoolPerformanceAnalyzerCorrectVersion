const Analyses = require("../models/Analyses");

exports.deleteAnalyses = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAnalyse = await Analyses.findByIdAndDelete(id);
    if (!deletedAnalyse) {
      return res.status(404).json({
        error: "التحليل غير موجود",
      });
    }
    return res.status(200).json({
      msg: "تم حدف التحليل بنجاح",
    });
  } catch (error) {
    return res.status(500).json({
      error: "حدث خطاء في الحدف حاول مجددا",
    });
  }
};
