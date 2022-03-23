const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "name is required",
      unique: true,
    },
    fullName: { type: String, trim: true, required: "fullName is required" },
    logoLink: { type: String, trim: true, required: "logoLink is required" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", CollegeSchema);
