import { useGetAllBidsByUserQuery } from "@/redux/api/adminApiSlice";
import { useEffect, useState } from "react";

const UserBidsPage = () => {
  const [notification, setNotification] = useState(null);
  const { data } = useGetAllBidsByUserQuery();

  useEffect(() => {
    if (data) {
      const bids = data.tenders; // Assuming the data structure is like this
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      const recentBids = bids.filter(
        (bid) => new Date(bid.updatedAt) > fiveMinutesAgo
      );
      if (recentBids.length > 0) {
        setNotification(`New Bids placed in the last 5 minutes!`);
      }
    }
  }, [data]);

  return (
    <div className="container mx-auto p-4 pt-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">Bids Management</h1>
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
          {data?.tenders?.map((bid, index) => (
            <tr key={bid._id} className="border-b border-gray-200">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{bid.tenderName}</td>
              <td className="px-4 py-2">
                {new Date(bid.updatedAt).toLocaleString()}
              </td>
              <td className="px-4 py-2">
                {bid.lowestQuote ? bid.lowestQuote : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UserBidsPage;
