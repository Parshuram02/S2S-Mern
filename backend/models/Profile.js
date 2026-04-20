const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  _id: { type: String },  // use custom hex string as ID (like the original)
  name: { type: String, required: true },
  phone: { type: String, required: true },
  blood_group: { type: String, required: true },
  template: { type: String },
  password: { type: String, required: true },
  emergency_contact: { type: String },
  medical_conditions: { type: String },
  allergies: { type: String },
  medications: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', profileSchema);
