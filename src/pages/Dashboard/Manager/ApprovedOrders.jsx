import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const trackingStages = [
  "Cutting",
  "Sewing",
  "Finishing",
  "QC",
  "Packed",
  "Shipped",
];

const ApprovedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [locationInputs, setLocationInputs] = useState({});
  const [page, setPage] = useState(1);
  const limit = 10;
  const axiosSecure = useAxiosSecure();

  const fetchApprovedOrders = async () => {
    try {
      const res = await axiosSecure.get("/orders/approved");
      setOrders(res.data);

      const locInit = {};
      res.data.forEach((o) => {
        locInit[o._id] = o.currentLocation || "";
      });
      setLocationInputs(locInit);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load approved orders!");
    }
  };

  useEffect(() => {
    fetchApprovedOrders();
  }, []);

  const handleTrackingUpdate = async (orderId, stageIndex) => {
    const order = orders.find((o) => o._id === orderId);
    if (!order) return;

    const currentStages = order.tracking || [];
    if (stageIndex !== currentStages.length) {
      return toast.error(
        `You must complete previous stages first! Next stage: ${
          trackingStages[currentStages.length]
        }`
      );
    }

    const stage = trackingStages[stageIndex];

    try {
      await axiosSecure.put(`/orders/${orderId}/progress`, { stage });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId
            ? { ...o, tracking: [...(o.tracking || []), stage] }
            : o
        )
      );
      toast.success(`${stage} stage updated!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update tracking!");
    }
  };

  const handleLocationChange = (orderId, value) => {
    setLocationInputs((prev) => ({ ...prev, [orderId]: value }));
  };

  const handleLocationUpdate = async (orderId) => {
    const locStr = locationInputs[orderId]?.trim() || "";
    const coords = locStr.split(",").map(Number);

    if (!locStr) return toast.error("Please enter location!");
    if (coords.length !== 2 || coords.some(isNaN))
      return toast.error("Invalid format! Use: lat,lng");

    try {
      await axiosSecure.put(`/orders/${orderId}/progress`, {
        currentLocation: locStr,
      });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, currentLocation: locStr } : o
        )
      );
      toast.success("Location updated!");
      setLocationInputs((prev) => ({ ...prev, [orderId]: "" }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to update location!");
    }
  };

  // Pagination calculation
  const totalPages = Math.ceil(orders.length / limit);
  const paginatedOrders = orders.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Approved Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b p-3 text-left">Order ID</th>
              <th className="border-b p-3 text-left">User</th>
              <th className="border-b p-3 text-left">Product</th>
              <th className="border-b p-3 text-left">Quantity</th>
              <th className="border-b p-3 text-left">Approved Date</th>
              <th className="border-b p-3 text-left">Tracking</th>
              <th className="border-b p-3 text-left">Add Stage</th>
              <th className="border-b p-3 text-left">Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((o) => {
                const completedStages = o.tracking || [];
                const nextStageIndex = completedStages.length;

                return (
                  <tr
                    key={o._id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="p-3">{o._id}</td>
                    <td className="p-3">{o.userName}</td>
                    <td className="p-3">{o.productName}</td>
                    <td className="p-3">{o.quantity}</td>
                    <td className="p-3">
                      {o.approvedAt
                        ? new Date(o.approvedAt).toLocaleString()
                        : "-"}
                    </td>
                    <td className="p-3">{completedStages.join(" → ")}</td>
                    <td className="p-3 flex flex-wrap gap-2">
                      {trackingStages.map((stage, index) => {
                        const isCompleted = index < completedStages.length;
                        const isNext = index === nextStageIndex;
                        return (
                          <button
                            key={stage}
                            onClick={() => handleTrackingUpdate(o._id, index)}
                            disabled={!isNext}
                            className={`px-2 py-1 rounded text-white text-xs sm:text-sm md:text-sm font-semibold ${
                              isCompleted
                                ? "bg-gray-400 cursor-default"
                                : isNext
                                ? "bg-cyan-700 hover:bg-lime-700"
                                : "bg-orange-400 cursor-not-allowed"
                            }`}
                          >
                            {stage}
                          </button>
                        );
                      })}
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col lg:flex-col gap-2">
                        <input
                          type="text"
                          placeholder={o.currentLocation || "Lat,Lng"}
                          value={locationInputs[o._id] || ""}
                          onChange={(e) =>
                            handleLocationChange(o._id, e.target.value)
                          }
                          className="border rounded px-2 py-1 text-sm md:text-base w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <button
                          onClick={() => handleLocationUpdate(o._id)}
                          className="px-2 py-1 bg-indigo-600 text-white text-sm md:text-base rounded hover:bg-indigo-700 transition w-full"
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-5 text-gray-500">
                  No approved orders found.
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

export default ApprovedOrders;
