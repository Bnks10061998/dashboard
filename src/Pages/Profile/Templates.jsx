// import React, { useState, useEffect } from 'react';

// const categories = ['All', 'Dashboard', 'E-commerce', 'Portfolio'];

// const dummyTemplates = [
//   {
//     id: 1,
//     name: 'Modern Dashboard',
//     description: 'A clean and modern dashboard layout.',
//     category: 'Dashboard',
//     image: 'https://via.placeholder.com/300x180.png?text=Dashboard+1',
//     rating: 4,
//     usedBy: 1200,
//     tag: 'Free',
//   },
//   {
//     id: 2,
//     name: 'E-commerce Shop',
//     description: 'Template for online stores.',
//     category: 'E-commerce',
//     image: 'https://via.placeholder.com/300x180.png?text=E-commerce',
//     rating: 5,
//     usedBy: 950,
//     tag: 'Premium',
//   },
//   {
//     id: 3,
//     name: 'Personal Portfolio',
//     description: 'Great for showcasing personal work.',
//     category: 'Portfolio',
//     image: 'https://via.placeholder.com/300x180.png?text=Portfolio',
//     rating: 3,
//     usedBy: 400,
//     tag: 'Free',
//   },
// ];

// const TemplateScreen = () => {
//   const [templates, setTemplates] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newTemplate, setNewTemplate] = useState({
//     name: '',
//     description: '',
//     category: 'Dashboard',
//     image: '',
//     rating: 0,
//     usedBy: 0,
//     tag: 'Free',
//   });

//   useEffect(() => {
//     setTemplates(dummyTemplates);
//   }, []);

//   const filteredTemplates = templates.filter((template) => {
//     const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || template.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
//       <h1 className="text-3xl font-bold mb-4 dark:text-white">Template Gallery</h1>

//       {/* Category Filters */}
//       <div className="flex flex-wrap gap-3 mb-4">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             className={`px-4 py-2 rounded-full text-sm transition ${
//               activeCategory === cat
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-200 hover:bg-blue-100 dark:bg-gray-700 dark:text-white'
//             }`}
//             onClick={() => setActiveCategory(cat)}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Search and Add */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//         <input
//           type="text"
//           placeholder="Search templates..."
//           className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button
//           className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
//           onClick={() => setShowAddModal(true)}
//         >
//           + Add Design
//         </button>
//       </div>

//       {/* Template Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredTemplates.map((template) => (
//           <div
//             key={template.id}
//             className="relative group rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform transform hover:scale-105"
//           >
//             {/* Tag */}
//             <span className="absolute top-2 left-2 z-10 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded dark:bg-green-900 dark:text-green-300">
//               {template.tag}
//             </span>

//             {/* Image */}
//             <img
//               src={template.image}
//               alt={template.name}
//               className="w-full h-40 object-cover"
//             />

//             {/* Hover Overlay */}
//             <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
//               <button
//                 className="bg-white text-black px-3 py-1 rounded shadow hover:bg-gray-200"
//                 onClick={() => setSelectedTemplate(template)}
//               >
//                 Preview
//               </button>
//               <button
//                 className="bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700"
//                 onClick={() => alert(`Applied: ${template.name}`)}
//               >
//                 Apply
//               </button>
//             </div>

//             {/* Info */}
//             <div className="p-4">
//               <h2 className="text-lg font-bold dark:text-white">{template.name}</h2>
//               <p className="text-sm text-gray-600 dark:text-gray-300">{template.description}</p>

//               {/* Rating */}
//               <div className="flex items-center mt-2">
//                 {[...Array(5)].map((_, i) => (
//                   <svg
//                     key={i}
//                     className={`h-4 w-4 ${
//                       i < template.rating ? 'text-yellow-400' : 'text-gray-300'
//                     }`}
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974 4.18.012c.969.003 1.371 1.24.588 1.81l-3.385 2.46 1.269 3.905c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.351 2.859c-.783.57-1.838-.196-1.538-1.118l1.269-3.905-3.385-2.46c-.783-.57-.38-1.807.588-1.81l4.18-.012 1.286-3.974z" />
//                   </svg>
//                 ))}
//               </div>

//               <p className="text-xs text-gray-400 mt-1">{`Used by ${template.usedBy} users`}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Preview Modal */}
//       {selectedTemplate && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-[90%] max-w-md p-6 relative">
//             <button
//               className="absolute top-2 right-3 text-2xl text-gray-700 dark:text-gray-200"
//               onClick={() => setSelectedTemplate(null)}
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-bold mb-4 dark:text-white">{selectedTemplate.name}</h2>
//             <img
//               src={selectedTemplate.image}
//               alt={selectedTemplate.name}
//               className="w-full h-52 object-cover rounded-lg mb-4"
//             />
//             <p className="text-gray-700 dark:text-gray-300">{selectedTemplate.description}</p>
//           </div>
//         </div>
//       )}

