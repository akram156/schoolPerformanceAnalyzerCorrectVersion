const mongoose = require("mongoose");
const AnalysesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    educationalLevel: {
      type: String,
      enum: ["middle school", "high school"],
      required: true,
    },
    schoolYear: {
      type: String,
      required: true,
    },
    stream: {
      type: String,
      default: null,
    },
    trimester: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },
    file: {
      originalName: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        default: null,
      },
      type: {
        type: String,
        default: null,
      },
    },

    result: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

AnalysesSchema.index({
  user: 1,
  createdAt: -1,
});

AnalysesSchema.index({
  user: 1,
  schoolYear: 1,
  stream: 1,
  trimester: 1,
});

const Analyses = mongoose.model("Analyses", AnalysesSchema);
module.exports = Analyses;
