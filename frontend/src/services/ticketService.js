import api from "./api";

// ==============================
// CUSTOMER
// ==============================

// Create Ticket
export const createTicket = (data) =>
  api.post("/tickets", data);

// Get Logged-in Customer Tickets
export const getMyTickets = () =>
  api.get("/tickets/my");

// Get Single Ticket
export const getTicket = (id) =>
  api.get(`/tickets/${id}`);


// ==============================
// ADMIN
// ==============================

// Get All Tickets
export const getTickets = ({
  search = "",
  category = "All",
  priority = "All",
  status = "All",
  sort = "newest",
  page = 1,
  limit = 5,
} = {}) =>
  api.get("/tickets", {
    params: {
      search,
      category,
      priority,
      status,
      sort,
      page,
      limit,
    },
  });

// Dashboard Statistics
export const getStats = () =>
  api.get("/tickets/stats");

// Update Ticket
export const updateTicket = (id, data) =>
  api.put(`/tickets/${id}`, data);

// Resolve Ticket
export const resolveTicket = (id) =>
  api.patch(`/tickets/${id}/resolve`);

// Delete Ticket
export const deleteTicket = (id) =>
  api.delete(`/tickets/${id}`);