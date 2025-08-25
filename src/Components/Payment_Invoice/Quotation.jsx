// import React, { useState } from 'react';
// import jsPDF from 'jspdf';
// import { saveAs } from 'file-saver';
// import { FaEdit, FaTrash, FaFilePdf, FaFileWord, FaEye } from 'react-icons/fa';

// const Quotation = () => {
//   const [quotations, setQuotations] = useState([
//     {
//       id: 1,
//       number: 'QTN-001',
//       clientName: 'John Doe',
//       email: 'john@example.com',
//       amount: 300,
//       date: '2025-05-01',
//       validity: '2025-05-10',
//       status: 'Approved',
//       description: 'Design and branding service',
//       detailedDescription: 'Complete brand overhaul including logo, website, and packaging.',
//       notes: 'Discount included for loyalty',
//       addressLine: '123 Main St',
//       city: 'New York',
//       state: 'NY',
//       zip: '10001',
//       team: 'Creative Team',
//       condition: '50% advance required',
//     },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [isViewMode, setIsViewMode] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const initialState = {
//     clientName: '',
//     email: '',
//     amount: '',
//     date: '',
//     validity: '',
//     status: 'Pending',
//     description: '',
//     detailedDescription: '',
//     notes: '',
//     addressLine: '',
//     city: '',
//     state: '',
//     zip: '',
//     team: '',
//     condition: '',
//   };
//   const [formData, setFormData] = useState(initialState);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const openModal = (quote = null, viewOnly = false) => {
//     if (quote) {
//       setIsEditMode(!viewOnly);
//       setIsViewMode(viewOnly);
//       setSelectedId(quote.id);
//       setFormData({ ...quote });
//     } else {
//       setIsEditMode(false);
//       setIsViewMode(false);
//       setFormData(initialState);
//     }
//     setIsModalOpen(true);
//   };

//   const saveQuotation = () => {
//     const { clientName, email, amount, date, validity } = formData;
//     if (!clientName || !email || !amount || !date || !validity) {
//       alert('Please fill all required fields.');
//       return;
//     }

//     if (isEditMode) {
//       setQuotations((prev) =>
//         prev.map((q) =>
//           q.id === selectedId ? { ...formData, id: selectedId } : q
//         )
//       );
//     } else {
//       const newId = quotations.length + 1;
//       const number = `QTN-${String(newId).padStart(3, '0')}`;
//       setQuotations([
//         ...quotations,
//         { ...formData, id: newId, number, amount: parseFloat(amount) },
//       ]);
//     }

//     setIsModalOpen(false);
//     setIsEditMode(false);
//     setIsViewMode(false);
//     setSelectedId(null);
//   };

//   const deleteQuotation = (id) => {
//     if (window.confirm('Are you sure you want to delete this quotation?')) {
//       setQuotations((prev) => prev.filter((q) => q.id !== id));
//     }
//   };

//   const downloadPDF = (quote) => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text('Sudhan Quotation', 14, 15);
//     doc.setFontSize(11);
//     doc.text(`Quotation #: ${quote.number}`, 14, 25);
//     doc.text(`Client: ${quote.clientName}`, 14, 32);
//     doc.text(`Email: ${quote.email}`, 14, 39);
//     doc.text(`Date: ${quote.date}`, 14, 46);
//     doc.text(`Valid Until: ${quote.validity}`, 14, 53);
//     doc.text(`Address: ${quote.addressLine}, ${quote.city}, ${quote.state} - ${quote.zip}`, 14, 60);
//     doc.text(`Team: ${quote.team}`, 14, 67);
//     doc.text('Description:', 14, 74);
//     doc.text(quote.description || 'N/A', 14, 81);
//     doc.text('Detailed:', 14, 88);
//     doc.text(quote.detailedDescription || 'N/A', 14, 95);
//     doc.text(`Amount: ₹${quote.amount}`, 14, 102);
//     doc.text(`Status: ${quote.status}`, 14, 109);
//     if (quote.notes) {
//       doc.text(`Notes: ${quote.notes}`, 14, 116);
//     }
//     if (quote.condition) {
//       doc.text(`Condition: ${quote.condition}`, 14, 123);
//     }
//     doc.save(`${quote.number}.pdf`);
//   };

