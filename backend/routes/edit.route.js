const express = require("express");
const { renameAnalyses } = require("../controllers/renameAnalyses.controller");
const { deleteAnalyses } = require("../controllers/deleteAnalyses.controller");
const router = express.Router();

router.put("/rename/:id", renameAnalyses);
router.delete("/delete/:id",deleteAnalyses)
module.exports = router;
