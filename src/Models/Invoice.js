import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true },
  date: { type: Date, default: Date.now },
  clientName: { type: String, required: true },
  billingAddress: { type: String },
  clientEmail: { type: String },
// discount: { type: Number },
// taxPercentage: { type: Number },
  discount: { type: Number, default: 0 },
taxPercentage: { type: Number, default: 0 },
  items: [
  {
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number },
  },
],
  // items: [
  //   {
  //     description: { type: String },
  //     rate: { type: Number },
  //     quantity: { type: Number },
  //   },
  // ],
  subtotal: { type: Number },
  taxAmount: { type: Number },
  discountAmount: { type: Number },
  grandTotal: { type: Number },
  status: { type: String, enum: ['Paid', 'Unpaid', 'Pending'], default: 'Pending' },
});


const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;
