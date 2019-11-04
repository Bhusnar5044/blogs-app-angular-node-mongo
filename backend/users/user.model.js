const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
