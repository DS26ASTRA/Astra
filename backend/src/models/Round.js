const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roundNumber: { type: Number, required: true },
  startTime: { type: Date },
  endTime: { type: Date },
  qualifiedTeams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  status: { type: String, enum: ['UPCOMING', 'ACTIVE', 'COMPLETED'], default: 'UPCOMING' }
});

module.exports = mongoose.model('Round', roundSchema);
