const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  budget: { type: String, required: true },
  status: { type: String, enum: ['Planning', 'In Progress', 'Completed', 'On Hold'], default: 'Planning' },
  progress: { type: Number, default: 0 },
  dueDate: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
