const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),

  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    const allowedExtensions = [".xlsx", ".xls"];

    const allowedMimeTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (
      !allowedExtensions.includes(ext) ||
      !allowedMimeTypes.includes(file.mimetype)
    ) {
      return cb(new Error("Only Excel files are allowed!"), false);
    }

    cb(null, true);
  },
});
