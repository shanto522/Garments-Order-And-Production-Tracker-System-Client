import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [orders, setOrders] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);

  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchOrders = async (currentPage = page) => {
    if (!user?.email) return;
    try {
      const res = await axiosSecure.get(
        `/my-orders?email=${user.email}&page=${currentPage}&limit=${limit}`
      );
      setOrders(res.data.orders);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    setSearchParams({ page });
    fetchOrders(page);
  }, [user, page, setSearchParams, axiosSecure]);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.put(`/cancel-order/${id}`);
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status: "Canceled" } : o))
        );
        toast.success("Order canceled successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to cancel order!");
      }
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        My Orders
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full border border-gray-200 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b p-2 md:p-3 text-left text-gray-600">
                Order ID
              </th>
              <th className="border-b p-2 md:p-3 text-left text-gray-600">
                Product
              </th>
              <th className="border-b p-2 md:p-3 text-left text-gray-600">
                Quantity
              </th>
              <th className="border-b p-2 md:p-3 text-left text-gray-600">
                Total Price
              </th>
              <th className="border-b p-2 md:p-3 text-left text-gray-600">
                Status
              </th>
              <th className="border-b p-2 md:p-3 text-left text-gray-600">
                Payment Type
              </th>
              <th className="border-b p-2 md:p-3 text-left text-gray-600">
                Payment Status
              </th>
              <th className="border-b p-2 md:p-3 text-left text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length > 0 ? (
              orders.map((o) => (
                <tr
                  key={o._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-2 md:p-3 text-gray-700 font-medium">
                    {o._id}
                  </td>
                  <td className="p-2 md:p-3 text-gray-600">{o.productName}</td>
                  <td className="p-2 md:p-3 text-gray-600">{o.quantity}</td>
                  <td className="p-2 md:p-3 text-gray-600">${o.orderPrice}</td>

                  {/* Status */}
                  <td
                    className={`p-2 md:p-3 font-semibold ${
                      o.status === "Pending"
                        ? "text-yellow-600"
                        : o.status === "Canceled"
                        ? "text-red-600"
                        : o.status === "Approved"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {o.status || "Pending"}
                  </td>

                  {/* Payment Type */}
                  <td className="p-2 md:p-3 text-gray-600">
                    {o.paymentOption || "Cash on Delivery"}
                  </td>

                  {/* Payment Status */}
                  <td
                    className={`p-2 md:p-3 font-semibold ${
                      o.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {o.paymentStatus || "Unpaid"}
                  </td>

                  <td className="p-2 md:p-3 flex flex-wrap gap-2">
                    {o.status === "Pending" && (
                      <button
                        onClick={() => handleCancel(o._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition duration-200"
                      >
                        Cancel
                      </button>
                    )}

                    {o.status === "Approved" && (
                      <Link
                        to={`/dashboard/track-order/${o._id}`}
                        className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700"
                      >
                        Track Order
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-5 text-gray-500">
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 rounded ${
              page === num
                ? "bg-lime-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {num}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyOrders;
