const express = require("express");
const { newAnalysis } = require("../controllers/newAnalysis.controller");
const excelFileMulter = require("../utils/excelFileMulter");
const isAuth = require("../middlewares/isAuth");
const { getAnalyse } = require("../controllers/getAnalyse.controller");
const router = express.Router();

router.post("/newAnalysis",isAuth,excelFileMulter.single("file"), newAnalysis);
router.get('/:id',isAuth,getAnalyse)
module.exports = router;
