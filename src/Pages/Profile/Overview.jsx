import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line
} from 'recharts';
import { useLocation,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Overview = () => {
    const navigate = useNavigate();
  const activity = [
    { id: 1, text: '✅ Completed “Modern Logo”' },
    { id: 2, text: '💬 New message from client John' },
    { id: 3, text: '📤 Sent quotation for “Brochure Design”' },
    { id: 4, text: '📅 Meeting scheduled on Friday' },
  ];

  const chartData = [
    { name: 'Completed', value: 14 },
    { name: 'In Progress', value: 6 },
    { name: 'Pending', value: 4 },
  ];

  const earningsData = [
    { month: 'Jan', value: 1000 },
    { month: 'Feb', value: 2000 },
    { month: 'Mar', value: 1800 },
    { month: 'Apr', value: 3200 },
  ];

  const recentClients = ['John Doe', 'Alice Smith', 'Raj Kumar', 'Emily Carter'];
  const topServices = ['Logo Design', 'Website UI', 'Branding Kit'];
  const location = useLocation();

useEffect(() => {
  if (location.state?.loginSuccess) {
    toast.success('Login successful!');
  }
}, [location.state]);

  return (
    <div className="p-6 space-y-10 bg-gray-100 min-h-screen">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back  </h1>
        {/* <button onClick={() => navigate("/new-project")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaPlusCircle /> New Project
        </button> */}
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Total Projects" value="32" color="bg-blue-500" />
        <SummaryCard title="Active Clients" value="10" color="bg-green-500" />
        <SummaryCard title="Revenue (This Month)" value="$5,400" color="bg-yellow-500" />
        <SummaryCard title="New Feedbacks" value="24" color="bg-purple-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Project Status</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Monthly Earnings</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lower Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel title="Recent Activity" items={activity.map(item => item.text)} icon="📝" />
        <Panel title="Top Services" items={topServices.map(s => s)} icon="🎯" />
        <Panel title="Recent Clients" items={recentClients.map(c => c)} icon="👤" />
      </div>
          <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
};

const SummaryCard = ({ title, value, color }) => (
  <div className={`${color} text-white p-5 rounded-xl shadow-md`}>
    <h3 className="text-lg font-medium">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

const Panel = ({ title, items, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-5">
    <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>
    <ul className="text-gray-600 space-y-3">
      {items.map((item, index) => (
        <li key={index}>{icon} {item}</li>
      ))}
    </ul>
  </div>
  
);

export default Overview;
