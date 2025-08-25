import NewProject from "../Pages/Project/NewProject";
import Projects from "../Pages/Project/Projects";
import WorkForm from "../Components/Workform/WorkForm";

const ProjectRoutes = [
  { path: "/new-project", element: <NewProject /> },
  { path: "/projects", element: <Projects /> },
  { path: "/add-work", element: <WorkForm /> },
];

export default ProjectRoutes;
