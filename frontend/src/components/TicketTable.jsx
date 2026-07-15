import { Link } from "react-router-dom";

export default function TicketTable({ tickets }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Subject</th>
            <th className="text-left">Category</th>
            <th className="text-left">Priority</th>
            <th className="text-left">Sentiment</th>
            <th className="text-left">Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tickets.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-8 text-gray-500">
                No Tickets Found
              </td>
            </tr>
          ) : (
            tickets.map((ticket) => (
              <tr key={ticket._id} className="border-t hover:bg-gray-50">
                <td className="p-4">{ticket.subject}</td>

                <td>{ticket.category}</td>

                <td>
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                    {ticket.priority}
                  </span>
                </td>

                <td>{ticket.sentiment}</td>

                <td>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                    {ticket.status}
                  </span>
                </td>

                <td className="text-center">
                  <Link
                    to={`/ticket/${ticket._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}