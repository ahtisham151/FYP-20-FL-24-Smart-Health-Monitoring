const mongoose = require("mongoose");

const PolicySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      enum: ["Terms and Conditions", "Privacy Policy"],
    },
    content: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Policy", PolicySchema);
