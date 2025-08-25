// import React, { useState, useEffect } from 'react';
// import { saveAs } from 'file-saver';
// import Papa from 'papaparse';

// const Gallery = () => {
//   const [images, setImages] = useState([]);
//   const [filter, setFilter] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [selectedImage, setSelectedImage] = useState(null);

//   const [newImage, setNewImage] = useState({
//     title: '',
//     description: '',
//     category: '',
//     uploadDate: '',
//     tags: '',
//     url: ''
//   });

//   useEffect(() => {
//     // Initial mock data
//     setImages([
//       {
//         id: 1,
//         url: 'https://via.placeholder.com/400x250',
//         title: 'Mountain View',
//         description: 'A beautiful view of the mountains.',
//         category: 'Nature',
//         uploadDate: '2025-04-15',
//         tags: ['mountain', 'sunset', 'nature']
//       },
//     ]);
//   }, []);

//   const handleFilterChange = (e) => setFilter(e.target.value);
//   const handleSortChange = (e) => setSortOrder(e.target.value);
//   const handleImageClick = (image) => setSelectedImage(image);
//   const handleCloseModal = () => setSelectedImage(null);

//   const handleInputChange = (e) => {
//     setNewImage({ ...newImage, [e.target.name]: e.target.value });
//   };

//   const handleUpload = () => {
//     if (!newImage.url || !newImage.title) return alert('Title and URL are required');
//     setImages([
//       ...images,
//       {
//         ...newImage,
//         id: images.length + 1,
//         tags: newImage.tags.split(',').map(tag => tag.trim())
//       }
//     ]);
//     setNewImage({ title: '', description: '', category: '', uploadDate: '', tags: '', url: '' });
//   };

//   const exportToCSV = () => {
//     const csv = Papa.unparse(images.map(img => ({
//       title: img.title,
//       description: img.description,
//       category: img.category,
//       uploadDate: img.uploadDate,
//       tags: img.tags.join(', '),
//       url: img.url
//     })));
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     saveAs(blob, 'gallery_images.csv');
//   };

//   const filteredImages = images
//     .filter(image => image.title.toLowerCase().includes(filter.toLowerCase()))
//     .sort((a, b) => sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

//   return (
//     <div className="p-6">
//       {/* Upload Form */}
//       <div className="mb-6 space-y-2">
//         <h2 className="text-xl font-bold">Add New Image</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <input type="text" name="title" placeholder="Title" value={newImage.title} onChange={handleInputChange} className="border p-2 rounded" />
//           <input type="text" name="url" placeholder="Image URL" value={newImage.url} onChange={handleInputChange} className="border p-2 rounded" />
//           <input type="text" name="category" placeholder="Category" value={newImage.category} onChange={handleInputChange} className="border p-2 rounded" />
//           <input type="date" name="uploadDate" value={newImage.uploadDate} onChange={handleInputChange} className="border p-2 rounded" />
//           <input type="text" name="tags" placeholder="Tags (comma-separated)" value={newImage.tags} onChange={handleInputChange} className="border p-2 rounded" />
//           <input type="text" name="description" placeholder="Description" value={newImage.description} onChange={handleInputChange} className="border p-2 rounded" />
//         </div>
//         <button onClick={handleUpload} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Upload</button>
//       </div>

//       {/* Filter & Export */}
//       <div className="mb-6 flex flex-col md:flex-row justify-between gap-4 items-center">
//         <input
//           type="text"
//           placeholder="Search by title..."
//           className="border px-4 py-2 rounded-xl w-full md:w-1/3"
//           value={filter}
//           onChange={handleFilterChange}
//         />
//         <div className="flex gap-2">
//           <select className="border px-4 py-2 rounded-xl" value={sortOrder} onChange={handleSortChange}>
//             <option value="asc">Sort A-Z</option>
//             <option value="desc">Sort Z-A</option>
//           </select>
//           <button onClick={exportToCSV} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Export CSV</button>
//         </div>
//       </div>