//   const downloadWord = (quote) => {
//     const content = `
//     Quotation #: ${quote.number}
//     Client: ${quote.clientName}
//     Email: ${quote.email}
//     Date: ${quote.date}
//     Valid Until: ${quote.validity}
//     Amount: ₹${quote.amount}
//     Status: ${quote.status}
//     Address: ${quote.addressLine}, ${quote.city}, ${quote.state} - ${quote.zip}
//     Team: ${quote.team}
//     Condition: ${quote.condition}
//     Description: ${quote.description}
//     Detailed Description: ${quote.detailedDescription}
//     Notes: ${quote.notes}
//     `;
//     const blob = new Blob([content], { type: 'application/msword' });
//     saveAs(blob, `${quote.number}.doc`);
//   };

//   const statusBadge = (status) => {
//     const base = 'px-2 py-1 text-xs font-semibold rounded-full';
//     switch (status) {
//       case 'Approved': return `${base} bg-green-100 text-green-700`;
//       case 'Pending': return `${base} bg-yellow-100 text-yellow-700`;
//       case 'Rejected': return `${base} bg-red-100 text-red-700`;
//       default: return base;
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold">Quotations</h2>
//         <button
//           onClick={() => openModal()}
//           className="bg-blue-600 text-white px-4 py-2 rounded shadow"
//         >
//           + New Quotation
//         </button>
//       </div>

//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th className="p-3 text-left">Quotation #</th>
//               <th className="p-3 text-left">Client</th>
//               <th className="p-3 text-left">Amount</th>
//               <th className="p-3 text-left">Date</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {quotations.map((q) => (
//               <tr key={q.id} className="border-t hover:bg-gray-50">
//                 <td className="p-3 font-semibold">{q.number}</td>
//                 <td className="p-3">{q.clientName}</td>
//                 <td className="p-3 text-blue-600 font-semibold">₹{q.amount}</td>
//                 <td className="p-3">{q.date}</td>
//                 <td className="p-3">
//                   <span className={statusBadge(q.status)}>{q.status}</span>
//                 </td>
//                 <td className="p-3">
//                   <div className="flex flex-col gap-1 items-start">
//                     <div className="flex gap-4">
//                       <FaEye
//                         onClick={() => openModal(q, true)}
//                         className="text-gray-700 cursor-pointer"
//                         title="View"
//                       />
//                       <FaEdit
//                         onClick={() => openModal(q)}
//                         className="text-blue-600 cursor-pointer"
//                         title="Edit"
//                       />
//                       <FaTrash
//                         onClick={() => deleteQuotation(q.id)}
//                         className="text-red-600 cursor-pointer"
//                         title="Delete"
//                       />  
//                     </div>

//                     <div className="flex gap-4 mt-2">
//                       <FaFilePdf
//                         onClick={() => downloadPDF(q)}
//                         className="text-green-600 cursor-pointer"
//                         title="Download PDF"
//                       />
//                       <FaFileWord
//                         onClick={() => downloadWord(q)}
//                         className="text-purple-600 cursor-pointer"
//                         title="Download Word"
//                       /> 
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
//             <h2 className="text-xl font-bold mb-4">
//               {isViewMode ? 'View Quotation' : isEditMode ? 'Edit Quotation' : 'Add New Quotation'}
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input name="clientName" placeholder="Client Name" value={formData.clientName} onChange={handleChange} className="p-2 border rounded" readOnly={isViewMode} />
//               <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border rounded" readOnly={isViewMode} />
//               <input name="amount" placeholder="Amount (₹)" value={formData.amount} onChange={handleChange} className="p-2 border rounded" type="number" readOnly={isViewMode} />
//               <input name="date" value={formData.date} onChange={handleChange} className="p-2 border rounded" type="date" readOnly={isViewMode} />
//               <input name="validity" value={formData.validity} onChange={handleChange} className="p-2 border rounded" type="date" readOnly={isViewMode} />
//               <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded" disabled={isViewMode}>
//                 <option>Pending</option>
//                 <option>Approved</option>
//                 <option>Rejected</option>
//               </select>
//               <input name="description" placeholder="Short Description" value={formData.description} onChange={handleChange} className="p-2 border rounded col-span-2" readOnly={isViewMode} />
//               <input name="detailedDescription" placeholder="Detailed Description" value={formData.detailedDescription} onChange={handleChange} className="p-2 border rounded col-span-2" readOnly={isViewMode} />
//               <input name="addressLine" placeholder="Address Line" value={formData.addressLine} onChange={handleChange} className="p-2 border rounded" readOnly={isViewMode} />
//               <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="p-2 border rounded" readOnly={isViewMode} />
//               <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="p-2 border rounded" readOnly={isViewMode} />
//               <input name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} className="p-2 border rounded" readOnly={isViewMode} />
//               <input name="team" placeholder="Team" value={formData.team} onChange={handleChange} className="p-2 border rounded" readOnly={isViewMode} />
//               <input name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} className="p-2 border rounded col-span-2" readOnly={isViewMode} />
//               <input name="condition" placeholder="Condition" value={formData.condition} onChange={handleChange} className="p-2 border rounded col-span-2" readOnly={isViewMode} />
//             </div>
//             <div className="flex justify-end gap-2 mt-6">
//               <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setIsModalOpen(false)}>Close</button>
//               {!isViewMode && (
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={saveQuotation}>
//                   {isEditMode ? 'Update' : 'Save'}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quotation;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import { saveAs } from 'file-saver';
// import { FaEdit, FaTrash, FaFilePdf, FaFileWord, FaEye } from 'react-icons/fa';

