const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  round: { type: mongoose.Schema.Types.ObjectId, ref: 'Round' },
  criteria: {
    type: Map,
    of: Number,
    required: true
  },
  totalScore: { type: Number, required: true },
  remarks: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Evaluation', evaluationSchema);
