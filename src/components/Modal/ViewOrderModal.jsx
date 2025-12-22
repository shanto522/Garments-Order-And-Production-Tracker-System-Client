import React from "react";

const ViewOrderModal = ({ order, onClose }) => {
  if (!order) return null;
  // Tracking history with dates in parentheses
  const trackingHistory =
    order.tracking && order.tracking.length > 0
      ? order.tracking.map((stage) => {
          const date = order.trackingDates?.[stage];
          return {
            status: stage,
            date: date ? `(${new Date(date).toLocaleString()})` : null,
          };
        })
      : [];

  return (
    <div className="fixed inset-0 min-h-screen bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
        >
          X
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-bold mb-4 text-center">Order Details</h2>

        {/* Order Info */}
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Order ID:</span> {order._id}
          </p>
          <p>
            <span className="font-semibold">User Name:</span> {order.userName}
          </p>
          <p>
            <span className="font-semibold">User Email:</span> {order.userEmail}
          </p>
          <p>
            <span className="font-semibold">Product Name:</span>{" "}
            {order.productName}
          </p>
          <p>
            <span className="font-semibold">Contact Number:</span>{" "}
            {order.contactNumber}
          </p>
          <p>
            <span className="font-semibold">Delivery Address:</span>{" "}
            {order.deliveryAddress}
          </p>
          <p>
            <span className="font-semibold">Quantity:</span> {order.quantity}
          </p>
          <p>
            <span className="font-semibold">Order Price:</span> {order.orderPrice}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {order.status || "Pending"}
          </p>
          <p>
            <span className="font-semibold">Payment Option:</span>{" "}
            {order.paymentOption || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Notes:</span> {order.notes}
          </p>
          {/* Tracking History */}
          {trackingHistory.length > 0 ? (
            <div className="mt-2">
              <h3 className="font-semibold mb-1">Tracking History:</h3>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {trackingHistory.map((t, idx) => (
                  <li key={idx}>
                    {t.status} {t.date ? t.date : ""}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 mt-2">No tracking history yet.</p>
          )}
        </div>

        {/* Footer Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