// const Quotation = () => {
//   const [quotations, setQuotations] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [isViewMode, setIsViewMode] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);

//   const initialState = {
//     clientName: '',
//     email: '',
//     amount: '',
//     date: '',
//     validity: '',
//     status: 'Pending',
//     description: '',
//     detailedDescription: '',
//     notes: '',
//     addressLine: '',
//     city: '',
//     state: '',
//     zip: '',
//     team: '',
//     condition: '',
//     number: '',
//   };

//   const [formData, setFormData] = useState(initialState);

//   const fetchQuotations = async () => {
//     try {
//       const res = await axios.get('/api/quotations');
//       const data = Array.isArray(res.data) ? res.data : [];
//       setQuotations(data);
//     } catch (error) {
//       console.error('Error fetching quotations:', error);
//       setQuotations([]); // Fallback
//     }
//   };

//   useEffect(() => {
//     fetchQuotations();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const openModal = (quote = null, viewOnly = false) => {
//     if (quote) {
//       setIsEditMode(!viewOnly);
//       setIsViewMode(viewOnly);
//       setSelectedId(quote._id);
//       setFormData({ ...initialState, ...quote });
//     } else {
//       setIsEditMode(false);
//       setIsViewMode(false);
//       setFormData(initialState);
//     }
//     setIsModalOpen(true);
//   };

//   const saveQuotation = async () => {
//     const { clientName, email, amount, date, validity } = formData;
//     if (!clientName || !email || !amount || !date || !validity) {
//       alert('Please fill all required fields.');
//       return;
//     }

//     try {
//       if (isEditMode) {
//         await axios.put(`/api/quotations/${selectedId}`, formData);
//       } else {
//         await axios.post('/api/quotations', formData);
//       }
//       fetchQuotations();
//       setIsModalOpen(false);
//       setIsEditMode(false);
//       setIsViewMode(false);
//       setSelectedId(null);
//     } catch (error) {
//       console.error('Error saving quotation:', error);
//     }
//   };

//   const deleteQuotation = async (id) => {
//     if (window.confirm('Are you sure you want to delete this quotation?')) {
//       try {
//         await axios.delete(`/api/quotations/${id}`);
//         fetchQuotations();
//       } catch (error) {
//         console.error('Error deleting quotation:', error);
//       }
//     }
//   };

//   const downloadPDF = (quote) => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text('Sudhan Quotation', 14, 15);
//     doc.setFontSize(11);
//     doc.text(`Quotation #: ${quote.number || quote._id}`, 14, 25);
//     doc.text(`Client: ${quote.clientName}`, 14, 32);
//     doc.text(`Email: ${quote.email}`, 14, 39);
//     doc.text(`Date: ${quote.date}`, 14, 46);
//     doc.text(`Valid Until: ${quote.validity}`, 14, 53);
//     doc.text(`Address: ${quote.addressLine}, ${quote.city}, ${quote.state} - ${quote.zip}`, 14, 60);
//     doc.text(`Team: ${quote.team}`, 14, 67);
//     doc.text('Description:', 14, 74);
//     doc.text(quote.description || 'N/A', 14, 81);
//     doc.text('Detailed:', 14, 88);
//     doc.text(quote.detailedDescription || 'N/A', 14, 95);
//     doc.text(`Amount: ₹${quote.amount}`, 14, 102);
//     doc.text(`Status: ${quote.status}`, 14, 109);
//     if (quote.notes) doc.text(`Notes: ${quote.notes}`, 14, 116);
//     if (quote.condition) doc.text(`Condition: ${quote.condition}`, 14, 123);
//     doc.save(`${quote.number || quote._id}.pdf`);
//   };

