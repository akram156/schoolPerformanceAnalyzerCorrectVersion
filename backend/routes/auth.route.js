const express = require("express");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();

router.get("/current", isAuth, (req, res) => {
  return res.json({
    user: req.user,
    licence: req.licence,
  });
});

module.exports = router;
