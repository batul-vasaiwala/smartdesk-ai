import api from "./api";

// =======================
// Get All Admins
// =======================
export const getAdmins = () => {
  return api.get("/users/admins");
};

// =======================
// Create Admin
// =======================
export const createAdmin = (data) => {
  return api.post("/users/admin", data);
};

// =======================
// Update Admin
// =======================
export const updateAdmin = (id, data) => {
  return api.put(`/users/admin/${id}`, data);
};

// =======================
// Delete Admin
// =======================
export const deleteAdmin = (id) => {
  return api.delete(`/users/admin/${id}`);
};