//   const downloadWord = (quote) => {
//     const content = `
// Quotation #: ${quote.number || quote._id}
// Client: ${quote.clientName}
// Email: ${quote.email}
// Date: ${quote.date}
// Valid Until: ${quote.validity}
// Amount: ₹${quote.amount}
// Status: ${quote.status}
// Address: ${quote.addressLine}, ${quote.city}, ${quote.state} - ${quote.zip}
// Team: ${quote.team}
// Condition: ${quote.condition}
// Description: ${quote.description}
// Detailed Description: ${quote.detailedDescription}
// Notes: ${quote.notes}
//     `;
//     const blob = new Blob([content], { type: 'application/msword' });
//     saveAs(blob, `${quote.number || quote._id}.doc`);
//   };

//   const statusBadge = (status) => {
//     const base = 'px-2 py-1 text-xs font-semibold rounded-full';
//     switch (status) {
//       case 'Approved': return `${base} bg-green-100 text-green-700`;
//       case 'Pending': return `${base} bg-yellow-100 text-yellow-700`;
//       case 'Rejected': return `${base} bg-red-100 text-red-700`;
//       default: return base;
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold">Quotations</h2>
//         <button
//           onClick={() => openModal()}
//           className="bg-blue-600 text-white px-4 py-2 rounded shadow"
//         >
//           + New Quotation
//         </button>
//       </div>

