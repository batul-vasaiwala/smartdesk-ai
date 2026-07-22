import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteAdmin } from "../services/userService";

export default function AdminTable({ admins = [], refresh, onEdit }) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this admin?");

    if (!confirmDelete) return;

    try {
      await deleteAdmin(id);
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete admin");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-blue-500 text-white">

            <tr>

              <th className="px-6 py-4 text-left font-semibold">
                Name
              </th>

              <th className="px-4 py-4 text-left">
                Email
              </th>

              <th className="px-4 py-4 text-left">
                Role
              </th>

              <th className="px-4 py-4 text-left">
                Created
              </th>

              <th className="px-4 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {admins.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500"
                >
                  No Admins Found
                </td>

              </tr>

            ) : (

              admins.map((admin) => (

                <tr
                  key={admin._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 font-medium">
                    {admin.name}
                  </td>

                  <td className="px-4 py-4">
                    {admin.email}
                  </td>

                  <td className="px-4 py-4">

                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"
                    >
                      {admin.role}
                    </span>

                  </td>

                  <td className="px-4 py-4">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4">

                    <div className="flex justify-center gap-5">

                      <button
                        title="Edit"
                        onClick={() => onEdit(admin)}
                        className="text-gray-600 hover:text-blue-600 transition"
                      >
                        <FaEdit size={18} />
                      </button>

                      <button
                        title="Delete"
                        onClick={() => handleDelete(admin._id)}
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
