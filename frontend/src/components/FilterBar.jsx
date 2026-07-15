export default function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex gap-4 mb-6">

      <select
        className="border rounded-lg p-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Billing">Billing</option>
        <option value="Technical">Technical</option>
        <option value="Account">Account</option>
        <option value="Shipping">Shipping</option>
        <option value="General">General</option>
      </select>

      <select
        className="border rounded-lg p-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Open">Open</option>
        <option value="Resolved">Resolved</option>
      </select>

      <input
        className="border rounded-lg p-2 flex-1"
        placeholder="Search ticket..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>
  );
}