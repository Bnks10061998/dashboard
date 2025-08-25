import Invoices from "../Pages/Invoice/Invoices";
import InvoicePDF from "../Pages/Invoice/InvoicePDF";
import Payment from "../Components/Payment_Invoice/Payment";
import Quotation from "../Components/Payment_Invoice/Quotation";

const InvoiceRoutes = [
  { path: "/invoices", element: <Invoices /> },
  { path: "/invoice-list", element: <InvoicePDF /> },
  { path: "/payment", element: <Payment /> },
  { path: "/quotation", element: <Quotation /> },
];

export default InvoiceRoutes;
