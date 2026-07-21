import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  PencilLine,
  HelpCircle,
  Phone,
  Zap,
  Target,
  Smile,
  Mail,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import { createTicket } from "../services/ticketService";

// ---- Static content ---------------------------------------------------------

const QUICK_ACTIONS = [
  { icon: Search, label: "Track existing ticket", to: "/status" },
  { icon: PencilLine, label: "Submit new ticket", href: "#ticket-form" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Instant AI analysis",
    text: "AI categorizes every ticket the moment it's submitted.",
  },
  {
    icon: Target,
    title: "Smart priority",
    text: "High-priority issues are flagged automatically, no manual triage.",
  },
  {
    icon: Smile,
    title: "Sentiment detection",
    text: "Understand how a customer feels, not just what they typed.",
  },
  {
    icon: Mail,
    title: "AI suggested reply",
    text: "Agents get a ready-to-edit draft response for every ticket.",
  },
];

// ---- Component ---------------------------------------------------------------

export default function TicketForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!subject || !message) {
      setError("Please fill in both fields before submitting.");
      return;
    }

    try {
      setLoading(true);
      const response = await createTicket({ subject, message });

      setTicketId(response.data.data._id);
      setSuccess(true);
      setSubject("");
      setMessage("");
    } catch (err) {
      console.log(err);
      setError("We couldn't submit your ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyTicketId = async () => {
    try {
      await navigator.clipboard.writeText(ticketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available, ignore */
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-blue-700 to-blue-600 py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-100 ring-1 ring-inset ring-white/20">
            AI-powered support
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            SmartDesk AI
          </h1>

          <p className="mt-3 text-lg font-medium text-blue-100">
            Your AI-powered customer support portal
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100/90">
            Submit your issue and let our AI instantly categorize, prioritize,
            and assist our support team in resolving it fast.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#ticket-form"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              Submit ticket
            </a>

            <Link
              to="/status"
              className="rounded-lg border border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-blue-700"
            >
              Track ticket
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Success banner */}
        {success && (
          <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start gap-4 border-l-4 border-emerald-500 bg-emerald-50/60 p-6">
              <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={28} />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-emerald-800">
                  Ticket submitted successfully
                </h2>
                <p className="mt-1 text-sm text-emerald-900/80">
                  Save this ticket ID to track your request.
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <code className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-emerald-200">
                    {ticketId}
                  </code>
                  <button
                    onClick={copyTicketId}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>

                <Link
                  to="/status"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Track ticket status
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div
            id="ticket-form"
            className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:col-span-2"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              Submit a support ticket
            </h2>
            <p className="mt-1 mb-6 text-sm text-slate-500">
              Tell us what's wrong and we'll get our AI and team on it.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief description of the issue"
                  className="w-full rounded-lg border border-slate-200 p-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div className="mb-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Describe your issue
                </label>
                <textarea
                  rows="7"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Explain your problem in as much detail as you can…"
                  className="w-full resize-y rounded-lg border border-slate-200 p-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {error && (
                <p className="mb-4 text-sm font-medium text-red-600">{error}</p>
              )}

              <button
                disabled={loading}
                className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting…" : "Submit ticket"}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Quick actions
              </h3>

              <div className="space-y-3">
                {QUICK_ACTIONS.map(({ icon: Icon, label, to, href }) => {
                  const Wrapper = to ? Link : "a";
                  const props = to ? { to } : { href };
                  return (
                    <Wrapper
                      key={label}
                      {...props}
                      className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      <Icon size={18} className="text-blue-600" />
                      {label}
                    </Wrapper>
                  );
                })}

                <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm font-medium text-slate-400">
                  <HelpCircle size={18} />
                  Frequently asked questions
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm font-medium text-slate-400">
                  <Phone size={18} />
                  Contact support
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Support information
              </h3>

              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-slate-700">Email</dt>
                  <dd className="text-slate-500">support@smartdesk.ai</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Working hours</dt>
                  <dd className="text-slate-500">Mon – Fri, 9 AM – 6 PM</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Expected response</dt>
                  <dd className="text-slate-500">Within 24 hours</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Why SmartDesk AI?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-slate-500">
            Every ticket gets the same fast, consistent first pass — before a
            human even opens it.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={22} />
                </div>
                <h4 className="mb-2 font-bold text-slate-900">{title}</h4>
                <p className="text-sm text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
