import { useState, useEffect } from "react";
import InvoicePDF from "./InvoicePDF";
import axios from "axios";

const Invoices = () => {
  const [openModal, setOpenModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    clientName: "",
    invoiceNumber: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    items: [{ description: "", quantity: 1, price: 0 }],
  });

  // Fetch Clients
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/clients")
      .then((res) => setClients(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  // Handle client select
  const handleClientSelect = (e) => {
    setInvoiceData({ ...invoiceData, clientName: e.target.value });
  };

  // Handle item change
  // const handleItemChange = (index, field, value) => {
  //   const updatedItems = [...invoiceData.items];
  //   updatedItems[index][field] = value;
  //   setInvoiceData({ ...invoiceData, items: updatedItems });
  // };
  const handleItemChange = (index, field, value) => {
  const updatedItems = [...invoiceData.items];
  updatedItems[index][field] = value;
  setInvoiceData({ ...invoiceData, items: updatedItems });
};

  // Add item
  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: "", quantity: 1, price: 0 }],
    });
  };

  // Remove item
  const removeItem = (index) => {
    const updatedItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: updatedItems });
  };

  // Save invoice
  const handleSave = () => {
    axios
      .post("http://localhost:5000/api/invoices/create", invoiceData)
      .then(() => {
        alert("Invoice Saved Successfully!");
        setOpenModal(false);
      })
      .catch((err) => console.error(err));
  };

  // Calculate totals
  const subTotal = invoiceData.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const grandTotal = subTotal; // can extend with tax/discount later

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create Invoice
        </button>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Create Invoice
            </h2>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Client Select */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Select Client
                </label>
                <select
                  value={invoiceData.clientName}
                  onChange={handleClientSelect}
                  className="border p-2 w-full rounded"
                >
                  <option value="">-- Select Client --</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client.name}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Invoice Number */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Invoice Number
                </label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={invoiceData.invoiceNumber}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={invoiceData.date}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={invoiceData.dueDate}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
            </div>

            {/* Items */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Invoice Items</h3>
                  <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                  >
                    + Add Item
                  </button>
                </div>
                 <div className="space-y-3">
               {invoiceData.items.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-3 items-center border p-3 rounded-lg"
                    >
                      {/* Description */}
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(index, "description", e.target.value)
                        }
                        className="col-span-6 border p-2 rounded"
                      />

                      {/* Quantity */}
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", +e.target.value)
                        }
                        className="col-span-2 border p-2 rounded"
                      />

                      {/* Price */}
                      <input
                        type="number"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(index, "price", +e.target.value)
                        }
                        className="col-span-3 border p-2 rounded"
                      />

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="col-span-1 flex justify-center text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  </div>
            
               </div>

            {/* Totals */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between font-bold">
                <span>Subtotal:</span>
                <span>₹{subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Grand Total:</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-4">
              {/* PDF Download */}
              <InvoicePDF invoiceData={invoiceData} />

              {/* Save Button */}
              <button
                type="button"
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;



// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import InvoicePDF from './InvoicePDF';
// import { Plus, Trash2, FileText } from 'lucide-react';

// const Invoices = () => {
//   const [clients, setClients] = useState([]);
//    const [openModal, setOpenModal] = useState(false);
//   const [invoiceData, setInvoiceData] = useState({
//     invoiceNumber: '',
//     date: '',
//     clientName: '',
//     billingAddress: '',
//     clientEmail: '',
//     discount: 0,
//     taxPercentage: 0,
//     status: 'Pending',
//     items: [{ description: '', rate: '', quantity: '' }],
//   });

//   // Fetch clients on mount
//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/clients');
//         setClients(res.data);
//       } catch (err) {
//         console.error('Failed to load clients:', err);
//       }
//     };

//     fetchClients();
//   }, []);

//   const handleClientSelect = (e) => {
//     const selectedName = e.target.value;
//     const selectedClient = clients.find((c) => c.name === selectedName);

//     setInvoiceData((prev) => ({
//       ...prev,
//       clientName: selectedName,
//       clientEmail: selectedClient?.email || '',
//       billingAddress: selectedClient?.address || '',
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInvoiceData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...invoiceData.items];
//     newItems[index][field] = value;
//     setInvoiceData({ ...invoiceData, items: newItems });
//   };

//   const addItem = () => {
//     setInvoiceData((prev) => ({
//       ...prev,
//       items: [...prev.items, { description: '', rate: '', quantity: '' }],
//     }));
//   };

//   const removeItem = (index) => {
//     const newItems = invoiceData.items.filter((_, i) => i !== index);
//     setInvoiceData({ ...invoiceData, items: newItems });
//   };

//   const handleSave = async () => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/invoices/create', invoiceData);
//       alert('Invoice saved successfully!');
//       console.log(res.data);
//     } catch (error) {
//       console.error('Error saving invoice:', error);
//       alert('Failed to save invoice');
//     }
//   };

//   const subtotal = invoiceData.items.reduce((acc, item) => {
//     const rate = parseFloat(item.rate) || 0;
//     const quantity = parseFloat(item.quantity) || 0;
//     return acc + rate * quantity;
//   }, 0);

//   const discountAmount = (subtotal * parseFloat(invoiceData.discount || 0)) / 100;
//   const taxAmount = ((subtotal - discountAmount) * parseFloat(invoiceData.taxPercentage || 0)) / 100;
//   const grandTotal = subtotal - discountAmount + taxAmount;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <button
//         onClick={() => setOpenModal(true)}
//         className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition flex items-center gap-2"
//       >
//         <FileText className="w-5 h-5" /> Create Invoice
//       </button>
//       {openModal && (
//       <>
//       <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 space-y-4 border">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-2">Invoice Details</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Select Client</label>
//             <select
//               value={invoiceData.clientName}
//               onChange={handleClientSelect}
//               className="input-style"
//             >
//               <option value="">-- Select Client --</option>
//               {clients.map((client) => (
//                 <option key={client._id} value={client.name}>
//                   {client.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <input
//             type="hidden"
//             name="clientName"
//             value={invoiceData.clientName}
//             readOnly
//           />

//           {[ // rest of the form fields
//             { label: 'Invoice Number', name: 'invoiceNumber', type: 'text' },
//             { label: 'Invoice Date', name: 'date', type: 'date' },
//             { label: 'Client Email', name: 'clientEmail', type: 'email' },
//             { label: 'Billing Address', name: 'billingAddress', type: 'textarea' },
//             { label: 'Discount (%)', name: 'discount', type: 'number' },
//             { label: 'Tax (%)', name: 'taxPercentage', type: 'number' },
//           ].map(({ label, name, type }) => (
//             <div key={name} className={name === 'billingAddress' ? 'md:col-span-2' : ''}>
//               <label className="block text-sm font-medium mb-1">{label}</label>
//               {type === 'textarea' ? (
//                 <textarea
//                   name={name}
//                   value={invoiceData[name]}
//                   onChange={handleChange}
//                   className="input-style"
//                   rows={3}
//                 />
//               ) : (
//                 <input
//                   type={type}
//                   name={name}
//                   value={invoiceData[name]}
//                   onChange={handleChange}
//                   className="input-style"
//                 />
//               )}
//             </div>
//           ))}
//         </div>

//         <label className="block text-sm font-medium mb-1">Status</label>
//         <select
//           name="status"
//           value={invoiceData.status}
//           onChange={handleChange}
//           className="input-style"
//         >
//           <option value="Pending">Pending</option>
//           <option value="Paid">Paid</option>
//           <option value="Unpaid">Unpaid</option>
//         </select>
//       </div>
 
//       <div className="bg-white shadow-xl rounded-2xl p-6 border space-y-4">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-2">Invoice Items</h2>
//         {invoiceData.items.map((item, index) => (
//           <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium mb-1">Description</label>
//               <input
//                 type="text"
//                 value={item.description}
//                 onChange={(e) => handleItemChange(index, 'description', e.target.value)}
//                 className="input-style"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Rate</label>
//               <input
//                 type="number"
//                 value={item.rate}
//                 onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
//                 className="input-style"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Quantity</label>
//               <input
//                 type="number"
//                 value={item.quantity}
//                 onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
//                 className="input-style"
//               />
//             </div>
//             <div>
//               <button
//                 type="button"
//                 onClick={() => removeItem(index)}
//                 className="text-red-600 hover:text-red-800 mt-6 transition flex items-center"
//               >
//                 <Trash2 className="w-5 h-5" /> <span className="ml-1">Remove</span>
//               </button>
//             </div>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addItem}
//           className="inline-flex items-center gap-2 text-white bg-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
//         >
//           <Plus className="w-5 h-5" /> Add Item
//         </button>
//       </div>

//       <div className="mt-8 p-6 bg-gray-50 border rounded-xl max-w-md ml-auto space-y-2">
//         <h3 className="text-lg font-semibold text-gray-800 mb-2">Summary</h3>
//         <div className="flex justify-between"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
//         <div className="flex justify-between"><span>Discount ({invoiceData.discount}%):</span><span>- ₹{discountAmount.toFixed(2)}</span></div>
//         <div className="flex justify-between"><span>Tax ({invoiceData.taxPercentage}%):</span><span>+ ₹{taxAmount.toFixed(2)}</span></div>
//         <hr />
//         <div className="flex justify-between font-bold text-lg"><span>Grand Total:</span><span>₹{grandTotal.toFixed(2)}</span></div>
//       </div>

//       <div className="mt-10 flex gap-4">
//         <InvoicePDF invoiceData={invoiceData} />
//         <button
//           type="button"
//           onClick={handleSave}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//         >
//           Save Invoice
//         </button>
//       </div>
//       </>
//      )}
//     </div>
//   )
// }

// export default Invoices;
