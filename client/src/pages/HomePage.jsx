import {
  useGetAllTendersQuery,
  useSubmitQuotationMutation,
} from "@/redux/api/adminApiSlice";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { data, error, isLoading, refetch } = useGetAllTendersQuery();
  const [notification, setNotification] = useState(null);
  const [quotations, setQuotations] = useState({});
  const [submitQuotation] = useSubmitQuotationMutation();

  useEffect(() => {
    if (data) {
      const tenders = data.tenders;
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      const recentTenders = tenders.filter(
        (tender) => new Date(tender.createdAt) > fiveMinutesAgo
      );
      if (recentTenders.length > 0) {
        setNotification(`New tender(s) placed in the last 5 minutes!`);
      }
    }
  }, [data]);

  const handleQuotationChange = (tenderId, value) => {
    setQuotations((prevQuotations) => ({
      ...prevQuotations,
      [tenderId]: value,
    }));
  };

  const handleQuotationSubmit = async (tenderId) => {
    const quotation = quotations[tenderId];
    if (!quotation || quotation < 0) {
      alert("Please enter a valid quotation.");
      return;
    }

    try {
      const res = await submitQuotation({ tenderId, quotation }).unwrap();
      refetch();
      console.log(res);
      //alert("Quotation submitted successfully!");
    } catch (error) {
      console.error(error);
      //alert("Error submitting quotation!");
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">Tenders</h1>
      {notification && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-4"
          role="alert"
        >
          {notification}
        </div>
      )}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-lg font-bold">Loading...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-lg font-bold text-red-500">
            Error: {error.message}
          </div>
        </div>
      ) : (
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
              <th className="px-4 py-2 text-left">Lowest Quote</th>
              <th className="px-4 py-2 text-left">Submit Quotation</th>
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
                <td className="px-4 py-2">
                  {tender.lowestQuote ? tender.lowestQuote : "N/A"}
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    placeholder="Enter quotation"
                    min={0}
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={(e) =>
                      handleQuotationChange(tender._id, e.target.value)
                    }
                    value={quotations[tender._id] || ""}
                  />
                  <button
                    onClick={() => handleQuotationSubmit(tender._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HomePage;
