export default function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  sort,
  setSort,
}) {
  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
    setSort("newest");
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* Search */}

        <input
          type="text"
          placeholder="Search by subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-2"
        />

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="All">All Categories</option>
          <option value="Billing">Billing</option>
          <option value="Technical">Technical</option>
          <option value="Shipping">Shipping</option>
          <option value="Account">Account</option>
          <option value="General">General</option>
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="Resolved">Resolved</option>
        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        {/* Clear Button */}

        <button
          onClick={clearFilters}
          className="bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2 transition"
        >
          Clear Filters
        </button>

      </div>

    </div>
  );
}