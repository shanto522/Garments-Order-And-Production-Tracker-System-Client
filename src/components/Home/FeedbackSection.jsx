import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axiosSecure.get("/feedbacks?limit=6");
        setFeedbacks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeedbacks();
  }, [axiosSecure]);

  return (
    <section className="container shadow-md mx-auto px-4 py-4">
      <h2 className="text-4xl font-bold mb-8 text-center">Customer Feedback</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {feedbacks.map((fb, idx) => (
          <motion.div
            key={fb._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            className="bg-white p-4 rounded-lg shadow text-center"
          >
            <p className="italic text-gray-700">"{fb.message}"</p>
            <p className="font-bold text-gray-900 mt-2">{fb.name}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Link
          to="/dashboard/all-feedbacks"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition"
        >
          See More
        </Link>
      </div>
    </section>
  );
};

export default FeedbackSection;
