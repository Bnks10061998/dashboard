import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  zipCode: String,
  country: String,
  state: String,
  companyName: String,
  gst: String,
  pan: String,
  cin: String,
  notes: String,
}, { timestamps: true });

// module.exports = mongoose.model('Client', clientSchema);


export default mongoose.model('Client', clientSchema);