//       {/* Add Design Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-[90%] max-w-md p-6 relative">
//             <button
//               className="absolute top-2 right-3 text-2xl text-gray-700 dark:text-gray-200"
//               onClick={() => setShowAddModal(false)}
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-bold mb-4 dark:text-white">Add New Design</h2>

//             <div className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
//                 value={newTemplate.name}
//                 onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="Description"
//                 className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
//                 value={newTemplate.description}
//                 onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="Image URL"
//                 className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
//                 value={newTemplate.image}
//                 onChange={(e) => setNewTemplate({ ...newTemplate, image: e.target.value })}
//               />
//               <select
//                 className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
//                 value={newTemplate.category}
//                 onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
//               >
//                 {categories.slice(1).map((cat) => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//               <select
//                 className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
//                 value={newTemplate.tag}
//                 onChange={(e) => setNewTemplate({ ...newTemplate, tag: e.target.value })}
//               >
//                 <option value="Free">Free</option>
//                 <option value="Premium">Premium</option>
//               </select>
//             </div>

//             <button
//               className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//               onClick={() => {
//                 const newId = templates.length + 1;
//                 const templateToAdd = { ...newTemplate, id: newId };
//                 setTemplates([...templates, templateToAdd]);
//                 setShowAddModal(false);
//                 setNewTemplate({
//                   name: '',
//                   description: '',
//                   category: 'Dashboard',
//                   image: '',
//                   rating: 0,
//                   usedBy: 0,
//                   tag: 'Free',
//                 });
//               }}
//             >
//               Add Template
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TemplateScreen;


import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const categories = ['All', 'Dashboard', 'E-commerce', 'Portfolio'];

