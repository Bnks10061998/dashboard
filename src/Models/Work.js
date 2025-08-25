import mongoose from 'mongoose';

const workSchema = new mongoose.Schema(
  {
    workName: String,
    startDate: Date,
    endDate: Date,
    description: String,
    remarks: String,
    image: String,
    video: String,
    docOrExcel: String,
  },
  { timestamps: true }
);

export default mongoose.model('Work', workSchema);
