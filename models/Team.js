const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['Owner', 'Admin', 'Member'] }
    }],
});

module.exports = mongoose.model('Team', teamSchema);
