const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  theme: { type: String },
  description: { type: String },
  participationOptions: [{ type: String }],
  prices: {
    AVINYOTSAV: { type: Number, default: 150 },
    HACKATHON: { type: Number, default: 500 },
    BOTH: { type: Number, default: 650 }
  },
  registrationStart: { type: Date },
  registrationEnd: { type: Date },
  status: { type: String, enum: ['UPCOMING', 'ACTIVE', 'COMPLETED'], default: 'ACTIVE' }
});

module.exports = mongoose.model('Event', eventSchema);
