const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    priority: { type: String, enum: ['low', 'medium', 'high'] },
    dueDate: Date,
    completed: { type: Boolean, default: false },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    recurringInterval: { type: String, enum: ['daily', 'weekly', 'monthly'] },
    lastCompletedAt: Date,
    history: [{ updatedBy: mongoose.Schema.Types.ObjectId, changes: Object, timestamp: Date }]
});

module.exports = mongoose.model('Task', taskSchema);
