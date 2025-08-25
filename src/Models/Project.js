import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
  status: { type: String, enum: ['In Progress', 'Completed', 'Pending'], default: 'Pending' },
  startDate: { type: String, required: true},
  deadline: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Low' },
  teamMembers: [{ type: String }]
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
