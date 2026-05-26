const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
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
  reservedAt: {
    type: Date,
    default: Date.now
  },
  queuePriority: {
    type: Number,
    default: 1
  },
  notifiedWhenAvailable: {
    type: Boolean,
    default: false
  },
  autoCancelAfter: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
