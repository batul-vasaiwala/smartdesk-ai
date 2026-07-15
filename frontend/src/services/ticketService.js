import api from "./api";

export const createTicket = (data) =>
  api.post("/tickets", data);

export const getTickets = (params) =>
  api.get("/tickets", { params });

export const getStats = () =>
  api.get("/tickets/stats");

export const getTicket = (id) =>
  api.get(`/tickets/${id}`);

export const updateTicket = (id, data) =>
  api.put(`/tickets/${id}`, data);

export const resolveTicket = (id) =>
  api.patch(`/tickets/${id}/resolve`);

export const deleteTicket = (id) =>
  api.delete(`/tickets/${id}`);