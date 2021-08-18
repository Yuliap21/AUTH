// Step 1

// something = gatekeeper for the collection

const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true
})

module.exports = model('User', userSchema);
