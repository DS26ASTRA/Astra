const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  participationType: { type: String, enum: ['AVINYOTSAV', 'HACKATHON', 'BOTH'], required: true },
  amount: { type: Number, required: true },
  orderId: { type: String, required: true },
  paymentId: { type: String },
  signature: { type: String },
  status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'], default: 'PENDING' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
