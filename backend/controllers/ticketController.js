import Ticket from "../models/Ticket.js";
import { analyzeTicket } from "../services/aiService.js";

// ======================
// Create Ticket
// ======================
export const createTicket = async (req, res) => {
  try {
    const { subject, message } = req.body;

    const aiResult = await analyzeTicket(subject, message);

    const ticket = await Ticket.create({
      subject,
      message,
      category: aiResult.category,
      priority: aiResult.priority,
      sentiment: aiResult.sentiment,
      aiReply: aiResult.reply,
    });

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Get All Tickets
// ======================
export const getTickets = async (req, res) => {
  try {
    const {
      search,
      category,
      priority,
      status,
      sort,
      page = 1,
      limit = 5,
    } = req.query;

    let filter = {};

    if (search) {
      filter.subject = {
        $regex: search,
        $options: "i",
      };
    }

    if (category && category !== "All") {
      filter.category = category;
    }

    if (priority && priority !== "All") {
      filter.priority = priority;
    }

    if (status && status !== "All") {
      filter.status = status;
    }

    const sortOption =
      sort === "oldest"
        ? { createdAt: 1 }
        : { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const tickets = await Ticket.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Ticket.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: tickets.length,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      totalTickets: total,
      data: tickets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Dashboard Statistics
// ======================
export const getStatistics = async (req, res) => {
  try {
    const total = await Ticket.countDocuments();

    const open = await Ticket.countDocuments({
      status: "Open",
    });

    const resolved = await Ticket.countDocuments({
      status: "Resolved",
    });

    const high = await Ticket.countDocuments({
      priority: "High",
    });

    res.json({
      success: true,
      data: {
        total,
        open,
        resolved,
        high,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Get Single Ticket
// ======================
export const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Update Ticket
// ======================
export const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        aiReply: req.body.aiReply,
        approved: req.body.approved,
        status: req.body.status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Resolve Ticket
// ======================
export const resolveTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        status: "Resolved",
      },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Delete Ticket
// ======================
export const deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Ticket Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};