//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th className="p-3 text-left">Quotation #</th>
//               <th className="p-3 text-left">Client</th>
//               <th className="p-3 text-left">Amount</th>
//               <th className="p-3 text-left">Date</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(quotations) && quotations.map((q) => (
//               <tr key={q._id} className="border-t hover:bg-gray-50">
//                 <td className="p-3 font-semibold">{q.number || q._id}</td>
//                 <td className="p-3">{q.clientName}</td>
//                 <td className="p-3 text-blue-600 font-semibold">₹{q.amount}</td>
//                 <td className="p-3">{q.date}</td>
//                 <td className="p-3">
//                   <span className={statusBadge(q.status)}>{q.status}</span>
//                 </td>
//                 <td className="p-3">
//                   <div className="flex flex-col gap-1 items-start">
//                     <div className="flex gap-4">
//                       <FaEye
//                         onClick={() => openModal(q, true)}
//                         className="text-gray-700 cursor-pointer"
//                         title="View"
//                       />
//                       <FaEdit
//                         onClick={() => openModal(q)}
//                         className="text-blue-600 cursor-pointer"
//                         title="Edit"
//                       />
//                       <FaTrash
//                         onClick={() => deleteQuotation(q._id)}
//                         className="text-red-600 cursor-pointer"
//                         title="Delete"
//                       />
//                     </div>
//                     <div className="flex gap-4 mt-2">
//                       <FaFilePdf
//                         onClick={() => downloadPDF(q)}
//                         className="text-green-600 cursor-pointer"
//                         title="Download PDF"
//                       />
//                       <FaFileWord
//                         onClick={() => downloadWord(q)}
//                         className="text-purple-600 cursor-pointer"
//                         title="Download Word"
//                       />
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             {quotations.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center p-4 text-gray-500">
//                   No quotations found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl overflow-y-auto max-h-[90vh]">
//             <h2 className="text-xl font-bold mb-4">
//               {isViewMode ? 'View Quotation' : isEditMode ? 'Edit Quotation' : 'Add New Quotation'}
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {Object.entries(initialState).map(([field, _]) => (
//                 <input
//                   key={field}
//                   name={field}
//                   placeholder={field
//                     .replace(/([A-Z])/g, ' $1')
//                     .replace(/^./, str => str.toUpperCase())}
//                   value={formData[field] || ''}
//                   onChange={handleChange}
//                   className="p-2 border rounded"
//                   readOnly={isViewMode}
//                   type={field === 'amount' ? 'number' : field.includes('date') ? 'date' : 'text'}
//                 />
//               ))}
//             </div>
//             <div className="flex justify-end gap-2 mt-6">
//               <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setIsModalOpen(false)}>Close</button>
//               {!isViewMode && (
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={saveQuotation}>
//                   {isEditMode ? 'Update' : 'Save'}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quotation;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { FaEdit, FaTrash, FaFilePdf, FaFileWord, FaEye, FaPlus } from 'react-icons/fa';

const API_BASE = 'http://localhost:5000/api/quotations';

const Quotation = () => {
  const [quotations, setQuotations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const initialState = {
    clientName: '',
    email: '',
    amount: '',
    date: '',
    validity: '',
    status: 'Pending',
    description: '',
    detailedDescription: '',
    notes: '',
    addressLine: '',
    city: '',
    state: '',
    zip: '',
    team: '',
    condition: '',
    number: '',
  };

  const [formData, setFormData] = useState(initialState);

  const fetchQuotations = async () => {
    try {
      const res = await axios.get(API_BASE);
      const data = Array.isArray(res.data) ? res.data : [];
      setQuotations(data);
    } catch (error) {
      console.error('Error fetching quotations:', error);
      setQuotations([]);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = (quote = null, viewOnly = false) => {
    if (quote) {
      setIsEditMode(!viewOnly);
      setIsViewMode(viewOnly);
      setSelectedId(quote._id);
      setFormData({ ...initialState, ...quote });
    } else {
      setIsEditMode(false);
      setIsViewMode(false);
      setFormData(initialState);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setIsViewMode(false);
    setFormData(initialState);
  };

  const saveQuotation = async () => {
    const { clientName, email, amount, date, validity } = formData;
    if (!clientName || !email || !amount || !date || !validity) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      if (isEditMode) {
        await axios.put(`${API_BASE}/${selectedId}`, formData);
      } else {
        await axios.post(API_BASE, formData);
      }
      fetchQuotations();
      closeModal();
    } catch (error) {
      console.error('Error saving quotation:', error);
    }
  };

  const deleteQuotation = async (id) => {
    if (window.confirm('Are you sure you want to delete this quotation?')) {
      try {
        await axios.delete(`${API_BASE}/${id}`);
        fetchQuotations();
      } catch (error) {
        console.error('Error deleting quotation:', error);
      }
    }
  };

  const exportPDF = (quote) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Quotation Details', 20, 20);
    let y = 30;
    Object.entries(quote).forEach(([key, value]) => {
      if (key !== '_id' && key !== '__v') {
        doc.setFontSize(12);
        doc.text(`${key}: ${value}`, 20, y);
        y += 10;
      }
    });
    doc.save(`quotation-${quote.number || quote._id}.pdf`);
  };

  const exportWord = (quote) => {
    const content = Object.entries(quote)
      .filter(([key]) => key !== '_id' && key !== '__v')
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    const blob = new Blob([content], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    saveAs(blob, `quotation-${quote.number || quote._id}.docx`);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Quotations</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add Quotation
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">#</th>
              <th className="p-2">Number</th>
              <th className="p-2">Client</th>
              <th className="p-2">Email</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((q, index) => (
              <tr key={q._id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{q.number}</td>
                <td className="p-2">{q.clientName}</td>
                <td className="p-2">{q.email}</td>
                <td className="p-2">{q.amount}</td>
                <td className="p-2">{q.date}</td>
                <td className="p-2">{q.status}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => openModal(q, true)} className="text-green-600">
                    <FaEye />
                  </button>
                  <button onClick={() => openModal(q)} className="text-blue-600">
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteQuotation(q._id)} className="text-red-600">
                    <FaTrash />
                  </button>
                  <button onClick={() => exportPDF(q)} className="text-purple-600">
                    <FaFilePdf />
                  </button>
                  <button onClick={() => exportWord(q)} className="text-indigo-600">
                    <FaFileWord />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
              {isViewMode ? 'View' : isEditMode ? 'Edit' : 'Add'} Quotation
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                'clientName',
                'email',
                'amount',
                'date',
                'validity',
                'status',
                'description',
                'detailedDescription',
                'notes',
                'addressLine',
                'city',
                'state',
                'zip',
                'team',
                'condition',
              ].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    disabled={isViewMode}
                    className="border px-2 py-1 rounded"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Close
              </button>
              {!isViewMode && (
                <button
                  onClick={saveQuotation}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {isEditMode ? 'Update' : 'Save'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quotation;
