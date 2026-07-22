import express from "express";

import {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} from "../controllers/userController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Admin
router.post(
  "/admin",
  protect,
  adminOnly,
  createAdmin
);

// Get All Admins
router.get(
  "/admins",
  protect,
  adminOnly,
  getAdmins
);

// Update Admin
router.put(
  "/admin/:id",
  protect,
  adminOnly,
  updateAdmin
);

// Delete Admin
router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deleteAdmin
);

export default router;