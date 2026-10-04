const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  venue: { type: String, required: true },
  capacity: { type: Number, required: true },
  assignedTeams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  assignedFaculty: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
});

module.exports = mongoose.model('Classroom', classroomSchema);
