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
    // ===== Basic validation =====
    if (!firstName || !lastName || !contactNumber || !deliveryAddress) {
      return toast.error("Please fill all required fields");
    }

    const totalCost = Number(product?.price) * Number(quantity);

    if (!totalCost || isNaN(totalCost) || totalCost <= 0) {
      return toast.error("Invalid price or quantity");
    }

    // ===== Safe UUID =====
    const stripeSessionId =
      window.crypto?.randomUUID() || Date.now().toString();

    setLoading(true);

    try {
      // 🔹 Stripe metadata MUST be small
      const metadata = {
        stripeSessionId,
        productId: product._id,
        qty: String(quantity),
        userEmail: user.email,
      };

      const sessionRes = await axiosSecure.post("/create-checkout-session", {
        productId: product._id,
        productName: product.name,
        cost: totalCost,
        senderEmail: user.email,
        metadata,
      });

      const sessionUrl = sessionRes.data?.url;
      if (!sessionUrl) throw new Error("Stripe session failed");

      // 🔹 Save full order info locally (NOT in Stripe)
      localStorage.setItem(
        "stripeMetadata",
        JSON.stringify({
          stripeSessionId,
          productId: product._id,
          productName: product.name,
          quantity,
          orderPrice: totalCost,
          firstName,
          lastName,
          contactNumber,
          deliveryAddress,
          notes,
          userEmail: user.email,
          paymentOption: "Stripe",
        })
      );

      window.location.href = sessionUrl;
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Payment failed");
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
