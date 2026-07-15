import express from "express";

import {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  resolveTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

const router = express.Router();

router.post("/", createTicket);

router.get("/", getTickets);

router.get("/:id", getTicket);

router.put("/:id", updateTicket);

router.patch("/:id/resolve", resolveTicket);

router.delete("/:id", deleteTicket);

export default router;