import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Draggable from 'react-draggable';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
const toastOptions = {
  success: {
    className: 'bg-green-100 text-green-800 border border-green-300',
  },
  error: {
    className: 'bg-red-100 text-red-800 border border-red-300',
  },
};
const WorkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();
  const [showForm, setShowForm] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [formMode, setFormMode] = useState('add');
  const [editIndex, setEditIndex] = useState(null);
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const currentWork = formMode !== 'add' ? submittedData[editIndex] : null;
  const resetFormState = () => {
    setShowForm(false);
    setEditIndex(null);
    setFormMode('add');
    reset();
  };
  useEffect(() => {
    if (formMode === 'add') {
      reset({
        workName: '',
        startDate: '',
        endDate: '',
        description: '',
        remarks: '',
        image: null,
        video: null,
        docOrExcel: null,
      });
    }
  }, [formMode, reset]);
  useEffect(() => {
    if ((formMode === 'edit' || formMode === 'view') && currentWork) {
      setValue('workName', currentWork.workName);
      setValue('startDate', currentWork.startDate?.slice(0, 10));
      setValue('endDate', currentWork.endDate?.slice(0, 10));
      setValue('description', currentWork.description);
      setValue('remarks', currentWork.remarks);
    }
  }, [formMode, currentWork, setValue]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/work`);
        const data = await res.json();
        setSubmittedData(data);
      } catch (err) {
        console.error('Failed to load data:', err);
        toast.error('Failed to load data');
      }
    };
    fetchData();
  }, []);
  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList && value.length > 0) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });
    try {
      const method = editIndex !== null ? 'PUT' : 'POST';
      const url = editIndex !== null
        ? `${import.meta.env.VITE_API_URL}/api/work/${submittedData[editIndex]._id}`
        : `${import.meta.env.VITE_API_URL}/api/work`;

      const response = await fetch(url, {
        method,
        body: formData,
      });
      const savedWork = await response.json();
      if (editIndex !== null) {
        const updated = [...submittedData];
        updated[editIndex] = savedWork;
        setSubmittedData(updated);
        toast.success('Work updated successfully', toastOptions.success);
      } else {
        setSubmittedData((prev) => [...prev, savedWork]);
        toast.success('Work added successfully', toastOptions.success);
      }
      resetFormState();
    } catch (err) {
      console.error('Failed to submit:', err);
      toast.error('Failed to submit work', toastOptions.error);
    }
  };
    const handleSearchChange = (e) => setSearchKeyword(e.target.value);
  const filteredData = submittedData.filter((work) => {
    const matchesKeyword =
      work.workName?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      work.description?.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchesDate =
      (!filterStartDate || new Date(work.startDate) >= new Date(filterStartDate)) &&
      (!filterEndDate || new Date(work.endDate) <= new Date(filterEndDate));
    return matchesKeyword && matchesDate;
  });
  const handleDelete = async (id, index) => {
  const toastId = toast(
    ({ closeToast }) => (
      // <div className="flex flex-col gap-2">
      <div className="bg-white border border-red-400 rounded-lg p-4 shadow-md">
        <p className='text-sm text-gray-800'>Are you sure you want to delete this entry?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={async () => {
              try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/work/${id}`, {
                  method: 'DELETE',
                });
                if (!res.ok) throw new Error();
                setSubmittedData((prev) => prev.filter((_, i) => i !== index));
                toast.success('Work deleted successfully', {
                className: "bg-green-100 text-green-800 border border-green-300",
              });
              } catch (err) {
                console.error('Failed to delete entry', err);
                toast.error('Failed to delete entry', {
                className: "bg-red-100 text-red-800 border border-red-300",
              });
              } finally {
                toast.dismiss(toastId);
              }
            }}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
          >Yes</button>
          <button
            onClick={() => toast.dismiss(toastId)}
            className="bg-gray-300 px-3 py-1 rounded text-sm"
          >No</button>
        </div>
      </div>
    ),
    {
      position: 'bottom-right',
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
    }
  );
};
  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setFilterStartDate(value);
    if (filterEndDate && new Date(value) > new Date(filterEndDate)) {
      toast.error('Start Date cannot be after End Date');
    }
  };
  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setFilterEndDate(value);
    if (filterStartDate && new Date(filterStartDate) > new Date(value)) {
      toast.error('End Date cannot be before Start Date');
    }
  };
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // getMonth is 0-indexed
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const sortedData = [...filteredData].sort((a, b) => {
  if (!sortField) return 0;
  let aField = a[sortField];
  let bField = b[sortField];
  // Convert to lowercase if strings
  if (typeof aField === 'string') aField = aField.toLowerCase();
  if (typeof bField === 'string') bField = bField.toLowerCase();
  if (aField < bField) return sortDirection === 'asc' ? -1 : 1;
  if (aField > bField) return sortDirection === 'asc' ? 1 : -1;
  return 0;
});
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleSort = (field) => {
  if (sortField === field) {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  } else {
    setSortField(field);
    setSortDirection('asc');
  }
};
const handleDownload = async(work) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Work Details', 14, 20);
  const tableData = [
    ['Work Name', work.workName],
    ['Start Date', formatDate(work.startDate)],
    ['End Date', formatDate(work.endDate)],
    ['Description', work.description],
    ['Remarks', work.remarks || 'N/A'],
  ];
  const table = autoTable(doc, {
    startY: 30,
    head: [['Field', 'Value']],
    body: tableData,
    didDrawPage: () => {}, 
  });
  autoTable(doc, {
  startY: 30,
  head: [['Field', 'Value']],
  body: tableData,
});
  const lastTable = doc.lastAutoTable;
