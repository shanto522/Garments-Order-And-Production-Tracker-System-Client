import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeft, MessagesSquare, SendHorizontal } from "lucide-react";
import feedbackImg from '../../../../assets/message.png'
const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return alert("All fields are required");

    try {
      await axiosSecure.post("/feedbacks", { name, message });
      setName("");
      setMessage("");
      toast.success("Feedback submitted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <div className=" mt-16 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl flex justify-center items-center gap-3 font-extrabold mb-6 text-center text-gray-800">
        <img src={feedbackImg} className="h-10 w-10" alt="" />Share Your Feedback
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
          required
        />
        <textarea
          placeholder="Your Feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 flex justify-center items-center gap-3 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition transform hover:-translate-y-0.5"
        >
          Submit Feedback<SendHorizontal />
        </button>
      </form>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/")}
          className="px-6 flex justify-center items-center gap-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
        >
          <ArrowLeft/>Go Back Home
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
