import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { Pencil, Trash2, FileText } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSelectedClient } from '../../Slices/selectedClientSlice'; 
import 'react-toastify/dist/ReactToastify.css';
const API_URL = 'http://localhost:5000/api/clients';
//const COUNTRY_API = 'https://countriesnow.space/api/v0.1/countries';
const COUNTRY_API = 'https://countriesnow.space/api/v0.1';

const initialValues = {
  name: '', email: '', phone: '', address: '', city: '', zipCode: '', country: '',
  state: '', companyName: '', gst: '', pan: '', cin: '', notes: ''
};
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid').required('Required'),
  phone: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  companyName: Yup.string(),
  gst: Yup.string(),
  pan: Yup.string(),
  cin: Yup.string(),
  notes: Yup.string()
});

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchClients();
    fetchCountries();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get(API_URL);
      setClients(res.data);
    } catch {
      toast.error('Failed to load clients');
    }
  };


  const fetchCountries = async () => {
  try {
    const res = await axios.get(`${COUNTRY_API}/countries/positions`);
    // const res = await axios.get(`${COUNTRY_API}/countries/positions`);
    const countryList = res.data.data.map(c => c.name);
    setCountries(countryList);
  } catch (error) {
    toast.error('Failed to fetch countries');
    console.error(error);
  }
};

const fetchStates = async (country) => {
  try {
    const res = await axios.post(`${COUNTRY_API}/countries/states`, {
      country
    });
    // const res = await axios.post(`${COUNTRY_API}/countries/states`, { country });
    if (res.data.data && res.data.data.states) {
      setStates(res.data.data.states.map(s => s.name));
    } else {
      throw new Error('Invalid state data');
    }
  } catch (error) {
    toast.error('Failed to fetch states');
    console.error(error);
  }

};

