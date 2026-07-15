import { Bell, Settings } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">

      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">

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

        <div className="flex gap-4 items-center">

          <Bell size={20} />

          <Settings size={20} />

          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex justify-center items-center">
            A
          </div>

        </div>

      </div>

    </nav>
  );
}