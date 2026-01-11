import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import TrackingModal from "../../../components/Modal/TrackingModal";
import ViewTrackingModal from "../../../components/Modal/ViewTrackingModal";
import { BadgeCheck, Eye, PlusCircle } from "lucide-react";
import approvedIcon from '../../../assets/bag.png'
const ApprovedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [locationInputs, setLocationInputs] = useState({});
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const limit = 10;
  const axiosSecure = useAxiosSecure();

  // Fetch approved orders
  const fetchApprovedOrders = async () => {
    try {
      const res = await axiosSecure.get("/orders/approved");
      setOrders(res.data);
      const sorted = res.data.sort((a, b) => (a._id < b._id ? 1 : -1));
      setOrders(sorted);
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

  // Pagination
  const totalPages = Math.ceil(orders.length / limit);
  const paginatedOrders = orders.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-4">
      <h2 className="text-3xl flex items-center gap-3 font-bold mb-6 text-gray-800"><img src={approvedIcon} className="h-10 w-10" alt="" /> Approved Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b p-3 text-left">Order ID</th>
              <th className="border-b p-3 text-left">User</th>
              <th className="border-b p-3 text-left">Product</th>
              <th className="border-b p-3 text-left">Quantity</th>
              <th className="border-b p-3 text-left">Approved Date</th>
              <th className="border-b p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((o) => (
                <tr key={o._id} className="hover:bg-gray-50 transition">
                  <td className="p-3">{o._id}</td>
                  <td className="p-3">{o.userName}</td>
                  <td className="p-3">{o.productName}</td>
                  <td className="p-3">{o.quantity}</td>
                  <td className="p-3">
                    {o.approvedAt
                      ? new Date(o.approvedAt).toLocaleString()
                      : "-"}
                  </td>

                  {/* Actions */}
                  <td className="p-3 mt-2 flex flex-col lg:flex-row gap-2">
                    <button
                      onClick={() => {
                        setSelectedOrder(o);
                        setModalOpen(true);
                      }}
                      className="bg-green-600 hover:bg-green-700 flex justify-center items-center gap-1 whitespace-nowrap text-white px-3 py-1 rounded-md transition duration-200"
                    >
                     <PlusCircle/> Add Tracking
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOrder(o);
                        setViewModalOpen(true);
                      }}
                      className="px-2 flex justify-center items-center gap-1 py-1 whitespace-nowrap bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                    <Eye/>  View Tracking
                    </button>
                  </td>

                  {/* Location */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-5 text-gray-500">
                  No approved orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

      {/* Add Tracking Modal */}
      {modalOpen && selectedOrder && (
        <TrackingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          order={selectedOrder}
          setOrders={setOrders}
        />
      )}

      {/* View Tracking Modal */}
      {viewModalOpen && selectedOrder && (
        <ViewTrackingModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default ApprovedOrders;
