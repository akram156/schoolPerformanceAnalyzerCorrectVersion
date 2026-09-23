const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Teacher", "Administrator", "Principal"],
      default: "Principal",
    },
    profilePicture: {
      type: String,
      default: null,
    },
    licence: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Licence",
      required: true,
    },
    code: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    clouadinary_id:{
      type:String
    }
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
