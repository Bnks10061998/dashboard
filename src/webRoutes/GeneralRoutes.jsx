import Overview from "../Pages/Profile/Overview";
import Gallery from "../Pages/Profile/Gallery";
import Templates from "../Pages/Profile/Templates";
import Feedback from "../Pages/Profile/Feedback";
import CalendarPage from "../Pages/Profile/Calendar";
import Messages from "../Pages/Profile/Messages";
import Profile from "../Pages/Profile/Profile";
import Settings from "../Pages/Profile/Settings";
import PersonalDetail from "../Pages/Profile/PersonalDetail";
import Logout from "../Pages/Profile/Logout";

const GeneralRoutes = [
  { path: "/overview", element: <Overview /> },
  { path: "/gallery", element: <Gallery /> },
  { path: "/templates", element: <Templates /> },
  { path: "/feedback", element: <Feedback /> },
  { path: "/calendar", element: <CalendarPage /> },
  { path: "/messages", element: <Messages /> },
  { path: "/profile", element: <Profile /> },
  { path: "/settings", element: <Settings /> },
  { path: "/personal-details", element: <PersonalDetail /> },
  { path: "/logout", element: <Logout /> },
];

export default GeneralRoutes;
