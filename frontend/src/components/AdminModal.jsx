import { useEffect, useState } from "react";
import {
  createAdmin,
  updateAdmin,
} from "../services/userService";

export default function AdminModal({
  open,
  setOpen,
  selectedAdmin,
  refresh,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (selectedAdmin) {
      setName(selectedAdmin.name);
      setEmail(selectedAdmin.email);
      setPassword("");
    } else {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [selectedAdmin]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedAdmin) {
        await updateAdmin(selectedAdmin._id, {
          name,
          email,
          password,
        });
      } else {
        await createAdmin({
          name,
          email,
          password,
        });
      }

      refresh();
      setOpen(false);

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[450px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          {selectedAdmin ? "Edit Admin" : "Add New Admin"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            className="w-full border rounded-lg p-3 mb-4"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            className="w-full border rounded-lg p-3 mb-4"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            className="w-full border rounded-lg p-3 mb-6"
            placeholder={
              selectedAdmin
                ? "Leave blank to keep same password"
                : "Password"
            }
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required={!selectedAdmin}
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={()=>setOpen(false)}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {selectedAdmin ? "Update Admin" : "Create Admin"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}