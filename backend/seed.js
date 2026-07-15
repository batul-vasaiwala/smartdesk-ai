import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import Ticket from "./models/Ticket.js";

dotenv.config();

connectDB();

const tickets = [
  {
    subject: "Payment Failed",
    message: "I paid twice for my subscription.",
    category: "Billing",
    priority: "High",
    sentiment: "Negative",
    aiReply:
      "We are sorry for the inconvenience. Our team is reviewing your payment.",
    status: "Open",
  },
  {
    subject: "Order Delayed",
    message: "My package has not arrived yet.",
    category: "Shipping",
    priority: "Medium",
    sentiment: "Negative",
    aiReply:
      "We are checking the shipment status and will update you shortly.",
    status: "Open",
  },
  {
    subject: "Cannot Login",
    message: "I forgot my password.",
    category: "Account",
    priority: "Low",
    sentiment: "Neutral",
    aiReply:
      "Please use the Forgot Password option to reset your password.",
    status: "Resolved",
  },
];

const seedData = async () => {
  try {
   

    await Ticket.insertMany(tickets);

    console.log("Seed data inserted successfully");

    process.exit();

  } catch (err) {

    console.log(err);

    process.exit(1);

  }
};

seedData();