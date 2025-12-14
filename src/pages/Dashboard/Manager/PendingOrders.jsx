import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const axiosSecure = useAxiosSecure();

  const fetchPendingOrders = async () => {
    try {
      const res = await axiosSecure.get("/orders/pending");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load pending orders!");
    }
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to approve this order!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.put(`/orders/${id}`, { status: "Approved" });
        toast.success("Order approved!");
        setOrders((prev) => prev.filter((o) => o._id !== id));
      } catch (err) {
        console.error(err);
        toast.error("Failed to approve order!");
      }
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.put(`/orders/${id}`, { status: "Rejected" });
        toast.error("Order rejected!");
        setOrders((prev) => prev.filter((o) => o._id !== id));
      } catch (err) {
        console.error(err);
        toast.error("Failed to reject order!");
      }
    }
  };

  // Pagination
  const totalPages = Math.ceil(orders.length / limit);
  const paginatedOrders = orders.slice((page - 1) * limit, page * limit);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Pending Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b p-3 text-left text-gray-600 uppercase tracking-wider">
                Order ID
              </th>
              <th className="border-b p-3 text-left text-gray-600 uppercase tracking-wider">
                User
              </th>
              <th className="border-b p-3 text-left text-gray-600 uppercase tracking-wider">
                Product
              </th>
              <th className="border-b p-3 text-left text-gray-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="border-b p-3 text-left text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((o) => (
                <tr
                  key={o._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-3 text-gray-700 font-medium">{o._id}</td>
                  <td className="p-3 text-gray-700">{o.userName}</td>
                  <td className="p-3 text-gray-700">{o.productName}</td>
                  <td className="p-3 text-gray-700">{o.quantity}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleApprove(o._id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition duration-200"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(o._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition duration-200"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-5 text-gray-500">
                  No pending orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded"
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PendingOrders;
