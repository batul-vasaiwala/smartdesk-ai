import express from "express";

import {
  createTicket,
  getTickets,
  getTicket,
  getStatistics,
  updateTicket,
  resolveTicket,
  deleteTicket,
  getMyTickets,
} from "../controllers/ticketController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();


// =====================
// Customer Routes
// =====================

router.post("/", protect, createTicket);

router.get("/my", protect, getMyTickets);


// =====================
// Admin Routes
// =====================

router.get("/stats", protect, adminOnly, getStatistics);

router.get("/", protect, adminOnly, getTickets);

router.put("/:id", protect, adminOnly, updateTicket);

router.patch("/:id/resolve", protect, adminOnly, resolveTicket);

router.delete("/:id", protect, adminOnly, deleteTicket);


// =====================
// Single Ticket (KEEP LAST)
// =====================

router.get("/:id", protect, getTicket);

export default router;