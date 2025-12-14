import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = ({
  product,
  user,
  quantity,
  firstName,
  lastName,
  contactNumber,
  deliveryAddress,
  notes,
}) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleStripeFast = async () => {
    if (!firstName || !lastName || !contactNumber || !deliveryAddress) {
      return toast.error("Please fill all required fields");
    }

    setLoading(true);

    try {
      const metadata = {
        productId: product._id,
        productName: product.name,
        quantity,
        orderPrice: Number(product.price) * quantity,
        firstName,
        lastName,
        contactNumber,
        deliveryAddress,
        notes,
        userEmail: user.email,
        paymentOption: "Stripe",
      };
      localStorage.setItem("stripeMetadata", JSON.stringify(metadata));
      const sessionRes = await axiosSecure.post("/create-checkout-session", {
        productId: product._id,
        productName: product.name,
        cost: Number(product.price) * quantity,
        senderEmail: user.email,
        metadata,
      });

      const sessionUrl = sessionRes.data?.url;
      const sessionId = sessionRes.data?.id;

      if (!sessionUrl) throw new Error("Stripe URL not found");

      localStorage.setItem(
        "stripeMetadata",
        JSON.stringify({ ...metadata, stripeSessionId: sessionId })
      );

      window.location.href = sessionUrl;
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Payment failed");
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleStripeFast}
      disabled={loading}
      className={`w-full p-2 rounded text-white ${
        loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
};

export default Payment;
