import express from "express";

import {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  resolveTicket,
  deleteTicket,
  getStatistics
} from "../controllers/ticketController.js";

const router = express.Router();

router.get("/stats", getStatistics);

router.post("/", createTicket);

router.get("/", getTickets);

router.get("/:id", getTicket);

router.put("/:id", updateTicket);

router.patch("/:id/resolve", resolveTicket);

router.delete("/:id", deleteTicket);

export default router;