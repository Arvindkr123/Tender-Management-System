import { useGetAllTendersQuery } from "@/redux/api/adminApiSlice";

const HomePage = () => {
  const { data, error, isLoading } = useGetAllTendersQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-bold">Loading...</div>
      </div>
    );
  }
  //console.log(data);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-bold text-red-500">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">Tenders</h1>
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Tender Name</th>
            <th className="px-4 py-2 text-left">Tender Description</th>
            <th className="px-4 py-2 text-left">Start Time</th>
            <th className="px-4 py-2 text-left">End Time</th>
            <th className="px-4 py-2 text-left">Buffer Time</th>
            <th className="px-4 py-2 text-left">Created At</th>
            <th className="px-4 py-2 text-left">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {data.tenders.map((tender, index) => (
            <tr key={tender._id} className="border-b border-gray-200">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{tender.tenderName}</td>
              <td className="px-4 py-2">{tender.tenderDescription}</td>
              <td className="px-4 py-2">
                {new Date(tender.tenderStartTime).toLocaleString()}
              </td>
              <td className="px-4 py-2">
                {new Date(tender.tenderEndTime).toLocaleString()}
              </td>
              <td className="px-4 py-2">{tender.bufferTime}</td>
              <td className="px-4 py-2">
                {new Date(tender.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-2">
                {new Date(tender.updatedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
