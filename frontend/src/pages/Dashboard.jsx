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

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [status, setStatus] = useState("All");

  useEffect(() => {
    fetchTickets();
  }, [search, category, status]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchTickets = async () => {
    try {

      const res = await getTickets({
        search,
        category,
        status,
      });

      setTickets(res.data.data);

    } catch (err) {
      console.log(err);
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
        />

        <TicketTable tickets={tickets} />

      </div>

    </div>
  );
}