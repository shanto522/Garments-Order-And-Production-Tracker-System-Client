import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import Payment from "../../Payment/Payment";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../Shared/LoadingSpinner";

const BookingPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

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
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-3xl font-bold mb-4">Book {product.name}</h2>

      {/* Booking Form */}
      <div className="space-y-4 bg-white p-4 rounded shadow">
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
          <label>Product Name</label>
          <input
            type="text"
            value={product.name}
            readOnly
            className="border p-2 rounded bg-gray-100"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Price (per piece)</label>
          <input
            type="text"
            value={`$${product.price}`}
            readOnly
            className="border p-2 rounded bg-gray-100"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Contact Number</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Delivery Address</label>
          <input
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Quantity</label>
          <input
            type="number"
            min={product.minimumOrder || 1}
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
              if (num < (product.minimumOrder || 1))
                setError(`Minimum order is ${product.minimumOrder || 1}`);
              else setError("");
            }}
            className={`border p-2 rounded ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <p className="font-semibold">
            Total Price: ${quantity ? product.price * Number(quantity) : 0}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2 rounded"
          />
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
            onClick={handleBooking}
            className="bg-blue-600 hover:bg-blue-700 w-full text-white px-4 py-2 rounded font-semibold"
          >
            Order / Book (Cash on Delivery)
          </button>
        )}

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 w-full hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-semibold mt-4"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
