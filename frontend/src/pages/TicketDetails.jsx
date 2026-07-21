import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Tag,
  Flag,
  Smile,
  Frown,
  Meh,
  Save,
  CheckCircle2,
  CheckCheck,
  Trash2,
  Sparkles,
} from "lucide-react";

import {
  getTicket,
  updateTicket,
  resolveTicket,
  deleteTicket,
} from "../services/ticketService";

// ---- Small presentational helpers -----------------------------------------

const PRIORITY_STYLES = {
  high: "bg-red-50 text-red-700 ring-red-600/20",
  medium: "bg-amber-50 text-amber-700 ring-amber-600/20",
  low: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

const SENTIMENT_STYLES = {
  negative: "bg-red-50 text-red-700 ring-red-600/20",
  neutral: "bg-slate-100 text-slate-600 ring-slate-500/20",
  positive: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};

const SENTIMENT_ICON = {
  negative: Frown,
  neutral: Meh,
  positive: Smile,
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

function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
      {message}
    </div>
  );
}

// ---- Main component ---------------------------------------------------------

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [reply, setReply] = useState("");
  const [approved, setApproved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    loadTicket();
  }, []);

  const flashToast = (message) => {
    setToast(message);
    window.clearTimeout(flashToast._t);
    flashToast._t = window.setTimeout(() => setToast(""), 2500);
  };

  const loadTicket = async () => {
    try {
      const res = await getTicket(id);
      setTicket(res.data.data);
      setReply(res.data.data.aiReply);
      setApproved(!!res.data.data.approved);
    } catch (err) {
      console.log(err);
    }
  };

  const saveReply = async () => {
    setSaving(true);
    try {
      await updateTicket(id, { aiReply: reply });
      flashToast("Reply updated");
      await loadTicket();
    } finally {
      setSaving(false);
    }
  };

  const approveReply = async () => {
    await updateTicket(id, { approved: true });
    setApproved(true);
    flashToast("Reply approved");
  };

  const resolve = async () => {
    await resolveTicket(id);
    flashToast("Ticket resolved");
    loadTicket();
  };

  const remove = async () => {
    if (!window.confirm("Delete this ticket? This can't be undone.")) return;
    await deleteTicket(id);
    flashToast("Ticket deleted");
    navigate("/dashboard");
  };

  if (!ticket) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          <span className="text-sm font-medium">Loading ticket…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </button>

          {ticket.status && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 ring-1 ring-inset ring-blue-600/20">
              {ticket.status}
            </span>
          )}
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          {/* Header band */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-6">
            <p className="text-xs font-medium uppercase tracking-wider text-blue-100">
              Ticket #{ticket._id || id}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-white">
              {ticket.subject}
            </h1>
          </div>

          <div className="px-8 py-8">
            {/* Customer message */}
            <h3 className="mb-2 text-sm font-semibold text-slate-700">
              Customer message
            </h3>
            <div className="mb-6 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
              {ticket.message}
            </div>

            {/* Meta pills */}
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
                icon={SENTIMENT_ICON[(ticket.sentiment || "").toLowerCase()] || Meh}
                label="Sentiment"
                value={ticket.sentiment}
                styleMap={SENTIMENT_STYLES}
                fallbackStyle="bg-slate-100 text-slate-600 ring-slate-500/20"
              />
            </div>

            {/* AI reply */}
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Sparkles size={16} className="text-blue-600" />
                AI suggested reply
              </h3>
              {approved && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <CheckCheck size={14} />
                  Approved
                </span>
              )}
            </div>

            <textarea
              rows="8"
              value={reply}
              onChange={(e) => {
                setReply(e.target.value);
                if (approved) setApproved(false);
              }}
              placeholder="Write or edit the reply to send to the customer…"
              className="w-full resize-y rounded-xl border border-slate-200 p-4 text-sm leading-relaxed text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={saveReply}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={16} />
                {saving ? "Saving…" : "Save changes"}
              </button>

              <button
                onClick={approveReply}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                <CheckCheck size={16} />
                Approve reply
              </button>

              <button
                onClick={resolve}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-amber-700 shadow-sm ring-1 ring-inset ring-amber-300 transition hover:bg-amber-50"
              >
                <CheckCircle2 size={16} />
                Resolve
              </button>

              <button
                onClick={remove}
                className="ml-auto inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <Toast message={toast} />
    </div>
  );
}
