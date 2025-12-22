import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const trackingStages = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "QC Checked",
  "Packed",
  "Shipped",
  "Out for Delivery",
];

const TrackingModal = ({ isOpen, onClose, order, setOrders }) => {
  const axiosSecure = useAxiosSecure();
  const completedStages = order?.tracking || [];

  const [stage, setStage] = useState("");
  const [note, setNote] = useState("");
  const [location, setLocation] = useState(order?.currentLocation || "");

  // Available stages (filter out completed)
  const availableStages = trackingStages.filter(
    (s) => !completedStages.includes(s)
  );

  useEffect(() => {
    setLocation(order?.currentLocation || "");
    setStage(""); // reset stage on open
  }, [order]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!stage) return toast.error("Please select stage");
    if (completedStages.includes(stage)) {
      return toast.error("This stage is already completed!");
    }
    try {
      await axiosSecure.put(`/orders/${order._id}/progress`, {
        stage,
        note,
        currentLocation: location,
      });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === order._id
            ? {
                ...o,
                tracking: [...(o.tracking || []), stage],
                trackingDates: {
                  ...(o.trackingDates || {}),
                  [stage]: new Date().toISOString(),
                },
                trackingNotes: {
                  ...(o.trackingNotes || {}),
                  [stage]: note || "",
                },
                currentLocation: location,
              }
            : o
        )
      );

      toast.success("Tracking updated!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update tracking");
    }
  };

  return (
    <div className="fixed inset-0 min-h-screen bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded shadow-lg w-80 md:w-96">
        <h3 className="text-xl font-bold mb-4">Add Tracking</h3>

        {availableStages.length > 0 ? (
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="border w-full mb-3 p-2 rounded"
          >
            <option value="">Select Stage</option>
            {availableStages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        ) : (
          <p className="mb-3 text-green-600 font-semibold">
            All stages completed!
          </p>
        )}
        <label className="block font-medium mb-1">Note:</label>
        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border w-full mb-3 p-2 rounded"
        />
        <label className="block font-medium mb-1">Location (lat,lng):</label>
        <input
          type="text"
          placeholder="Location (lat,lng)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border w-full mb-3 p-2 rounded"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          {availableStages.length > 0 && (
            <button
              onClick={handleSubmit}
              className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingModal;
