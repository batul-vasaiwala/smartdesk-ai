import { useState } from "react";
import { getTicket } from "../services/ticketService";

export default function TicketStatus() {
  const [ticketId, setTicketId] = useState("");
  const [ticket, setTicket] = useState(null);

  const searchTicket = async () => {
    if (!ticketId) return alert("Enter Ticket ID");

    try {
      const res = await getTicket(ticketId);

      // If your service returns axios response
      setTicket(res.data.data);

    } catch (err) {
      alert("Ticket not found");
      setTicket(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-10">

      <div className="bg-white shadow rounded-xl p-8 w-full max-w-3xl">

        <h1 className="text-3xl font-bold mb-6">
          Track Your Support Ticket
        </h1>

        <div className="flex gap-3 mb-8">

          <input
            type="text"
            placeholder="Enter Ticket ID"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className="flex-1 border rounded-lg p-3"
          />

          <button
            onClick={searchTicket}
            className="bg-blue-600 text-white px-6 rounded-lg"
          >
            Search
          </button>

        </div>

        {ticket && (
          <div className="space-y-4">

            <div>
              <b>Subject</b>
              <p>{ticket.subject}</p>
            </div>

            <div>
              <b>Your Message</b>
              <p>{ticket.message}</p>
            </div>

            <div>
              <b>Category</b>
              <p>{ticket.category}</p>
            </div>

            <div>
              <b>Priority</b>
              <p>{ticket.priority}</p>
            </div>

            <div>
              <b>Status</b>
              <p>{ticket.status}</p>
            </div>

            <div>
              <b>AI / Agent Reply</b>

             <div className="bg-gray-100 rounded-lg p-4 mt-2">
    {ticket.status === "Resolved" ? (
      ticket.aiReply
    ) : ticket.approved ? (
      ticket.aiReply
    ) : (
      "Your ticket is currently being reviewed by our support team. Once the response has been approved, it will appear here."
    )}
  </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}