import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = 'http://localhost:5000/api/payments'; // update if needed

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterClient, setFilterClient] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  // Helper function to format date safely
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return isNaN(d) ? '-' : d.toLocaleDateString();
  };

  const fetchPayments = async () => {
    try {
      const res = await axios.get(API, {
        params: {
          client: filterClient,
          status: filterStatus,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPayments(res.data);
      console.log('Payments fetched:', res.data);  // Debug log
    } catch (err) {
      toast.error('Error fetching payments');
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [filterClient, filterStatus]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    if (data.image && data.image[0]) formData.append('image', data.image[0]);

    try {
      const url = editMode ? `${API}/${selectedPayment._id}` : API;
      const method = editMode ? 'put' : 'post';

      await axios[method](url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast.success(editMode ? 'Payment updated' : 'Payment added');
      setModalOpen(false);
      reset();
      setEditMode(false);
      fetchPayments();
    } catch (err) {
      toast.error('Error saving payment');
    }
  };

  const handleEdit = (payment) => {
    setEditMode(true);
    setSelectedPayment(payment);
    setModalOpen(true);

    for (const key in payment) {
      if (key !== 'image' && key !== 'imageUrl') setValue(key, payment[key]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this payment?')) return;
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Deleted');
      fetchPayments();
    } catch {
      toast.error('Error deleting');
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Payments Report', 14, 10);
    const tableData = payments.map((p) => [
      p.client,
      p.amount,
      formatDate(p.paymentDate),
      p.status,
      p.description,
    ]);

    doc.autoTable({
      head: [['Client', 'Amount', 'Date', 'Status', 'Description']],
      body: tableData,
    });
    doc.save('payments.pdf');
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Payments</h2>

      {/* Filters */}
      <div className="mb-4 flex gap-2">
        <input
          placeholder="Filter by client"
          className="border p-1 rounded"
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
        />
        <select
          className="border p-1 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
        <button
          className="bg-green-500 text-white px-3 rounded"
          onClick={() => setModalOpen(true)}
        >
          + Add
        </button>
        <button
          className="bg-blue-500 text-white px-3 rounded"
          onClick={exportPDF}
        >
          Export PDF
        </button>
      </div>

      {/* Table */}
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Client</th>
            <th className="border px-2 py-1">Amount</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Image</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 && (
            <tr>
              <td className="border px-2 py-1 text-center" colSpan={7}>
                No payments found
              </td>
            </tr>
          )}
          {payments.map((p) => (
            <tr key={p._id}>
              <td className="border px-2 py-1">{p.client}</td>
              <td className="border px-2 py-1">{p.amount}</td>
              <td className="border px-2 py-1">{formatDate(p.paymentDate)}</td>
              <td className="border px-2 py-1">{p.status}</td>
              <td className="border px-2 py-1">{p.description}</td>
              <td className="border px-2 py-1">
                {p.imageUrl && (
                  <img
                    src={`http://localhost:5000${p.imageUrl}`}
                    alt="payment"
                    className="h-10"
                  />
                )}
              </td>
              <td className="border px-2 py-1">
                <button
                  className="text-blue-500"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 ml-2"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[400px]">
            <h3 className="text-lg mb-2">
              {editMode ? 'Edit Payment' : 'Add Payment'}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="w-full mb-2 p-1 border"
                placeholder="Client"
                {...register('client')}
                required
              />
              <input
                type="number"
                className="w-full mb-2 p-1 border"
                placeholder="Amount"
                {...register('amount')}
                required
              />
              <input
                type="date"
                className="w-full mb-2 p-1 border"
                {...register('paymentDate')}
              />
              <select className="w-full mb-2 p-1 border" {...register('status')}>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
              <input
                className="w-full mb-2 p-1 border"
                placeholder="Description"
                {...register('description')}
              />
              <input type="file" className="w-full mb-2" {...register('image')} />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    reset();
                    setEditMode(false);
                  }}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  {editMode ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;