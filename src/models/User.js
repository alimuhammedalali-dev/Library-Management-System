const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    phone: {
      required: true,
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      required: true,
      enum: ["member", "librarian", "manager"],
    },

    address: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    membershipNumber: {
      type: Number,
    },
    responsibleDepartment: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
