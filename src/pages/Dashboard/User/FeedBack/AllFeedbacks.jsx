import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axiosSecure.get(
          `/feedbacks?limit=${limit}&page=${page}`
        );
        // adjust according to your backend response
        const feedbackArray = res.data.feedbacks || res.data || [];
        const totalCount = res.data.total || feedbackArray.length;
        setFeedbacks(feedbackArray);
        setTotal(totalCount);
      } catch (err) {
        console.error(err);
        setFeedbacks([]); // fallback
        setTotal(0);
      }
    };
    fetchFeedbacks();
  }, [page, axiosSecure]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className=" px-4 py-16">
      <h2 className="text-3xl flex justify-center items-center gap-3 font-bold mb-8 text-center">
        <MessageCircle size={26} />
        All Customer Feedbacks
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {feedbacks.map((fb) => (
          <div
            key={fb._id}
            className="bg-white p-4 rounded-lg shadow text-center"
          >
            <p className="italic text-gray-700">"{fb.message}"</p>
            <p className="font-bold text-gray-900 mt-2">{fb.name}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-500 flex justify-center items-center gap-3 hover:bg-blue-600 text-white rounded-lg font-semibold"
        >
          <ArrowLeft /> Go Back Home
        </button>
      </div>

      <div className="flex justify-center items-center gap-3 mt-6">
        {/* Previous Button */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-3 py-1 rounded ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-lime-500 text-white"
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? "bg-lime-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded ${
            page === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-lime-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllFeedbacks;