const dummyTemplates = [
  {
    id: 1,
    name: 'Modern Dashboard',
    description: 'A clean and modern dashboard layout.',
    category: 'Dashboard',
    images: ['https://via.placeholder.com/300x180.png?text=Dashboard+1'],
    rating: 4,
    usedBy: 1200,
    tag: 'Free',
  },
  {
    id: 2,
    name: 'E-commerce Shop',
    description: 'Template for online stores.',
    category: 'E-commerce',
    images: ['https://via.placeholder.com/300x180.png?text=E-commerce'],
    rating: 5,
    usedBy: 950,
    tag: 'Premium',
  },
];

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: 'Dashboard',
    images: [],
    rating: 0,
    usedBy: 0,
    tag: 'Free',
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    setTemplates(dummyTemplates);
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setNewTemplate((prev) => ({
      ...prev,
      images: previews,
    }));
    setImagePreviews(previews);
  };

  const handleRatingChange = (value) => {
    setNewTemplate((prev) => ({ ...prev, rating: value }));
  };

  const handleAddOrEditTemplate = () => {
    if (editingTemplateId !== null) {
      const updatedTemplates = templates.map((t) =>
        t.id === editingTemplateId ? { ...newTemplate, id: editingTemplateId } : t
      );
      setTemplates(updatedTemplates);
    } else {
      const newId = templates.length + 1;
      const templateToAdd = { ...newTemplate, id: newId };
      setTemplates([...templates, templateToAdd]);
    }

    setShowModal(false);
    setEditingTemplateId(null);
    setNewTemplate({
      name: '',
      description: '',
      category: 'Dashboard',
      images: [],
      rating: 0,
      usedBy: 0,
      tag: 'Free',
    });
    setImagePreviews([]);
  };

  const handleEdit = (template) => {
    setEditingTemplateId(template.id);
    setNewTemplate(template);
    setImagePreviews(template.images);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const updated = templates.filter((t) => t.id !== id);
    setTemplates(updated);
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || template.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // FIXED exportToPDF with proper autoTable usage
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["ID", "Name", "Category", "Tag", "Rating", "Used By"];
    const tableRows = filteredTemplates.map(t => [
      t.id,
      t.name,
      t.category,
      t.tag,
      t.rating,
      t.usedBy,
    ]);

    doc.text("Template List", 14, 15);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("template-list.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTemplates.map(t => ({
      ID: t.id,
      Name: t.name,
      Description: t.description,
      Category: t.category,
      Tag: t.tag,
      Rating: t.rating,
      UsedBy: t.usedBy,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Templates");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "template-list.xlsx");
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Template Gallery</h1>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm transition ${
              activeCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-blue-100 dark:bg-gray-700 dark:text-white'
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search, Add & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search templates..."
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
            onClick={() => setShowModal(true)}
          >
            + Add Design
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
            onClick={exportToPDF}
          >
            Export PDF
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600"
            onClick={exportToExcel}
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="relative group rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform transform hover:scale-105"
          >
            <span className="absolute top-2 left-2 z-10 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded dark:bg-green-900 dark:text-green-300">
              {template.tag}
            </span>

            <img
              src={template.images[0]}
              alt={template.name}
              className="w-full h-40 object-cover"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
              <button
                className="bg-white text-black px-3 py-1 rounded shadow hover:bg-gray-200"
                onClick={() => setSelectedTemplate(template)}
              >
                Preview
              </button>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700"
                onClick={() => alert(`Applied: ${template.name}`)}
              >
                Apply
              </button>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded shadow hover:bg-yellow-600"
                onClick={() => handleEdit(template)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded shadow hover:bg-red-700"
                onClick={() => handleDelete(template.id)}
              >
                Delete
              </button>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-bold dark:text-white">{template.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{template.description}</p>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < template.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974 4.18.012c.969.003 1.371 1.24.588 1.81l-3.36 2.446 1.285 3.976c.3.92-.755 1.688-1.54 1.118l-3.365-2.447-3.364 2.447c-.785.57-1.838-.198-1.539-1.118l1.285-3.976-3.36-2.446c-.784-.57-.38-1.807.588-1.81l4.18-.012 1.286-3.974z" />
</svg>
))}
<span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
Used by {template.usedBy.toLocaleString()}
</span>
</div>
</div>
</div>
))}
</div>

  {/* Preview Modal */}
  {selectedTemplate && (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={() => setSelectedTemplate(null)}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-2 dark:text-white">{selectedTemplate.name}</h2>
        <p className="mb-4 dark:text-gray-300">{selectedTemplate.description}</p>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
        >
          {selectedTemplate.images.map((src, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={src}
                alt={`${selectedTemplate.name} preview ${idx + 1}`}
                className="w-full rounded-lg max-h-80 object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          onClick={() => setSelectedTemplate(null)}
        >
          &times;
        </button>
      </div>
    </div>
  )}

  {/* Add/Edit Modal */}
  {showModal && (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={() => {
        setShowModal(false);
        setEditingTemplateId(null);
        setImagePreviews([]);
      }}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          {editingTemplateId !== null ? 'Edit Template' : 'Add New Template'}
        </h2>

        <label className="block mb-2 text-gray-700 dark:text-gray-300">Name</label>
        <input
          type="text"
          value={newTemplate.name}
          onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:text-white"
        />

        <label className="block mb-2 text-gray-700 dark:text-gray-300">Description</label>
        <textarea
          value={newTemplate.description}
          onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:text-white"
        />

        <label className="block mb-2 text-gray-700 dark:text-gray-300">Category</label>
        <select
          value={newTemplate.category}
          onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:text-white"
        >
          {categories.filter((c) => c !== 'All').map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label className="block mb-2 text-gray-700 dark:text-gray-300">Tag</label>
        <select
          value={newTemplate.tag}
          onChange={(e) => setNewTemplate({ ...newTemplate, tag: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:text-white"
        >
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
        </select>

        <label className="block mb-2 text-gray-700 dark:text-gray-300">Used By</label>
        <input
          type="number"
          value={newTemplate.usedBy}
          onChange={(e) =>
            setNewTemplate({ ...newTemplate, usedBy: parseInt(e.target.value) || 0 })
          }
          className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:text-white"
        />

        <label className="block mb-2 text-gray-700 dark:text-gray-300">Rating</label>
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <svg
              key={value}
              onClick={() => handleRatingChange(value)}
              className={`h-6 w-6 cursor-pointer ${
                value <= newTemplate.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974 4.18.012c.969.003 1.371 1.24.588 1.81l-3.36 2.446 1.285 3.976c.3.92-.755 1.688-1.54 1.118l-3.365-2.447-3.364 2.447c-.785.57-1.838-.198-1.539-1.118l1.285-3.976-3.36-2.446c-.784-.57-.38-1.807.588-1.81l4.18-.012 1.286-3.974z" />
            </svg>
          ))}
        </div>

        <label className="block mb-2 text-gray-700 dark:text-gray-300">Upload Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />

        {/* Preview thumbnails */}
        <div className="flex gap-2 overflow-x-auto mb-4">
          {imagePreviews.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="preview"
              className="h-20 w-20 rounded object-cover"
            />
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => {
              setShowModal(false);
              setEditingTemplateId(null);
              setImagePreviews([]);
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleAddOrEditTemplate}
          >
            {editingTemplateId !== null ? 'Save Changes' : 'Add Template'}
          </button>
        </div>
      </div>
    </div>
  )}
</div>
);
}
export default Templates;