const fetchCities = async (country, state) => {
  if (!country || !state) {
    console.warn('Missing country or state for cities fetch');
    return;
  }

  try {
    console.log('Fetching cities for:', { country, state });

    const res = await axios.post(`${COUNTRY_API}/countries/state/cities`, {
      country: country.trim(),
      state: state.trim(),
    });

    if (res.data && Array.isArray(res.data.data)) {
      setCities(res.data.data);
    } else {
      toast.error('No cities found');
      console.warn('City fetch response:', res.data);
    }
  } catch (error) {
    toast.error('Failed to fetch cities');
    console.error('Error fetching cities:', error);
  }
};
  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${clientToEdit._id}`, values);
        toast.success('Client updated successfully');
        fetchClients();
      } else {
        const res = await axios.post(API_URL, values);
        const newClient = res.data;
        setClients(prev => [newClient, ...prev]);
        toast.success('Client added successfully');
      }
      setIsModalOpen(false);
      setIsEditMode(false);
      setClientToEdit(null);
      resetForm();
    } catch {
      toast.error('Error saving client');
    }
  };

  const handleEdit = async (client) => {
    setClientToEdit(client);
    await fetchStates(client.country);
    await fetchCities(client.country, client.state);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (client) => {
  setClientToDelete(client);
  setDeleteConfirmOpen(true);
};

const confirmDelete = async () => {
  if (!clientToDelete || !clientToDelete._id) {
    toast.error("Client ID missing for deletion.");
    return;
  }

  try {
    await axios.delete(`${API_URL}/${clientToDelete._id}`);
    setClients(prev => prev.filter(c => c._id !== clientToDelete._id));
    toast.success('Client deleted');
  } catch (err) {
    toast.error('Failed to delete client');
    console.error(err);
  } finally {
    setDeleteConfirmOpen(false);
    setClientToDelete(null);
  }
};


  const handleCreateInvoice = (client) => {
    dispatch(setSelectedClient(client));
    toast.success('Client selected for invoice creation');
    navigate('/invoices');
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.companyName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h2 className="text-3xl font-semibold mb-6 text-left">Client List</h2>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name, email, phone, company..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          // onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 border rounded"
        />
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditMode(false);
            setClientToEdit(null);
            setStates([]);
            setCities([]);
          }}
          className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 ml-4"
        >
          Add New Client
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-[800px] max-h-[90vh] overflow-auto">
            <h3 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Client' : 'Add Client'}</h3>
            <Formik
              // initialValues={clientToEdit || initialValues}
              initialValues={{
                              ...initialValues,
                              ...clientToEdit
                            }}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.keys(initialValues).map((key) => (
                    <div key={key} className={key === 'notes' ? 'col-span-3' : ''}>
                      <label className="text-sm font-medium block capitalize">{key}</label>
                      {key === 'country' ? (
                        <Field
                          as="select"
                          name="country"
                          className="w-full p-2 border rounded"
                          onChange={async (e) => {
                            const country = e.target.value;
                            setFieldValue('country', country);
                            setFieldValue('state', '');
                            setFieldValue('city', '');
                            setStates([]);
                            setCities([]);
                            await fetchStates(country);
                          }}
                        >
                          <option value="">Select Country</option>
                          {countries.map(c => <option key={c} value={c}>{c}</option>)}
                        </Field>
                      ) : key === 'state' ? (
                        <Field
                          as="select"
                          name="state"
                          className="w-full p-2 border rounded"
                          onChange={async (e) => {
                            const state = e.target.value;
                            setFieldValue('state', state);
                            setFieldValue('city', '');
                            await fetchCities(values.country, state);
                          }}
                        >
                          <option value="">Select State</option>
                          {states.map(s => <option key={s} value={s}>{s}</option>)}
                        </Field>
                      ) : key === 'city' ? (
                        <Field as="select" name="city" className="w-full p-2 border rounded">
                          <option value="">Select City</option>
                          {cities.map(c => <option key={c} value={c}>{c}</option>)}
                        </Field>
                      ) : key === 'notes' ? (
                        <Field as="textarea" name={key} className="w-full p-2 border rounded" />
                      ) : (
                        <Field type="text" name={key} className="w-full p-2 border rounded" />
                      )}
                      <ErrorMessage name={key} component="div" className="text-red-600 text-sm" />
                    </div>
                  ))}
                  <div className="col-span-3 flex justify-between mt-4">
                    <button onClick={() => setIsModalOpen(false)} type="button" className="bg-gray-400 text-white py-2 px-4 rounded">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                      {isEditMode ? 'Update' : 'Add'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      <table className="w-full mt-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
  <thead className="bg-blue-600 text-black uppercase text-sm">
    <tr>
      <th className="text-left px-4 py-3">Name</th>
      <th className="text-left px-4 py-3">Email</th>
      <th className="text-left px-4 py-3">Phone</th>
      <th className="text-left px-4 py-3">Address</th>
      <th className="text-left px-4 py-3">Company</th>
      <th className="text-left px-4 py-3">Actions</th>
    </tr>
  </thead>
  <tbody className="text-gray-800">
    {clients.length === 0 ? (
      <tr>
        <td colSpan="6" className="text-center py-4">
          No clients found
        </td>
      </tr>
    ) : null}
    {filteredClients
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .map((client, index) => (
      <tr
        key={client._id}
        className={`border-t border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
      >
        <td className="px-4 py-3">{client.name}</td>
        <td className="px-4 py-3">{client.email}</td>
        <td className="px-4 py-3">{client.phone}</td>
        <td className="px-4 py-3">{client.address}</td>
        <td className="px-4 py-3">{client.companyName}</td>
        <td className="px-4 py-3 space-x-3">
          <button onClick={() => handleEdit(client)} className="text-blue-600 hover:text-blue-800">
            <Pencil size={18} />
          </button>
          <button onClick={() => handleDelete(client)} className="text-red-600 hover:text-red-800">
            <Trash2 size={18} />
          </button>
          {/* <button onClick={() => handleCreateInvoice(client)} className="text-green-600 hover:text-green-800">
            <FileText size={18} />
          </button> */}
        </td>
      </tr>
    ))}
  </tbody>
</table>

{/* <div className="flex justify-center items-center mt-6 space-x-2"> */}
<div className="flex justify-end items-center mt-6 space-x-2 sticky bottom-0 bg-white py-4 pr-6 z-10 shadow-inner">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
  >
    Previous
  </button>
  <span className="px-4 py-2">
    Page {currentPage} of {Math.ceil(filteredClients.length / itemsPerPage)}
  </span>
  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredClients.length / itemsPerPage)))}
    disabled={currentPage === Math.ceil(filteredClients.length / itemsPerPage)}
    className={`px-4 py-2 rounded ${currentPage === Math.ceil(filteredClients.length / itemsPerPage) ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
  >
    Next
  </button>
</div>
{deleteConfirmOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Confirm Deletion</h3>
      <p className="text-gray-700 mb-6">Are you sure you want to delete <strong>{clientToDelete?.name}</strong>?</p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setDeleteConfirmOpen(false)}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            try {
              await axios.delete(`${API_URL}/${clientToDelete._id}`);
              setClients(prev => prev.filter(c => c._id !== clientToDelete._id));
              toast.success('Client deleted');
            } catch {
              toast.error('Error deleting client');
            } finally {
              setDeleteConfirmOpen(false);
              setClientToDelete(null);
            }
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};
export default ClientList;