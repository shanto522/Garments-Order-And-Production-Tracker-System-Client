import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ViewOrderModal from "../../../components/Modal/ViewOrderModal";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const axiosSecure = useAxiosSecure();

  const fetchOrders = () => {
    axiosSecure.get("/orders").then((res) => setOrders(res.data));
  };

  useEffect(() => {
    fetchOrders();
  }, [axiosSecure]);

  const filteredOrders = filterStatus
    ? orders.filter((o) => o.status === filterStatus)
    : orders;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const maxVisible = 5;

  const getPages = () => {
    const pages = [];
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return { pages, start, end };
  };

  const { pages, start, end } = getPages();

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const goPrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goNext = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  return (
    <div className="p-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        All Orders
      </h2>

      <div className="mb-4 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <label className="mr-2 font-medium">Filter by Status:</label>
        <select
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full border border-gray-200 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b p-2 md:p-3 text-left text-gray-600">
                Order ID
              </th>
              <th className="border-b p-2 md:p-3 text-left text-gray-600">
                User
              </th>
              <th className="border-b p-2 md:p-3 text-left text-gray-600">
                Product
              </th>
              <th className="border-b p-2 md:p-3 text-left text-gray-600">
                Quantity
              </th>
              <th className="border-b p-2 md:p-3 text-left text-gray-600">
                Status
              </th>
              <th className="border-b p-2 md:p-3 text-left text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentOrders.length > 0 ? (
              currentOrders.map((o) => (
                <tr
                  key={o._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-2 md:p-3 text-gray-700 font-medium">
                    {o._id}
                  </td>
                  <td className="p-2 md:p-3 text-gray-600">{o.userName}</td>
                  <td className="p-2 md:p-3 text-gray-600">{o.productName}</td>
                  <td className="p-2 md:p-3 text-gray-600">{o.quantity}</td>
                  <td
                    className={`p-2 md:p-3 font-semibold ${
                      o.status === "Pending"
                        ? "text-yellow-600"
                        : o.status === "Approved"
                        ? "text-green-600"
                        : o.status === "Rejected"
                        ? "text-red-600"
                        : o.status === "Canceled"
                        ? "text-red-500"
                        : "text-gray-600"
                    }`}
                  >
                    {o.status}
                  </td>
                  <td className="p-3 flex flex-wrap gap-2 sm:flex-nowrap">
                    <button
                      onClick={() => setModalData(o)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex-1"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-5 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination with Previous & Next */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
          {/* Previous */}
          <button
            onClick={goPrev}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border bg-white text-gray-700 border-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {/* First page */}
          {start > 1 && (
            <>
              <button
                onClick={() => goToPage(1)}
                className="px-3 py-1 rounded-md border bg-white text-gray-700 border-gray-300"
              >
                1
              </button>
              <span className="px-1 text-gray-500">...</span>
            </>
          )}

          {/* Visible pages */}
          {pages.map((number) => (
            <button
              key={number}
              onClick={() => goToPage(number)}
              className={`px-3 py-1 rounded-md border transition
          ${
            currentPage === number
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-700 border-gray-300"
          }
        `}
            >
              {number}
            </button>
          ))}

          {/* Last page */}
          {end < totalPages && (
            <>
              <span className="px-1 text-gray-500">...</span>
              <button
                onClick={() => goToPage(totalPages)}
                className="px-3 py-1 rounded-md border bg-white text-gray-700 border-gray-300"
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next */}
          <button
            onClick={goNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border bg-white text-gray-700 border-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {modalData && (
        <ViewOrderModal order={modalData} onClose={() => setModalData(null)} />
      )}
    </div>
  );
};

export default AllOrders;
