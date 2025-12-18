import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Payment from "../Dashboard/Payment/Payment";
import LoadingSpinner from "../Shared/LoadingSpinner";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [profileLoading, setProfileLoading] = useState(true);

  const minOrder = product?.minimumOrder || 1;

  // Fetch product
  useEffect(() => {
    axiosSecure
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setQuantity(String(res.data.minimumOrder || 1));
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

  // Handle booking (Cash on Delivery)
  const handleBooking = async () => {
    if (!user) return toast("Please login to book the product.");
    if (
      profile?.role?.toLowerCase() !== "customer" ||
      profile?.status !== "approved"
    ) {
      return toast("Only approved customers can order.");
    }

    const finalQty = Number(quantity);

    if (!finalQty || finalQty < (product.minimumOrder || 1)) {
      return toast(`Minimum order quantity is ${product.minimumOrder || 1}`);
    }

    if (finalQty > (product.availableQuantity || 0)) {
      return toast(
        `Cannot order more than available quantity (${
          product.availableQuantity || 0
        })`
      );
    }

    if (!firstName || !lastName || !contactNumber || !deliveryAddress)
      return toast("Please fill all required fields.");

    const bookingData = {
      productId: product._id,
      productName: product.name,
      price: product.price,
      quantity,
      minOrder: product.minimumOrder || 1,
      orderPrice: Number(product.price) * quantity,
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
      firstName,
      lastName,
      contactNumber,
      deliveryAddress,
      notes,
      paymentOption: product.paymentOption || "Cash on Delivery",
    };

    if (product.paymentOption?.trim().toLowerCase() !== "stripe") {
      try {
        await axiosSecure.post("/book-product", bookingData);
        toast.success("Product booked successfully!");
        navigate("/dashboard/my-orders");
      } catch (err) {
        toast.error(err.response?.data?.message || "Booking failed!");
      }
    }
  };

  if (loading || profileLoading) return <LoadingSpinner />;
  if (!product) return <div className="p-4">Product not found</div>;

  return (
    <div className="container mx-auto p-4 flex flex-col md:items-start lg:flex-row gap-8">
      {/* Product Info */}
      <div className="lg:w-1/2 space-y-4">
        {product.images?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`img-${idx}`}
                className="rounded-xl w-full shadow md:w-[750px] md:h-[400px] object-cover"
              />
            ))}
          </div>
        ) : (
          <img
            src={product.imageURL || "/default-product.png"}
            alt={product.name}
            className="rounded shadow w-full object-cover"
          />
        )}
        <h2 className="text-3xl py-2 font-bold">{product.name}</h2>
        <p className="text-gray-700 text-xl font-bold">
          Description: {product.description}
        </p>
        <p className="text-gray-600 text-xl font-bold">
          Category: {product.category}
        </p>
        <p className="text-lime-500 font-bold text-xl">${product.price}</p>
        <p className="text-gray-700 text-xl font-bold">
          Available: {product.availableQuantity || 0}
        </p>
        <p className="text-gray-700 text-xl font-bold">
          Minimum Order: {product.minimumOrder || 1}
        </p>
        <p className="text-gray-700 text-xl font-bold">
          Payment: {product.paymentOption || "Cash on Delivery"}
        </p>
      </div>

      {/* Suspended User Block */}
      {profile?.status === "suspended" && (
        <div className="lg:w-1/2 bg-red-100 border border-red-400 p-5 rounded">
          <h3 className="text-xl font-bold text-red-700">
            Your account is suspended
          </h3>
          <p className="mt-2 text-red-600">
            You cannot place new orders or bookings.
          </p>
          {profile?.suspendFeedback && (
            <p className="mt-2 text-sm text-gray-700">
              <span className="font-semibold">Reason:</span>{" "}
              {profile.suspendFeedback}
            </p>
          )}
        </div>
      )}

      {/* Pending user notice */}
      {profile?.status === "pending" && (
        <div className="lg:w-1/2 bg-yellow-100 border border-yellow-300 p-4 rounded">
          <p className="text-yellow-700 font-semibold">
            Your account is pending approval. You can view product details only.
          </p>
        </div>
      )}

      {/* Booking Form - only approved customer */}
      {user &&
        profile?.role?.toLowerCase() === "customer" &&
        profile.status === "approved" && (
          <div className="lg:w-1/2 bg-white p-4 rounded shadow space-y-4 md:sticky md:top-4">
            <h3 className="text-3xl font-bold">Book This Product</h3>

            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="border p-2 rounded bg-gray-100"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Product</label>
              <input
                type="text"
                value={product.name}
                readOnly
                className="border p-2 rounded bg-gray-100"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Price</label>
              <input
                type="text"
                value={`$${product.price}`}
                readOnly
                className="border p-2 rounded bg-gray-100"
              />
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border p-2 rounded"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border p-2 rounded"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label>Contact Number</label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="border p-2 rounded"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Delivery Address</label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="border p-2 rounded"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border p-2 rounded"
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label>Quantity</label>
              <input
                type="number"
                min={1}
                max={product.availableQuantity || 1}
                value={quantity}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setQuantity("");
                    setError("");
                    return;
                  }
                  const num = Number(val);
                  if (isNaN(num)) return;
                  setQuantity(val);
                  if (num < minOrder) setError(`Minimum order is ${minOrder}`);
                  else setError("");
                }}
                className={`border p-2 rounded ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              />
              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}
              <p className="font-semibold">
                Total Price: ${quantity ? product.price * Number(quantity) : 0}
              </p>
            </div>

            {/* Payment */}
            {product.paymentOption?.toLowerCase() === "stripe" ? (
              <Payment
                product={product}
                user={user}
                quantity={quantity}
                firstName={firstName}
                lastName={lastName}
                contactNumber={contactNumber}
                deliveryAddress={deliveryAddress}
                notes={notes}
              />
            ) : (
              <button
                type="submit"
                onClick={handleBooking}
                className="bg-blue-600 hover:bg-blue-700 w-full text-white px-4 py-2 rounded font-semibold"
              >
                Order / Book (Cash on Delivery)
              </button>
            )}

            <div>
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-300 w-full hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-semibold mt-4 lg:mt-0"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default ProductDetails;
