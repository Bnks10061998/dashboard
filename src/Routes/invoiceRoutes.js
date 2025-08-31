import express from "express";
import { createInvoice, getInvoices } from "../Controllers/invoice/invoiceController.js";

const router = express.Router();

router.post("/create", createInvoice);
router.get("/", getInvoices);

export default router;


// import express from 'express';
// import Invoice from '../Models/Invoice.js';

// const router = express.Router();

// // Create Invoice
// router.post('/create', async (req, res) => {
//   try {
//     const {
//       invoiceNumber,
//       date,
//       clientName,
//       billingAddress,
//       clientEmail,
//       discount,
//       taxPercentage,
//       items,
//     } = req.body;

//     const subtotal = items.reduce((acc, item) => acc + (item.rate * item.quantity), 0);
//     const discountAmount = (subtotal * (discount || 0)) / 100;
//     const taxAmount = ((subtotal - discountAmount) * (taxPercentage || 0)) / 100;
//     const grandTotal = subtotal - discountAmount + taxAmount;

//     const newInvoice = new Invoice({
//       invoiceNumber,
//       date,
//       clientName,
//       billingAddress,
//       clientEmail,
//       discount,
//       taxPercentage,
//       items,
//       subtotal,
//       discountAmount,
//       taxAmount,
//       grandTotal,
//     });

//     await newInvoice.save();
//     res.status(201).json({ message: 'Invoice created successfully', invoice: newInvoice });
//   } catch (err) {
//     console.error('Error creating invoice:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const invoices = await Invoice.find().sort({ date: -1 });
//     res.json(invoices);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch invoices' });
//   }
// });


// export default router;
