import { BrowserRouter, Routes, Route } from "react-router-dom";

import TicketForm from "./pages/TicketForm";
import Dashboard from "./pages/Dashboard";
import TicketDetails from "./pages/TicketDetails";
import TicketStatus from "./pages/TicketStatus";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<TicketForm />} />

        <Route path="/status" element={<TicketStatus />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/ticket/:id" element={<TicketDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;