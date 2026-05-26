const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    loanDate: {
        type: Date, 
        required: true, 
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    actualReturnDate: {
        type: Date
    },
    status: { 
        type: String, 
        required: true, 
        enum: ['active', 'returned', 'overdue', 'cancelled'],
        default: 'active'
    },
    finePerDay: {
        type: Number,
         default: 1
    },
    totalFineAmount: {
        type: Number,
        default: 0
    },
    paymentStatus: { 
        type: String, 
        required: true, 
        enum: ["paid", "unpaid"],
        default: "unpaid"
    },
    materialsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material', required: true},
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);