let yPosition = (lastTable && lastTable.finalY) || 40;
  const imageUrls = Array.isArray(work.images) ? work.images : work.image ? [work.image] : [];
  console.log('Image URLs:', imageUrls);
  for (const imageUrl of imageUrls) {
    try {
      const imgData = await fetch(imageUrl)
        .then((res) => res.blob())
        .then(
          (blob) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        );
      doc.addImage(imgData, 'JPEG', 14, yPosition, 60, 40);
      yPosition += 50; 
    } catch (err) {
      console.error('Failed to load image for PDF:', err);
    }
  }
  doc.save(`${work.workName.replace(/\s+/g, '_')}_Details.pdf`);
};
  return (
    <div className="p-6 bg-white min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h1 className="text-xl font-bold text-start mb-6 text-[#0D1B4C]">Work Management</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearchChange}
          placeholder="Search by Work Name or Description"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={filterStartDate}
          onChange={handleStartDateChange}
          className="border rounded p-2"
        />
        <input
          type="date"
          value={filterEndDate}
          onChange={handleEndDateChange}
          className="border rounded p-2"
        />
        <button
          onClick={() => {
            setSearchKeyword('');
            setFilterStartDate('');
            setFilterEndDate('');
          }}
          className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300"
        >Clear</button>
        <div className="flex justify-end pl-48">
          <button
            onClick={() => {
              setShowForm(true);
              setFormMode('add');
              reset();
            }}
            className="bg-green-600 text-white px-6 py-2 rounded">Add Work</button>
        </div>
      </div>
      {showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <Draggable handle=".modal-header">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 cursor-move">
        <div className="modal-header flex justify-between items-center mb-4 cursor-move">
          <h2 className="text-2xl font-semibold capitalize">
          {formMode} Work Details
        </h2>
        <button
          className="text-gray-500 hover:text-red-600 text-xl font-bold"
          onClick={() => {
            setShowForm(false);
            reset();
            setFormMode('add');}}>
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
              <label className="block text-sm font-medium">Work Name</label>
              <input
                type="text"
                {...register('workName', { required: 'Work name is required' })}
                readOnly={formMode === 'view'}
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.workName && <p className="text-red-500 text-sm">{errors.workName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                {...register('startDate', { required: 'Start date is required' })}
                readOnly={formMode === 'view'}
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                {...register('endDate', {
                  required: 'End date is required',
                  validate: (value) =>
                    value >= watch('startDate') || 'End date should be after start date',
                })}
                readOnly={formMode === 'view'}
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
            </div>

            <div className="md:col-span-3">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    readOnly={formMode === 'view'}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium">Remarks</label>
                  <textarea
                    {...register('remarks')}
                    readOnly={formMode === 'view'}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
            {formMode !== 'view' && (
  <>
    <div>
      <label className="block text-sm font-medium">Image File</label>
      <input
        type="file"
        accept="image/*"
        {...register('image')}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <div>
      <label className="block text-sm font-medium">Video File</label>
      <input
        type="file"
        accept="video/*"
        {...register('video')}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <div>
      <label className="block text-sm font-medium">Doc/Excel File</label>
      <input
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx"
        {...register('docOrExcel')}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  </>
)}

{currentWork && (
  <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    {currentWork.image && (
      <div>
        <p className="text-sm text-gray-700 font-medium">Image File:</p>
        <img src={currentWork.image} alt="Uploaded" className="mt-2 w-32 border rounded" />
      </div>
    )}
    {currentWork.video && (
      <div>
        <p className="text-sm text-gray-700 font-medium">Video File:</p>
        <video src={currentWork.video} controls className="mt-2 w-40 border rounded" />
      </div>
    )}
    {currentWork.docOrExcel && (
      <div>
        <p className="text-sm text-gray-700 font-medium">Document:</p>
        <a
          href={currentWork.docOrExcel}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline block mt-2"
        >
          {currentWork.docOrExcel.split('/').pop()}
        </a>
      </div>
    )}
  </div>
)}



        {formMode !== 'view' ? (
          <div className="md:col-span-3 flex justify-between mt-6">
            <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded">
              {formMode === 'edit' ? 'Update' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditIndex(null);
                setFormMode('add');
                reset();
              }}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="md:col-span-3 flex justify-end mt-6">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setFormMode('add');
                reset();
              }}
              className="text-sm text-gray-600 hover:underline"
            >
              Close
            </button>
          </div>
        )}
      </form>
    </div>
    </Draggable>
  </div>
)}
      {submittedData.length > 0 && (
        <div className="mt-4 bg-white p-6 rounded shadow-xl">
          <table className="min-w-full text-start border border-gray-300 rounded-xl overflow-hidden">
            <thead className="bg-[#0D1B4C] text-white">
              <tr>
                <th className="p-2 cursor-pointer hover:bg-[#1e2a5c]" onClick={() => handleSort('workName')}>
                  Work Name {sortField === 'workName' ? (sortDirection === 'asc' ? '▲' : '▼'): '⇅'}
                </th>
                <th className="p-2 cursor-pointer hover:bg-[#1e2a5c]" onClick={() => handleSort('startDate')}>
                  Start Date {sortField === 'startDate' ? (sortDirection === 'asc' ? '▲' : '▼'): '⇅'}
                </th>
                <th className="p-2 cursor-pointer hover:bg-[#1e2a5c]" onClick={() => handleSort('endDate')}>
                  End Date {sortField === 'endDate' ? (sortDirection === 'asc' ? '▲' : '▼'): '⇅'}
                </th>
                <th className="p-2 cursor-pointer hover:bg-[#1e2a5c]" onClick={() => handleSort('description')}>
                  Description {sortField === 'description' ? (sortDirection === 'asc' ? '▲' : '▼'): '⇅'}
                </th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="9" className="p-4">No results found</td>
                </tr>
              ) : (
                paginatedData.map((work, index) => (
                  <tr key={index} className="even:bg-gray-100 odd:bg-white hover:bg-gray-200 transition-colors text-center">
                    <td className="p-4">{work.workName}</td>
                    <td className="p-4">{formatDate(work.startDate)}</td>
                    <td className="p-4">{formatDate(work.endDate)}</td>
                    <td className="p-4">{work.description}</td>
                    <td className="p-4 flex justify-center gap-2">
                      <button
                        className="text-blue-600"
                        onClick={() => {
                          setShowForm(true);
                          setFormMode('view');
                          reset({
                            workName: work.workName,
                            startDate: work.startDate?.slice(0, 10),
                            endDate: work.endDate?.slice(0, 10),
                            description: work.description,
                            remarks: work.remarks,
                          });
                        }}
                      >
                        <FaEye size={20} />
                      </button>
                      <button
                        className="text-yellow-500"
                        onClick={() => {
                          setShowForm(true);
                          setFormMode('edit');
                          setEditIndex(index);
                          reset({
                            workName: work.workName,
                            startDate: work.startDate?.slice(0, 10),
                            endDate: work.endDate?.slice(0, 10),
                            description: work.description,
                            remarks: work.remarks,
                          });
                        }}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(work._id, index)}
                      >
                        <FaTrashAlt size={20} />
                      </button>
                      <button
                          className="text-green-700"
                          onClick={() => handleDownload(work)}
                          title="Download"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
    />
      </svg>

                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-end mt-4">
        <div className="flex items-center gap-2">
           <p className="text-sm text-gray-700 ">
            Showing {filteredData.length} {filteredData.length === 1 ? 'entry' : 'entries'}
          </p>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-4 py-1 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2 text-gray-600">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-4 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkForm;





