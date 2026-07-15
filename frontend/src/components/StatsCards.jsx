export default function StatsCards({ stats }) {
  const cards = [
    {
      title: "Total Tickets",
      value: stats.total,
    },
    {
      title: "Open Tickets",
      value: stats.open,
    },
    {
      title: "Resolved",
      value: stats.resolved,
    },
    {
      title: "High Priority",
      value: stats.high,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow p-6"
        >
          <p className="text-gray-500">{card.title}</p>

          <h2 className="text-3xl font-bold mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}