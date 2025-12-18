import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const executedRef = useRef(false); // ✅ prevent double execution

  useEffect(() => {
    if (executedRef.current) return; // prevent double run
    executedRef.current = true;

    const metadata = JSON.parse(localStorage.getItem("stripeMetadata") || "{}");

    if (!metadata.productId) {
      navigate("/dashboard/my-orders", { replace: true });
      return;
    }

    axiosSecure
      .post("/orders/payment-success", metadata)
      .then(() => {
        toast.success("Payment successful! Order created 🎉");
        localStorage.removeItem("stripeMetadata");

        setTimeout(() => {
          navigate("/dashboard/my-orders", { replace: true });
        }, 3000);
      })
      .catch(() => {
        toast.error("Failed to create order");
        navigate("/dashboard/my-orders", { replace: true });
      });
  }, [axiosSecure, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 max-w-md w-full text-center animate-fade-in">
        <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-6 animate-bounce" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          🎉Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your order has been created successfully. <br />
          We are excited to get it to you soon! 🚀
        </p>
        <div className="mt-4">
          <div className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition">
            🎉 Thank You! <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;