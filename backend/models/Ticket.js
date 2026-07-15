import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    priority: {
      type: String,
      default: "Medium",
    },

    sentiment: {
      type: String,
      default: "Neutral",
    },

    aiReply: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Ticket", ticketSchema);