//       {/* Gallery Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//         {filteredImages.map(image => (
//           <div key={image.id} onClick={() => handleImageClick(image)} className="group bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition">
//             <img src={image.url} alt={image.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold">{image.title}</h3>
//               <p className="text-sm text-gray-500">{image.category}</p>
//               <p className="text-xs text-gray-400">Uploaded: {image.uploadDate}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       {selectedImage && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-xl p-6 w-[95%] md:w-[600px] relative">
//             <button onClick={handleCloseModal} className="absolute top-2 right-4 text-gray-500 text-2xl font-bold hover:text-red-500">
//               &times;
//             </button>
//             <img src={selectedImage.url} alt={selectedImage.title} className="rounded-lg w-full h-auto" />
//             <h2 className="text-2xl font-bold mt-4">{selectedImage.title}</h2>
//             <p className="text-gray-600 mt-2">{selectedImage.description}</p>
//             <div className="mt-4">
//               <p><strong>Category:</strong> {selectedImage.category}</p>
//               <p><strong>Uploaded:</strong> {selectedImage.uploadDate}</p>
//               <div className="mt-2 flex flex-wrap gap-2">
//                 {selectedImage.tags.map((tag, index) => (
//                   <span key={index} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">#{tag}</span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Gallery;


import React, { useState, useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import axios from 'axios';

const API_BASE = 'http://localhost:5000'; // Adjust if needed

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef();

  const [newImage, setNewImage] = useState({
    title: '',
    description: '',
    category: '',
    uploadDate: '',
    tags: '',
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/gallery`);
      setImages(res.data);
    } catch (err) {
      console.error('Error fetching images:', err);
      setImages([]);
      setMessage('Failed to load images');
    } finally {
      setLoading(false);
      clearMessageAfterDelay();
    }
  };

  const clearMessageAfterDelay = () => {
    setTimeout(() => setMessage(null), 3000);
  };

  const handleInputChange = (e) => {
    setNewImage({ ...newImage, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (file.length === 0 || !newImage.title.trim()) {
      return alert('Please select at least one image and enter a title');
    }

    setLoading(true);
    try {
      const formData = new FormData();
      file.forEach((f) => formData.append('images', f));
      formData.append('title', newImage.title.trim());
      formData.append('description', newImage.description.trim());
      formData.append('category', newImage.category.trim());
      formData.append(
        'uploadDate',
        newImage.uploadDate || new Date().toISOString().split('T')[0]
      );
      formData.append('tags', newImage.tags);

      const res = await axios.post(`${API_BASE}/api/gallery`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setImages((prev) => [...prev, ...res.data]);
      setNewImage({ title: '', description: '', category: '', uploadDate: '', tags: '' });
      setFile([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setMessage('Images uploaded successfully');
    } catch (err) {
      console.error('Error uploading images:', err);
      setMessage('Image upload failed');
    } finally {
      setLoading(false);
      clearMessageAfterDelay();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    setLoading(true);
    try {
      await axios.delete(`${API_BASE}/api/gallery/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
      setSelectedImage(null);
      setMessage('Image deleted successfully');
    } catch (err) {
      console.error('Error deleting image:', err);
      setMessage('Failed to delete image');
    } finally {
      setLoading(false);
      clearMessageAfterDelay();
    }
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(
      images.map((img) => ({
        title: img.title,
        description: img.description,
        category: img.category,
        uploadDate: img.uploadDate,
        tags: Array.isArray(img.tags) ? img.tags.join(', ') : img.tags,
        url: img.url,
      }))
    );
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'gallery_images.csv');
  };

  const filteredImages = images
    .filter((image) => image.title.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) =>
      sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Message & Loading */}
      {message && (
        <div className="mb-4 p-3 rounded bg-blue-200 text-blue-800 font-medium">{message}</div>
      )}
      {loading && (
        <div className="mb-4 p-3 rounded bg-gray-200 text-gray-700 font-medium">
          Loading...
        </div>
      )}

      {/* Upload Section */}
      <div className="mb-6 space-y-2">
        <h2 className="text-xl font-bold">Add New Image</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title *"
            value={newImage.title}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newImage.category}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="uploadDate"
            value={newImage.uploadDate}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma-separated)"
            value={newImage.tags}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newImage.description}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={loading || !file.length || !newImage.title.trim()}
          className={`mt-2 px-4 py-2 rounded text-white ${
            loading || !file.length || !newImage.title.trim()
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Upload
        </button>
      </div>

      {/* Filter & Sort */}
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4 items-center">
        <input
          type="text"
          placeholder="Search by title..."
          className="border px-4 py-2 rounded-xl w-full md:w-1/3"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="flex gap-2">
          <select
            className="border px-4 py-2 rounded-xl"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort A-Z</option>
            <option value="desc">Sort Z-A</option>
          </select>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <div
            key={image._id}
            onClick={() => setSelectedImage(image)}
            className="group bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition"
            title={image.title}
          >
            <img
              src={`${API_BASE}${image.url}`}
              alt={image.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">{image.title}</h3>
              <p className="text-sm text-gray-500 truncate">{image.category}</p>
              <p className="text-xs text-gray-400">Uploaded: {image.uploadDate}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Image */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-4 text-gray-500 text-3xl font-bold hover:text-red-500"
              aria-label="Close modal"
            >
              &times;
            </button>
            <img
              src={`${API_BASE}${selectedImage.url}`}
              alt={selectedImage.title}
              className="rounded-lg w-full h-auto mb-4"
            />
            <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
            <p className="text-gray-600 mt-2 whitespace-pre-wrap">{selectedImage.description}</p>
            <div className="mt-4">
              <p>
                <strong>Category:</strong> {selectedImage.category || 'N/A'}
              </p>
              <p>
                <strong>Uploaded:</strong> {selectedImage.uploadDate || 'N/A'}
              </p>
              <p className="mt-2">
                <strong>Tags:</strong>{' '}
                {Array.isArray(selectedImage.tags) && selectedImage.tags.length > 0 ? (
                  selectedImage.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm mr-2"
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span>N/A</span>
                )}
              </p>
            </div>
            <button
              onClick={() => handleDelete(selectedImage._id)}
              className="mt-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;






// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { saveAs } from 'file-saver';
// import Papa from 'papaparse';

// const API_BASE = 'http://localhost:5000';

// const Gallery = () => {
//   const [images, setImages] = useState([]);
//   const [filter, setFilter] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [editData, setEditData] = useState({});
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [file, setFile] = useState([]);
//   const fileInputRef = useRef();

//   const [newImage, setNewImage] = useState({
//     title: '',
//     description: '',
//     category: '',
//     uploadDate: '',
//     tags: '',
//   });

//   useEffect(() => {
//     fetchImages(1, true);
//   }, []);

//   const fetchImages = async (pageToFetch = 1, reset = false) => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/api/gallery`, {
//         params: { page: pageToFetch, limit: 8 },
//       });
//       const { images: fetchedImages, total, pages: totalPages } = res.data;
//       setPages(totalPages);
//       setPage(pageToFetch);

//       if (reset) {
//         setImages(fetchedImages);
//       } else {
//         setImages((prev) => [...prev, ...fetchedImages]);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage('Failed to load images');
//     } finally {
//       setLoading(false);
//       clearMessageAfterDelay();
//     }
//   };

//   const clearMessageAfterDelay = () => {
//     setTimeout(() => setMessage(null), 3000);
//   };

//   const handleInputChange = (e) => {
//     setNewImage({ ...newImage, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFile(Array.from(e.target.files));
//   };

//   const handleUpload = async () => {
//     if (file.length === 0 || !newImage.title.trim()) {
//       return alert('Please select at least one image and enter a title');
//     }

//     setLoading(true);
//     try {
//       const formData = new FormData();
//       file.forEach((f) => formData.append('images', f));
//       formData.append('title', newImage.title.trim());
//       formData.append('description', newImage.description.trim());
//       formData.append('category', newImage.category.trim());
//       formData.append(
//         'uploadDate',
//         newImage.uploadDate || new Date().toISOString().split('T')[0]
//       );
//       formData.append('tags', newImage.tags);

//       const res = await axios.post(`${API_BASE}/api/gallery`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       setImages((prev) => [...res.data, ...prev]);
//       setNewImage({ title: '', description: '', category: '', uploadDate: '', tags: '' });
//       setFile([]);
//       if (fileInputRef.current) fileInputRef.current.value = '';
//       setMessage('Images uploaded successfully');
//     } catch (err) {
//       console.error(err);
//       setMessage('Image upload failed');
//     } finally {
//       setLoading(false);
//       clearMessageAfterDelay();
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this image?')) return;

//     setLoading(true);
//     try {
//       await axios.delete(`${API_BASE}/api/gallery/${id}`);
//       setImages((prev) => prev.filter((img) => img._id !== id));
//       setSelectedImage(null);
//       setEditing(false);
//       setMessage('Image deleted successfully');
//     } catch (err) {
//       console.error(err);
//       setMessage('Failed to delete image');
//     } finally {
//       setLoading(false);
//       clearMessageAfterDelay();
//     }
//   };

//   const exportToCSV = () => {
//     const csv = Papa.unparse(
//       images.map((img) => ({
//         title: img.title,
//         description: img.description,
//         category: img.category,
//         uploadDate: img.uploadDate,
//         tags: Array.isArray(img.tags) ? img.tags.join(', ') : img.tags,
//         url: img.url,
//       }))
//     );
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     saveAs(blob, 'gallery_images.csv');
//   };

//   const filteredImages = images
//     .filter((image) => image.title.toLowerCase().includes(filter.toLowerCase()))
//     .sort((a, b) =>
//       sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
//     );

//   // Start editing selected image
//   const startEditing = () => {
//     if (selectedImage) {
//       setEditData({
//         title: selectedImage.title || '',
//         description: selectedImage.description || '',
//         category: selectedImage.category || '',
//         uploadDate: selectedImage.uploadDate || '',
//         tags: Array.isArray(selectedImage.tags) ? selectedImage.tags.join(', ') : '',
//       });
//       setEditing(true);
//     }
//   };

//   const cancelEditing = () => {
//     setEditing(false);
//     setEditData({});
//   };

//   // Save edits to backend
//   const saveEdits = async () => {
//     if (!editData.title.trim()) {
//       return alert('Title is required');
//     }
//     setLoading(true);
//     try {
//       const res = await axios.patch(`${API_BASE}/api/gallery/${selectedImage._id}`, editData);
//       setImages((prev) =>
//         prev.map((img) => (img._id === res.data._id ? res.data : img))
//       );
//       setSelectedImage(res.data);
//       setEditing(false);
//       setMessage('Image updated successfully');
//     } catch (err) {
//       console.error(err);
//       setMessage('Failed to update image');
//     } finally {
//       setLoading(false);
//       clearMessageAfterDelay();
//     }
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {message && (
//         <div className="mb-4 p-3 rounded bg-blue-200 text-blue-800 font-medium">{message}</div>
//       )}
//       {loading && (
//         <div className="mb-4 p-3 rounded bg-gray-200 text-gray-700 font-medium">Loading...</div>
//       )}

//       {/* Upload Section */}
//       <div className="mb-6 space-y-2">
//         <h2 className="text-xl font-bold">Add New Image</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <input
//             type="text"
//             name="title"
//             placeholder="Title *"
//             value={newImage.title}
//             onChange={handleInputChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleFileChange}
//             className="border p-2 rounded"
//           />
//           <input
//             type="text"
//             name="category"
//             placeholder="Category"
//             value={newImage.category}
//             onChange={handleInputChange}
//             className="border p-2 rounded"
//           />
//           <input
//             type="date"
//             name="uploadDate"
//             value={newImage.uploadDate}
//             onChange={handleInputChange}
//             className="border p-2 rounded"
//           />
//           <input
//             type="text"
//             name="tags"
//             placeholder="Tags (comma-separated)"
//             value={newImage.tags}
//             onChange={handleInputChange}
//             className="border p-2 rounded"
//           />
//           <input
//             type="text"
//             name="description"
//             placeholder="Description"
//             value={newImage.description}
//             onChange={handleInputChange}
//             className="border p-2 rounded"
//           />
//         </div>
//         <button
//           onClick={handleUpload}
//           disabled={loading || !file.length || !newImage.title.trim()}
//           className={`mt-2 px-4 py-2 rounded text-white ${
//             loading || !file.length || !newImage.title.trim()
//               ? 'bg-blue-300 cursor-not-allowed'
//               : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           Upload
//         </button>
//       </div>

//       {/* Filter & Sort */}
//       <div className="mb-6 flex flex-col md:flex-row justify-between gap-4 items-center">
//         <input
//           type="text"
//           placeholder="Search by title..."
//           className="border px-4 py-2 rounded-xl w-full md:w-1/3"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         />
//         <div className="flex gap-2">
//           <select
//             className="border px-4 py-2 rounded-xl"
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//           >
//             <option value="asc">Sort A-Z</option>
//             <option value="desc">Sort Z-A</option>
//           </select>
//           <button
//             onClick={exportToCSV}
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Image Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//         {filteredImages.map((image) => (
//           <div
//             key={image._id}
//             onClick={() => {
//               setSelectedImage(image);
//               setEditing(false);
//             }}
//             className="group bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition"
//             title={image.title}
//           >
//             <img
//               src={`${API_BASE}${image.url}`}
//               alt={image.title}
//               className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
//             />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold truncate">{image.title}</h3>
//               <p className="text-sm text-gray-500 truncate">{image.category}</p>
//               <p className="text-xs text-gray-400">Uploaded: {image.uploadDate}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Load More */}
//       {page < pages && (
//         <div className="mt-6 flex justify-center">
//           <button
//             onClick={() => fetchImages(page + 1)}
//             className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             disabled={loading}
//           >
//             Load More
//           </button>
//         </div>
//       )}

//       {/* Modal */}
//       {selectedImage && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
//             <button
//               onClick={() => {
//                 setSelectedImage(null);
//                 setEditing(false);
//               }}
//               className="absolute top-2 right-4 text-gray-500 text-3xl font-bold hover:text-red-500"
//               aria-label="Close modal"
//             >
//               &times;
//             </button>

//             <img
//               src={`${API_BASE}${selectedImage.url}`}
//               alt={selectedImage.title}
//               className="w-full max-h-96 object-contain rounded"
//             />

//             {/* Display or edit metadata */}
//             {!editing ? (
//               <>
//                 <h2 className="text-2xl font-bold mt-4">{selectedImage.title}</h2>
//                 <p className="mt-2">{selectedImage.description || 'No description'}</p>
//                 <p className="mt-2">
//                   <strong>Category:</strong> {selectedImage.category || 'N/A'}
//                 </p>
//                 <p className="mt-2">
//                   <strong>Uploaded:</strong> {selectedImage.uploadDate || 'N/A'}
//                 </p>
//                 <p className="mt-2">
//                   <strong>Tags:</strong>{' '}
//                   {Array.isArray(selectedImage.tags) && selectedImage.tags.length > 0 ? (
//                     selectedImage.tags.map((tag, idx) => (
//                       <span
//                         key={idx}
//                         className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm mr-2"
//                       >
//                         #{tag}
//                       </span>
//                     ))
//                   ) : (
//                     <span>N/A</span>
//                   )}
//                 </p>

//                 <div className="mt-6 flex gap-4">
//                   <button
//                     onClick={startEditing}
//                     className="px-6 py-2 bg-yellow-400 rounded hover:bg-yellow-500"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(selectedImage._id)}
//                     className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </>
//             ) : (
//               // Edit form
//               <div className="mt-4 space-y-4">
//                 <div>
//                   <label className="block font-semibold mb-1" htmlFor="editTitle">
//                     Title *
//                   </label>
//                   <input
//                     id="editTitle"
//                     type="text"
//                     value={editData.title}
//                     onChange={(e) => setEditData({ ...editData, title: e.target.value })}
//                     className="border p-2 rounded w-full"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" htmlFor="editDescription">
//                     Description
//                   </label>
//                   <textarea
//                     id="editDescription"
//                     value={editData.description}
//                     onChange={(e) => setEditData({ ...editData, description: e.target.value })}
//                     className="border p-2 rounded w-full"
//                     rows={3}
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" htmlFor="editCategory">
//                     Category
//                   </label>
//                   <input
//                     id="editCategory"
//                     type="text"
//                     value={editData.category}
//                     onChange={(e) => setEditData({ ...editData, category: e.target.value })}
//                     className="border p-2 rounded w-full"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" htmlFor="editUploadDate">
//                     Upload Date
//                   </label>
//                   <input
//                     id="editUploadDate"
//                     type="date"
//                     value={editData.uploadDate}
//                     onChange={(e) => setEditData({ ...editData, uploadDate: e.target.value })}
//                     className="border p-2 rounded w-full"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" htmlFor="editTags">
//                     Tags (comma separated)
//                   </label>
//                   <input
//                     id="editTags"
//                     type="text"
//                     value={editData.tags}
//                     onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
//                     className="border p-2 rounded w-full"
//                   />
//                 </div>

//                 <div className="flex gap-4 mt-4">
//                   <button
//                     onClick={saveEdits}
//                     className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                     disabled={loading}
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={cancelEditing}
//                     className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Gallery;
