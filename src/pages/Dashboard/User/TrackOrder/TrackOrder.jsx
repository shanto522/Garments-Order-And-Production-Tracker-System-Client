import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const steps = [
  { name: "Cutting Completed", key: "Cutting" },
  { name: "Sewing Started", key: "Sewing" },
  { name: "Finishing", key: "Finishing" },
  { name: "QC Checked", key: "QC" },
  { name: "Packed", key: "Packed" },
  { name: "Shipped / Out for Delivery", key: "Shipped" },
];

const TrackOrder = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/track-order/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch order.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, axiosSecure]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!order) return <div className="p-4 text-center">Order not found</div>;

  const defaultPosition = [23.8103, 90.4125]; // Dhaka fallback
  const currentPosition = order.currentLocation
    ? order.currentLocation.split(",").map(Number)
    : defaultPosition;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-3xl font-bold text-center">
        Track Order: {order._id}
      </h2>

      {/* Timeline */}
      <div className="bg-gray-100 p-4 rounded shadow">
        {steps.map((step, i) => {
          const done = order.tracking?.includes(step.key);
          return (
            <div key={i} className="flex items-center gap-3 mb-2">
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  done ? "bg-green-500 border-green-500" : "border-gray-300"
                }`}
              ></div>
              <div>
                <div className={done ? "text-green-700" : "text-gray-400"}>
                  {step.name}
                </div>
                {done && order.trackingDates?.[step.key] && (
                  <div className="text-xs text-gray-600">
                    {new Date(order.trackingDates[step.key]).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Map */}
      <div className="bg-gray-100 p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Current Location</h3>
        {currentPosition.some(isNaN) ? (
          <p className="text-gray-500">Location not set by manager yet.</p>
        ) : (
          <MapContainer
            center={currentPosition}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "350px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={currentPosition}>
              <Popup>{order.productName} is currently here.</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>

      <div className="text-center">
        <Link
          to="/dashboard/my-orders"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Back to My Orders
        </Link>
      </div>
    </div>
  );
};

export default TrackOrder;
