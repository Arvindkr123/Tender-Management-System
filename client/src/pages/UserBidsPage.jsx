import { useGetAllBidsByUserQuery } from "@/redux/api/adminApiSlice";
import { useEffect, useState } from "react";

const UserBidsPage = () => {
  const [notification, setNotification] = useState(null);
  const { data } = useGetAllBidsByUserQuery();

  useEffect(() => {
    if (data) {
      const tenders = data.tenders;
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      const recentTenders = tenders.filter(
        (tender) => new Date(tender.updatedAt) > fiveMinutesAgo
      );
      if (recentTenders.length > 0) {
        setNotification(`New Bids placed in the last 5 minutes!`);
      }
    }
  }, [data]);

  //console.log(notification);

  return (
    <div className="container mx-auto p-4 pt-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">Bids Managements</h1>
      {notification && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-4"
          role="alert"
        >
          {notification}
        </div>
      )}
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Company Name</th>
            <th className="px-4 py-2 text-left">Bid Time</th>
            <th className="px-4 py-2 text-left">Bid Cost</th>
          </tr>
        </thead>
        <tbody>
          {data?.tenders?.map((tender, index) => (
            <tr key={tender._id} className="border-b border-gray-200">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{tender.tenderName}</td>
              <td className="px-4 py-2">
                {new Date(tender.updatedAt).toLocaleString()}
              </td>
              <td className="px-4 py-2">
                {tender.lowestQuote ? tender.lowestQuote : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UserBidsPage;
