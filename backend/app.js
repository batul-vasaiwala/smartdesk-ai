import express from "express";
import cors from "cors";

import healthRoutes from "./routes/healthRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/tickets", ticketRoutes);

// Default Route
app.get("/", (req, res) => {
  res.json({
    message: "🚀 SmartDesk AI Backend is Running",
  });
});

// Unknown Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;