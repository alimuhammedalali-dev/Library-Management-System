const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    materialType: {
      type: String,
      required: true,
      enum: ["book", "magazine", "cd", "map"],
    },
    available :{
      type :Boolean,
      required : true,
      default : true
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    publisher: {
      type: String,
    },
    totalCopies: {
      type: Number,
      required: true,
    },
    availableCopies: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    ISBN: {
      type: String
    },
    coverImageUrl: {
      type: String,
    },
    issueNumber: {
      type: Number
    },
    month: {
      type: String,
    },
    year: {
      type: Number,
      required : true
    },
    userID :{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("Material", materialSchema);
