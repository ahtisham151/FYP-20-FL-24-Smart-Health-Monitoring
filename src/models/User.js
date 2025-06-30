const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: { type: String, required: true },

    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    address: { type: String },
    emergencyContact: { type: String },

    // Health-specific fields
    bloodPressure: { type: Number }, // Example: 130 (single systolic or processed average value)
    cholesterol: { type: Number }, // Example: 220 mg/dL

    chestPain: {
      type: Number,
      enum: [0, 1, 2, 3], // 0: asymptomatic, 1: typical angina, 2: atypical angina, 3: non-anginal pain
      default: 0,
    },
    diabetes: {
      type: Number,
      enum: [0, 1], // 0: fasting blood sugar ≤ 120 mg/dL, 1: > 120 mg/dL
      default: 0,
    },
    electrocardiogramVariation: {
      type: Number,
      enum: [0, 1], // 0: normal, 1: ST-T wave abnormality
      default: 0,
    },

    // User-related
    profilePicture: { type: String },
    profileCompleted: { type: Boolean, default: false },
    deviceToken: { type: String },
    sessionToken: { type: String },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    termsAndConditions: { type: Boolean },
    privacyPolicy: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
