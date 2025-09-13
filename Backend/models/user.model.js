const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    role: { type: String, enum: ['member', 'admin'], default: 'member' },
    creeatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);