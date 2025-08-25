import AuthRoutes from "./AuthRoutes";
import ProjectRoutes from "./ProjectRoutes";
import ClientRoutes from "./ClientRoutes";
import InvoiceRoutes from "./InvoiceRoutes";
import GeneralRoutes from "./GeneralRoutes";

const webRoutes = [
  ...AuthRoutes,
  ...ProjectRoutes,
  ...ClientRoutes,
  ...InvoiceRoutes,
  ...GeneralRoutes,
];

export default webRoutes;
