const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true }
});

const teamSchema = new mongoose.Schema({
  teamId: { type: String, required: true, unique: true },
  teamName: { type: String, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  participationType: { type: String, enum: ['AVINYOTSAV', 'HACKATHON', 'BOTH'], required: true },
  college: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  leader: { type: memberSchema, required: true },
  members: [memberSchema],
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  paymentStatus: { type: String, enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'], default: 'PENDING' },
  registrationStatus: { type: String, enum: ['PENDING_PAYMENT', 'PAYMENT_COMPLETED', 'CONFIRMED', 'CANCELLED'], default: 'PENDING_PAYMENT' },
  currentRound: { type: mongoose.Schema.Types.ObjectId, ref: 'Round' },
  qualificationStatus: { type: String, enum: ['PENDING', 'QUALIFIED', 'NOT_QUALIFIED', 'DISQUALIFIED'], default: 'PENDING' },
  classroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
  assignedFaculty: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  checkInStatus: { type: String, enum: ['NOT_CHECKED_IN', 'CHECKED_IN'], default: 'NOT_CHECKED_IN' },
  checkInTime: { type: Date },
  evaluationStatus: { type: String, enum: ['PENDING', 'EVALUATED'], default: 'PENDING' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Team', teamSchema);
