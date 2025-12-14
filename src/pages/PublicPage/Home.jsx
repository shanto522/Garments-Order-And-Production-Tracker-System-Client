import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import HowItWorks from "../../components/Home/HowItWorks";
import FeedbackSection from "../../components/Home/FeedbackSection";

const FadeInWhenVisible = ({ children }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const heroImages = [
    "https://i.ibb.co/HpDbkp7F/t-shirt-bangladesh-america-20250319212529-1024x576.jpg",
    "https://i.ibb.co/fdLhrVfL/premium-photo-1664202525979-80d1da46b34b.jpg",
    "https://i.ibb.co/cc0j7Y6p/pngtree-colorful-colourful-ethnic-indian-garments-hanging-on-a-hanger-image-2944691.jpg",
    "https://i.ibb.co/tMBPqkz9/multi-colored-garments-hanging-coathangers-boutique-store-generated-by-ai-188544-19854.avif",
    "https://i.ibb.co/Qj31R0sZ/67b3298b6c371c001dfda147.jpg",
    "https://i.ibb.co/fdLhrVfL/premium-photo-1664202525979-80d1da46b34b.jpg",
  ];

  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Fetch products
  useEffect(() => {
    axiosSecure.get("/home-products").then((res) => setProducts(res.data));
  }, [axiosSecure]);

  return (
    <motion.div
      className="space-y-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* ================= HERO SECTION ================= */}
      <section className="relative container rounded-xl mx-auto h-[30vh] sm:h-[80vh] md:h-[50vh] overflow-hidden bg-black">
        {heroImages.map((img, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: `url(${img})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === i ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        ))}
        {/* Dots */}
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition ${
                index === i ? "bg-lime-400 scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= OUR PRODUCTS ================= */}
      <FadeInWhenVisible>
        <section className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <motion.div
                key={p._id}
                whileHover={{ y: -6 }}
                className=" rounded-xl shadow-md hover:shadow-xl p-4 flex flex-col bg-white transition"
              >
                <img
                  src={p.imageURL || p.images?.[0] || "/default-product.png"}
                  alt={p.name}
                  className="h-48 w-full object-cover rounded-lg"
                />

                <h3 className="text-xl font-semibold mt-4">{p.name}</h3>

                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {p.shortDesc}
                </p>

                <p className="text-lime-500 font-bold my-3">${p.price}</p>

                <button
                  onClick={() => navigate(`/dashboard/product/${p._id}`)}
                  className="mt-auto bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-lg font-medium mt-4"
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </FadeInWhenVisible>

      {/* ================= HOW IT WORKS ================= */}
      <FadeInWhenVisible>
        <HowItWorks />
      </FadeInWhenVisible>

      {/* ================= FEEDBACK ================= */}
      <FadeInWhenVisible>
        <FeedbackSection />{" "}
        {/* ✅ replaced FeedbackCarousel with FeedbackSection */}
      </FadeInWhenVisible>

      {/* ================= EXTRA SECTION 1 ================= */}
      <FadeInWhenVisible>
        <section className="shadow-md bg-gray-200 container mx-auto rounded-xl py-16 text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            Why Choose Us?
          </h2>
          <p className="max-w-2xl font-semibold mx-auto">
            Fast, transparent, and reliable garment production tracking with
            smart dashboards. Monitor every step of production, ensure on-time
            delivery, and make smarter business decisions confidently.
          </p>
        </section>
      </FadeInWhenVisible>

      {/* ================= EXTRA SECTION 2 ================= */}
      <FadeInWhenVisible>
        <section className="bg-gray-200 container mx-auto shadow-md rounded-xl py-16 text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            Our Commitment
          </h2>
          <p className="max-w-2xl font-semibold mx-auto">
            Quality, Transparency, and On-Time Delivery. Always. We ensure every
            garment is tracked meticulously from production to delivery,
            guaranteeing a smooth experience for our clients and partners.
          </p>
        </section>
      </FadeInWhenVisible>
    </motion.div>
  );
};

export default Home;
