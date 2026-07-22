import { Bell, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout, getUser } from "../services/authService";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">

        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            SD
          </div>

          <div>
            <h1 className="font-bold text-xl">
              SmartDesk AI
            </h1>

            <p className="text-xs text-gray-500">
              AI Support System
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          <Bell
            size={20}
            className="cursor-pointer text-gray-600 hover:text-blue-600"
          />

          <Settings
            size={20}
            className="cursor-pointer text-gray-600 hover:text-blue-600"
          />

          {/* Admin Avatar */}
          <div className="flex items-center gap-3">

            <div className="text-right">
              <p className="text-sm font-semibold">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex justify-center items-center font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}