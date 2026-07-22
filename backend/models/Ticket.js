import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    customer: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
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
    approved: {
    type: Boolean,
    default: false
},
history: [
  {
    action: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
],

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Ticket", ticketSchema);