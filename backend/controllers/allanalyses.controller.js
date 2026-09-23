const jwt = require("jsonwebtoken");
const Analyses = require("../models/Analyses");

exports.getAllAnalyses = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(400).json({
        error: "غير مسجل",
      });
    }
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const result = await Analyses.find({user:decodeToken.id}).select(
      "_id name educationalLevel schoolYear stream trimester result.overview createdAt",
    );
    return res.status(200).json({
      analyses: result,
    });
  } catch (error) {
    console.log(error);
  }
};
