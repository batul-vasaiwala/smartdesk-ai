import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import FilterBar from "../components/FilterBar";
import TicketTable from "../components/TicketTable";

import { getTickets, getStats } from "../services/ticketService";

export default function Dashboard() {
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

  useEffect(() => {
    fetchTickets();
  }, [search, category, status, sort, page]);

  useEffect(() => {
    fetchStats();
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

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

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

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-600 mx-auto"></div>

            <p className="mt-4 text-gray-500">
              Loading tickets...
            </p>

          </div>

        ) : (

          <>
            <TicketTable
              tickets={tickets}
              refreshTickets={fetchTickets}
            />

            <div className="flex justify-between items-center mt-6">

              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 rounded border disabled:opacity-40"
              >
                Previous
              </button>

              <span className="font-medium">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 rounded border disabled:opacity-40"
              >
                Next
              </button>

            </div>

          </>
        )}

      </div>

    </div>
  );
}