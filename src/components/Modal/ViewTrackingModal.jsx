const ViewTrackingModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  // Unique stages remove duplicates
  const uniqueStages = [...new Set(order.tracking || [])];

  return (
    <div className="fixed inset-0 min-h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80 md:w-96">
        <h3 className="text-xl font-bold mb-4">Tracking Timeline</h3>

        {uniqueStages.length > 0 ? (
          uniqueStages.map((stage, idx) => (
            <div key={idx} className="mb-2 p-2 border rounded">
              <div className="font-semibold">{stage}</div>
              <div className="text-sm text-gray-600">
                {order.trackingDates &&
                  order.trackingDates[stage] &&
                  new Date(order.trackingDates[stage]).toLocaleString()}
              </div>
              {order.trackingNotes && order.trackingNotes[stage] && (
                <div className="text-sm text-gray-700">
                  Note: {order.trackingNotes[stage]}
                </div>
              )}
              {order.currentLocation && (
                <div className="text-sm text-gray-500">
                  Location: {order.currentLocation}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-500">No tracking updates yet.</div>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTrackingModal;
