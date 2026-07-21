import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Tag,
  Flag,
  Activity,
  Sparkles,
  Clock,
  AlertCircle,
} from "lucide-react";
import { getTicket } from "../services/ticketService";

// ---- Presentation helpers ---------------------------------------------------

const PRIORITY_STYLES = {
  high: "bg-red-50 text-red-700 ring-red-600/20",
  medium: "bg-amber-50 text-amber-700 ring-amber-600/20",
  low: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

const STATUS_STYLES = {
  resolved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "in progress": "bg-blue-50 text-blue-700 ring-blue-600/20",
  open: "bg-amber-50 text-amber-700 ring-amber-600/20",
};

function Pill({ icon: Icon, label, value, styleMap, fallbackStyle }) {
  const key = (value || "").toLowerCase();
  const style = styleMap?.[key] || fallbackStyle;
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span
        className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${style}`}
      >
        {Icon && <Icon size={14} />}
        {value}
      </span>
    </div>
  );
}

// ---- Main component ----------------------------------------------------------

export default function TicketStatus() {
  const [ticketId, setTicketId] = useState("");
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const searchTicket = async () => {
    setError("");

    if (!ticketId.trim()) {
      setError("Enter a ticket ID to search.");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      const res = await getTicket(ticketId.trim());
      setTicket(res.data.data);
    } catch (err) {
      console.log(err);
      setTicket(null);
      setError("We couldn't find a ticket with that ID. Double-check and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchTicket();
  };

  const isResolved = ticket?.status?.toLowerCase() === "resolved";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Top bar */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="border-b border-slate-100 bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-6">
            <p className="text-xs font-medium uppercase tracking-wider text-blue-100">
              SmartDesk AI
            </p>
            <h1 className="mt-1 text-2xl font-bold text-white">
              Track your support ticket
            </h1>
          </div>

          <div className="px-8 py-8">
            {/* Search */}
            <div className="mb-2 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Enter your ticket ID"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 rounded-lg border border-slate-200 p-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

              <button
                onClick={searchTicket}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Search size={16} />
                {loading ? "Searching…" : "Search"}
              </button>
            </div>

            {error && (
              <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-red-600">
                <AlertCircle size={14} />
                {error}
              </p>
            )}

            {/* Empty state before first search */}
            {!ticket && !error && !searched && (
              <p className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-500 ring-1 ring-inset ring-slate-100">
                Enter the ticket ID you received at submission to check its
                current status and reply.
              </p>
            )}

            {/* Result */}
            {ticket && (
              <div className="mt-6 border-t border-slate-100 pt-6">
                <h3 className="mb-1 text-sm font-semibold text-slate-700">
                  Subject
                </h3>
                <p className="mb-5 text-sm text-slate-800">{ticket.subject}</p>

                <h3 className="mb-2 text-sm font-semibold text-slate-700">
                  Your message
                </h3>
                <div className="mb-6 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
                  {ticket.message}
                </div>

                <div className="mb-8 grid grid-cols-1 gap-4 border-b border-slate-100 pb-8 sm:grid-cols-3">
                  <Pill
                    icon={Tag}
                    label="Category"
                    value={ticket.category}
                    fallbackStyle="bg-blue-50 text-blue-700 ring-blue-600/20"
                  />
                  <Pill
                    icon={Flag}
                    label="Priority"
                    value={ticket.priority}
                    styleMap={PRIORITY_STYLES}
                    fallbackStyle="bg-slate-100 text-slate-600 ring-slate-500/20"
                  />
                  <Pill
                    icon={Activity}
                    label="Status"
                    value={ticket.status}
                    styleMap={STATUS_STYLES}
                    fallbackStyle="bg-slate-100 text-slate-600 ring-slate-500/20"
                  />
                </div>

                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Sparkles size={16} className="text-blue-600" />
                  AI / agent reply
                </h3>

                {isResolved || ticket.approved ? (
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm leading-relaxed text-emerald-900">
                    {ticket.aiReply}
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 rounded-xl border border-amber-100 bg-amber-50/60 p-4 text-sm leading-relaxed text-amber-900">
                    <Clock size={16} className="mt-0.5 shrink-0" />
                    Your ticket is currently being reviewed by our support
                    team. Once the response is approved, it'll appear here.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
