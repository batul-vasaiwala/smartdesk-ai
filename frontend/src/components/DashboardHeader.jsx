export default function DashboardHeader({openModal}) {
  return (

<div className="flex justify-between items-center mt-8 mb-8">

<div>

<h1 className="text-4xl font-bold">

Smart Support Inbox

</h1>

<p className="text-gray-500">

AI-powered customer support management

</p>

</div>

<button
  onClick={openModal}
  className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
>
  + New Admin
</button>

</div>

  );
}