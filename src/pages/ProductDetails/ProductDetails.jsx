import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { ArrowLeft, CheckLine } from "lucide-react";
const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  // Fetch product
  useEffect(() => {
    axiosSecure
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, axiosSecure]);

  // Fetch user profile
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get("/profile").then((res) => {
        setProfile(res.data);
        setProfileLoading(false);
      });
    } else {
      setProfileLoading(false);
    }
  }, [user]);

  if (loading || profileLoading) return <LoadingSpinner />;
  if (!product) return <div className="p-4">Product not found</div>;

  const showBookingButton =
    user &&
    profile?.role?.toLowerCase() === "customer" &&
    profile.status === "approved";

  const showSuspendedMessage = profile?.status === "suspended";
  const showPendingMessage = profile?.status === "pending";

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-10">
      {/* Left: Product Image (Centered, Sticky-ish) */}
      <div className="lg:w-1/2 flex justify-center items-start ">
        {product.images?.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="rounded-xl sticky top-30 shadow max-h-[600px] object-contain"
          />
        ) : (
          <img
            src={product.imageURL || "/default-product.png"}
            alt={product.name}
            className="rounded shadow max-h-[500px] object-contain"
          />
        )}
      </div>

      {/* Right: Product Details + Booking Form */}
      <div className="lg:w-1/2 space-y-4 md:sticky md:top-4">
        <h2 className="text-3xl py-2 font-bold">{product.name}</h2>
        <p className="text-gray-700 text-xl font-bold">
         <span className="text-2xl">D</span>escription: {product.description}
        </p>
        <p className="text-gray-700 text-xl font-bold">
          Category: {product.category}
        </p>
        <p className="text-gray-700 font-bold text-xl">${product.price}</p>
        <p className="text-gray-700 text-xl font-bold">
          Available: {product.availableQuantity || 0}
        </p>
        <p className="text-gray-700 text-xl font-bold">
          Minimum Order: {product.minimumOrder || 1}
        </p>
        <p className="text-gray-700 text-xl font-bold">
          Payment: {product.paymentOption || "Cash on Delivery"}
        </p>

        {/* Conditional Booking Section */}
        {showBookingButton && (
          <button
            onClick={() => navigate(`/booking/${product._id}`)}
            className="bg-blue-600 flex justify-center items-center gap-3 hover:bg-blue-700 w-full text-white px-4 py-2 rounded font-semibold"
          >
            <CheckLine size={22} /> Book / Order Product
          </button>
        )}

        {showSuspendedMessage && (
          <div className="bg-red-100 border border-red-400 p-4 rounded">
            <p className="text-red-700 font-semibold">
              Your account is suspended. You cannot place new orders.
            </p>
            {profile?.suspendFeedback && (
              <p className="mt-2 text-sm text-gray-700">
                Reason: {profile.suspendFeedback}
              </p>
            )}
          </div>
        )}

        {showPendingMessage && (
          <div className="bg-yellow-100 border border-yellow-300 p-4 rounded">
            <p className="text-yellow-700 font-semibold">
              Your account is pending approval. You can view product details
              only.
            </p>
          </div>
        )}

        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 w-full flex item-center justify-center gap-2 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-semibold"
        >
          <ArrowLeft size={22} /> Go Back
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
