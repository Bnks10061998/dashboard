import  { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaBars, FaTimes, FaTachometerAlt, FaProjectDiagram, FaEnvelope,
  FaCalendarAlt, FaFileInvoiceDollar, FaUserCircle, FaSignOutAlt,
  FaCog, FaListAlt, FaCreditCard, FaQuoteLeft, 
  FaImages, FaPalette, FaComments, FaTools, FaSun, FaMoon,
  FaChevronDown, FaChevronRight, FaFolderOpen
} from 'react-icons/fa';

const menuItems = [
  { to: '/overview', icon: <FaTachometerAlt />, label: 'Overview' },
   {
    label: 'Enter and Maintain', icon: <FaFolderOpen />, children: [
      { to: '/add-work', icon: <FaCog />, label: 'Add Work Details' },
      { to: '/client-list', icon: <FaListAlt />, label: 'Client List' },
      // { to: '/refers', icon: <FaUserFriends />, label: 'Refers' },
    ]
  },
  {to: '/projects', icon: <FaProjectDiagram />, label: 'My Projects'},
  // { to: '/gallery', icon: <FaImages />, label: 'Project Gallery' },
  // { to: '/templates', icon: <FaPalette />, label: 'Design Templates' },
  
  // {
  //   label: 'Status', icon: <FaFolderOpen />, children: [
  //     { to: '/invoices', icon: <FaFileInvoiceDollar />, label: 'Invoices' },
  //     { to: '/invoice-list', icon: <FaFileInvoiceDollar />, label: 'Invoice Status' },
  //     { to: '/payment', icon: <FaCreditCard />, label: 'Payment' },
  //     { to: '/quotation', icon: <FaQuoteLeft />, label: 'Quotation' },
  //   ]
  // },

  // {
  //   label: 'Common', icon: <FaFolderOpen />, children: [
  //     { to: '/feedback', icon: <FaComments />, label: 'Client Feedback' },
  //     { to: '/calendar', icon: <FaCalendarAlt />, label: 'Calendar' },
  //     { to: '/messages', icon: <FaEnvelope />, label: 'Messages' },
  //     { to: '/profile', icon: <FaUserCircle />, label: 'Profile' },
  //     { to: '/settings', icon: <FaTools />, label: 'Settings' },
  //   ]
  // },

  // { to: '/logout', icon: <FaSignOutAlt />, label: 'Logout', special: true }
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-blue-900 p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      <div className={`
        fixed top-0 left-0 h-full z-40 p-4 pt-6
        transform transition-all duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block
        ${collapsed ? 'w-20' : 'w-64'}
        ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-900 text-white'}
      `}>
        <div className="flex justify-between items-center mb-6">
          {!collapsed && <h2 className="text-2xl font-bold">Dashboard</h2>}
          <div className="flex gap-2">
            <button
              className="text-white p-1 hover:bg-blue-800 rounded"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <FaBars size={18} /> : <FaTimes size={18} />}
            </button>
            <button
              className="text-white p-1 hover:bg-yellow-600 rounded"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>
        </div>

        <ul className="space-y-3">
          {menuItems.map(item => (
            <MenuItem
              key={item.label + item.to}
              item={item}
              collapsed={collapsed}
              location={location}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

const MenuItem = ({ item, collapsed, location }) => {
  const { to, icon, label, special, children } = item;
  const [open, setOpen] = useState(false);
  const hasChildren = Array.isArray(children);
  const isActive = to ? location.pathname === to : false;

  return (
    <li className="relative">
      <div
        className={`flex items-center justify-between hover:bg-blue-700 p-2 rounded transition-all duration-300 ease-in-out
          ${special ? 'hover:bg-red-600' : ''}
          ${isActive ? 'bg-blue-800' : ''}`}
        onClick={() => hasChildren && setOpen(!open)}
      >
        {to ? (
          <Link to={to} className="flex items-center gap-3">
            {icon && <span className="text-xl w-6 flex-shrink-0 text-center">{icon}</span>}
            <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
              ${collapsed ? 'opacity-0 w-0 translate-x-2' : 'opacity-100 w-full'}`}>{label}</span>
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            {icon && <span className="text-xl w-6 flex-shrink-0 text-center">{icon}</span>}
            <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
              ${collapsed ? 'opacity-0 w-0 translate-x-2' : 'opacity-100 w-full'}`}>{label}</span>
          </div>
        )}
        {hasChildren && !collapsed && <span>{open ? <FaChevronDown /> : <FaChevronRight />}</span>}
      </div>

      {hasChildren && open && (
        <ul className="pl-8 mt-2 space-y-2">
          {children.map(sub => (
            <li key={sub.to}>
              <Link
                to={sub.to}
                className={`flex items-center gap-3 hover:bg-blue-700 p-2 rounded transition-all duration-300 ease-in-out
                  ${location.pathname === sub.to ? 'bg-blue-800' : ''}`}
              >
                {sub.icon && <span className="text-xl w-6 flex-shrink-0 text-center">{sub.icon}</span>}
                <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
                  ${collapsed ? 'opacity-0 w-0 translate-x-2' : 'opacity-100 w-full'}`}>{sub.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Sidebar;

