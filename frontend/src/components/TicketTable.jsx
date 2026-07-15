import { Link } from "react-router-dom";
import { FaEye, FaCheckCircle, FaTrash } from "react-icons/fa";
import { resolveTicket, deleteTicket } from "../services/ticketService";

export default function TicketTable({
  tickets = [],
  refreshTickets,
}) {
  const handleResolve = async (id) => {
    try {
      await resolveTicket(id);
      refreshTickets();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this ticket?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTicket(id);
      refreshTickets();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-blue-500 text-white">

            <tr>

              <th className="px-6 py-4 text-left font-semibold">
                Subject
              </th>

              <th className="px-4 py-4 text-left">
                Category
              </th>

              <th className="px-4 py-4 text-left">
                Priority
              </th>

              <th className="px-4 py-4 text-left">
                Sentiment
              </th>

              <th className="px-4 py-4 text-left">
                Status
              </th>

              <th className="px-4 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {tickets.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No Tickets Found
                </td>

              </tr>

            ) : (

              tickets.map((ticket) => (

                <tr
                  key={ticket._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 font-medium">
                    {ticket.subject}
                  </td>

                  <td className="px-4 py-4">
                    {ticket.category}
                  </td>

                  <td className="px-4 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        ticket.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : ticket.priority === "Medium"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {ticket.priority}
                    </span>

                  </td>

                  <td className="px-4 py-4">
                    {ticket.sentiment}
                  </td>

                  <td className="px-4 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        ticket.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {ticket.status}
                    </span>

                  </td>

                  <td className="px-4 py-4">

                    <div className="flex justify-center gap-5">

                      <Link
                        to={`/ticket/${ticket._id}`}
                        title="View"
                        className="text-gray-600 hover:text-blue-600 transition"
                      >
                        <FaEye size={18} />
                      </Link>

                      <button
                        title={
                          ticket.status === "Resolved"
                            ? "Already Resolved"
                            : "Resolve"
                        }
                        disabled={ticket.status === "Resolved"}
                        onClick={() => handleResolve(ticket._id)}
                        className={`transition ${
                          ticket.status === "Resolved"
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:text-green-600"
                        }`}
                      >
                        <FaCheckCircle size={18} />
                      </button>

                      <button
                        title="Delete"
                        onClick={() => handleDelete(ticket._id)}
                        className="text-gray-600 hover:text-red-600 transition"
                      >
                        <FaTrash size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}