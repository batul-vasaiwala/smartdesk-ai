import { Ticket, ShieldCheck } from "lucide-react";

const NAV_ITEMS = [
  { key: "tickets", label: "Tickets", icon: Ticket },
  { key: "admins", label: "Admins", icon: ShieldCheck },
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white md:block">
      <div className="sticky top-0 flex h-[calc(100vh-0px)] flex-col p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Dashboard
        </p>

        <nav className="space-y-1">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => onChange(key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-blue-600" : "text-slate-400"}
                />
                {label}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
