const mongoose = require("mongoose");

const LicenceSchema = new mongoose.Schema(
  {
    licenceKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    activatedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Licence = mongoose.model("Licence", LicenceSchema);
module.exports = Licence;
