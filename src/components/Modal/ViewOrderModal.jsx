import React from "react";

const ViewOrderModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>

        <div className="space-y-3">
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
            <span className="font-semibold">Quantity:</span> {order.quantity}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {order.status}
          </p>
          <p>
            <span className="font-semibold">Payment Option:</span>{" "}
            {order.paymentOption}
          </p>
          <p>
            <span className="font-semibold">Booked At:</span>{" "}
            {new Date(order.bookedAt).toLocaleString()}
          </p>

          {order.tracking && (
            <div className="mt-2">
              <h3 className="font-semibold mb-1">Tracking History:</h3>
              <ul className="list-disc list-inside">
                {order.tracking.map((t, idx) => (
                  <li key={idx}>
                    {t.status} - {new Date(t.date).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
