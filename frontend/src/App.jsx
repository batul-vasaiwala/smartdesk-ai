import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import TicketForm from "./pages/TicketForm";
import Dashboard from "./pages/Dashboard";
import TicketStatus from "./pages/TicketStatus";
import TicketDetails from "./pages/TicketDetails";

import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Customer Routes */}

        <Route
          path="/customer"
          element={
            <ProtectedRoutes role="customer">
              <TicketForm />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/status"
          element={
            <ProtectedRoutes role="customer">
              <TicketStatus />
            </ProtectedRoutes>
          }
        />

        {/* Admin Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes role="admin">
              <Dashboard />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/ticket/:id"
          element={
            <ProtectedRoutes role="admin">
              <TicketDetails />
            </ProtectedRoutes>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;