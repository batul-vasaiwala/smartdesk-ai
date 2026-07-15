import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getTicket,
  updateTicket,
  resolveTicket,
  deleteTicket,
} from "../services/ticketService";

export default function TicketDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);

  const [reply, setReply] = useState("");

  useEffect(() => {
    loadTicket();
  }, []);

  const loadTicket = async () => {
    try {

      const res = await getTicket(id);

      setTicket(res.data.data);

setReply(res.data.data.aiReply);

    } catch (err) {
      console.log(err);
    }
  };

  const saveReply = async () => {

    await updateTicket(id, {
      aiReply: reply,
    });

    alert("Reply Updated");

    loadTicket();

  };

  const approveReply = async () => {

    await updateTicket(id, {
      approved: true,
    });

    alert("Reply Approved");

  };

  const resolve = async () => {

    await resolveTicket(id);

    alert("Ticket Resolved");

    loadTicket();

  };

  const remove = async () => {

    if (!window.confirm("Delete Ticket?")) return;

    await deleteTicket(id);

    alert("Deleted");

    navigate("/dashboard");

  };

  if (!ticket)
    return <h2 className="text-center mt-20">Loading...</h2>;

  return (

    <div className="min-h-screen bg-gray-100">

      <div className="max-w-4xl mx-auto p-8">

        <div className="bg-white rounded-xl shadow p-8">

          <h1 className="text-3xl font-bold mb-8">
            Ticket Details
          </h1>

          <h3 className="font-semibold">
            Subject
          </h3>

          <p className="mb-5">
            {ticket.subject}
          </p>

          <h3 className="font-semibold">
            Customer Message
          </h3>

          <div className="bg-gray-100 rounded-lg p-4 mb-5">

            {ticket.message}

          </div>

          <div className="grid grid-cols-3 gap-5 mb-6">

            <div>

              <b>Category</b>

              <p>{ticket.category}</p>

            </div>

            <div>

              <b>Priority</b>

              <p>{ticket.priority}</p>

            </div>

            <div>

              <b>Sentiment</b>

              <p>{ticket.sentiment}</p>

            </div>

          </div>

          <h3 className="font-semibold mb-3">

            AI Suggested Reply

          </h3>

          <textarea
            rows="8"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="w-full border rounded-lg p-4"
          />

          <div className="flex gap-4 mt-8">

            <button
              onClick={saveReply}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Save Changes
            </button>

            <button
              onClick={approveReply}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Approve Reply
            </button>

            <button
              onClick={resolve}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg"
            >
              Resolve
            </button>

            <button
              onClick={remove}
              className="bg-red-600 text-white px-6 py-3 rounded-lg"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}