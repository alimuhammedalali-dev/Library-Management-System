const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  materialsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
    required: true
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  },
  disReview: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
