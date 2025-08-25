import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "../src/webRoutes/Sidebar";
import webRoutes from "../src/webRoutes/webRoutes";

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/auth";

  return (
    <div className="flex">
      {!isAuthPage && <Sidebar />}
      <div className="flex-1 p-4">
        <Routes>
          {webRoutes.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default Layout;















// import { Routes, Route, useLocation } from 'react-router-dom';
// import Sidebar from '../Components/Sidebar';
// import WorkForm from '../Components/WorkForm';
// import ClientList from '../Components/ClientList';
// import Payment from '../Components/Payment';
// import Quotation from '../Components/Quotation';
// import Overview from '../Pages/Overview';
// import NewProject from '../Pages/Project/NewProject';
// import Projects from '../Pages/Projects';
// import Gallery from '../Pages/Gallery';
// import Templates from '../Pages/Templates';
// import Feedback from '../Pages/Feedback';
// import Invoices from '../Pages/Invoices';
// import CalendarPage from '../Pages/Calendar';
// import Messages from '../Pages/Messages';
// import Profile from '../Pages/Profile';
// import Settings from '../Pages/Settings';
// import Logout from '../Pages/Logout';
// import PersonalDetail from '../Pages/PersonalDetail';
// import AuthPage from '../Components/AuthPage';
// import InvoicePDF from '../Pages/InvoicePDF';

// const Layout = () => {
//   const location = useLocation();
//   const isAuthPage = location.pathname === '/' || location.pathname === '/auth';

//   return (
//     <div className="flex">
//       {!isAuthPage && <Sidebar />}
//       <div className="flex-1 p-4">
//         <Routes>
//           <Route path="/" element={<AuthPage />} />
//           <Route path="/auth" element={<AuthPage />} />
//           <Route path="/overview" element={<Overview />} />
//           <Route path="/new-project" element={<NewProject />} />
//           <Route path="/client-list" element={<ClientList />} />
//           <Route path="/add-work" element={<WorkForm />} />
//           <Route path="/projects" element={<Projects />} />
//           <Route path="/gallery" element={<Gallery />} />
//           <Route path="/templates" element={<Templates />} />
//           <Route path="/quotation" element={<Quotation />} />
//           <Route path="/payment" element={<Payment />} />
//           <Route path="/invoices" element={<Invoices />} />
//           <Route path="/invoice-list" element={<InvoicePDF />} />
//           <Route path="/feedback" element={<Feedback />} />
//           <Route path="/calendar" element={<CalendarPage />} />
//           <Route path="/messages" element={<Messages />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/personal-details" element={<PersonalDetail />} />
//           <Route path="/logout" element={<Logout />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Layout;
