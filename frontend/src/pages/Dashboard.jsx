import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, ShieldCheck } from "lucide-react";
import { logout } from "../services/authService";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import FilterBar from "../components/FilterBar";
import TicketTable from "../components/TicketTable";
import AdminModal from "../components/AdminModal";
import AdminTable from "../components/AdminTable";

import {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../services/userService";
import { getTickets, getStats } from "../services/ticketService";

const MOBILE_TABS = [
  { key: "tickets", label: "Tickets", icon: Ticket },
  { key: "admins", label: "Admins", icon: ShieldCheck },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const [activeSection, setActiveSection] = useState("tickets");

  const [tickets, setTickets] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    resolved: 0,
    high: 0,
  });

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, [search, category, status, sort, page]);

  useEffect(() => {
    fetchStats();
    fetchAdmins();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const res = await getTickets({
        search,
        category,
        status,
        sort,
        page,
        limit: 5,
      });

      setTickets(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await getStats();
      setStats(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await getAdmins();
      setAdmins(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Mobile section switcher (sidebar is hidden below md) */}
      <div className="flex gap-2 border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        {MOBILE_TABS.map(({ key, label, icon: Icon }) => {
          const isActive = activeSection === key;
          return (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          );
        })}
      </div>

      <div className="mx-auto flex max-w-7xl">
        <Sidebar active={activeSection} onChange={setActiveSection} />

        <div className="min-w-0 flex-1 p-8">
          {activeSection === "tickets" && (
            <>
              <DashboardHeader />

              <StatsCards stats={stats} />

              <FilterBar
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                status={status}
                setStatus={setStatus}
                sort={sort}
                setSort={setSort}
              />

              {loading ? (
                <div className="rounded-xl bg-white p-10 text-center shadow">
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                  <p className="mt-4 text-gray-500">Loading tickets...</p>
                </div>
              ) : (
                <>
                  <TicketTable tickets={tickets} refreshTickets={fetchTickets} />

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                      className="rounded border px-4 py-2 disabled:opacity-40"
                    >
                      Previous
                    </button>

                    <span className="font-medium">
                      Page {page} of {totalPages}
                    </span>

                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage(page + 1)}
                      className="rounded border px-4 py-2 disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {activeSection === "admins" && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Admin Management
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Add, edit, or remove admin accounts.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedAdmin(null);
                    setShowModal(true);
                  }}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  + Add Admin
                </button>
              </div>

              <AdminTable
                admins={admins}
                refresh={fetchAdmins}
                onEdit={(admin) => {
                  setSelectedAdmin(admin);
                  setShowModal(true);
                }}
              />

              <AdminModal
                open={showModal}
                setOpen={setShowModal}
                selectedAdmin={selectedAdmin}
                refresh={fetchAdmins}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
