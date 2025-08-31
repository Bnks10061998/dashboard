import Invoice from "../../Models/Invoice.js";

// @desc    Create a new invoice
// @route   POST /api/invoices/create
// @access  Public (can add auth later)
export const createInvoice = async (req, res) => {
  try {
    const {
      invoiceNumber,
      date,
      clientName,
      billingAddress,
      clientEmail,
      discount,
      taxPercentage,
      items,
    } = req.body;
    
    const subtotal = (items && items.length > 0)
  ? items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  : 0;
    // const subtotal = items.reduce((acc, item) => acc + (item.rate * item.quantity), 0);
    const discountAmount = (subtotal * (discount || 0)) / 100;
    const taxAmount = ((subtotal - discountAmount) * (taxPercentage || 0)) / 100;
    const grandTotal = subtotal - discountAmount + taxAmount;

    const newInvoice = new Invoice({
      invoiceNumber,
      date,
      clientName,
      billingAddress,
      clientEmail,
      discount,
      taxPercentage,
      items,
      subtotal,
      discountAmount,
      taxAmount,
      grandTotal,
    });

    await newInvoice.save();
    res.status(201).json({ message: "Invoice created successfully", invoice: newInvoice });
  } catch (err) {
    console.error("Error creating invoice:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Public
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ date: -1 });
    res.json(invoices);
  } catch (err) {
    console.error("Error fetching invoices:", err);
    res.status(500).json({ message: "Failed to fetch invoices" });
  }
};


// PATCH /api/invoices/:id/status
export const updateInvoiceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.json(invoice);
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Server error" });
  }
};
