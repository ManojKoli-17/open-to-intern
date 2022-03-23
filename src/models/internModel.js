const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const InternSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: "name is required" },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: "email is required"
    },
    mobile: { type: String, trim: true, required: "mobile is required" },
    collegeId: {
      type: ObjectId,
      required: "collegeId is required",
      ref: "College",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interns", InternSchema);
