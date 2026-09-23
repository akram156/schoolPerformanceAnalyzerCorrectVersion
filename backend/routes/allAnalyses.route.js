const express = require("express");
const { getAllAnalyses } = require("../controllers/allanalyses.controller");
const router = express.Router();
router.get('/allAnalyses',getAllAnalyses)
module.exports = router;
