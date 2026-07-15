import { useState } from "react";
import { createTicket } from "../services/ticketService";

export default function TicketForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await createTicket({
        subject,
        message,
      });

      setTicketId(response.data._id);
      setSuccess(true);

      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to submit ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          SmartDesk AI
        </h1>

        <p className="text-center text-gray-500 mt-2">
          AI Powered Customer Support
        </p>

        {success && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 mt-6">
            <h2 className="text-green-700 font-semibold">
              ✅ Ticket Submitted Successfully
            </h2>

            <p className="mt-2">
              Ticket ID:
              <span className="font-bold ml-2">{ticketId}</span>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-5">
            <label className="block font-semibold mb-2">
              Subject
            </label>

            <input
              type="text"
              placeholder="Brief description..."
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Message
            </label>

            <textarea
              rows="6"
              placeholder="Describe your issue..."
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Already submitted a ticket?
          </p>

          <a
            href="/status"
            className="text-blue-600 font-semibold hover:underline"
          >
            Track Ticket Status
          </a>
        </div>
      </div>
    </div>
  );
}