import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import FeedbackSection from "../../components/Home/FeedbackSection";
import HowItWorks from "../../components/Home/HowItWork";
import { ArrowRight, Box, CheckCircle, Handshake } from "lucide-react";
import boxIcon from "../../assets/box.png";
import chooseIcon from "../../assets/question.png";
import commitmentIcon from "../../assets/commitment.png";
import valueIcon from "../../assets/values.png";
import growthIcon from "../../assets/growth.png";
import trustIcon from "../../assets/trust.png";
import faqIcon from "../../assets/question.png";
import readyIcon from "../../assets/checked.png";

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
const truncateText = (text, maxLength = 100) => {
  if (!text) return "No description available";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
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
    axiosSecure.get("/home-products").then((res) => {
      // Sort by createdAt descending (latest first)
      const sortedProducts = (res.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProducts(sortedProducts);
    });
  }, [axiosSecure]);

  return (
    <motion.div
      className="space-y-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[40vh] sm:h-[65vh] md:h-[70vh] overflow-hidden rounded-xl">
        {/* Background Slider */}
        {heroImages.map((img, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: index === i ? 1 : 0,
              scale: index === i ? 1 : 1.1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-16 z-10">
          <motion.h1
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold max-w-xl leading-tight"
          >
            Discover Our
            <span className="text-lime-400 block mt-1">Premium Garments</span>
          </motion.h1>

          <motion.p
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-white/80 mt-3 max-w-md text-base sm:text-lg"
          >
            High-quality, stylish & comfortable garments crafted with passion.
          </motion.p>

          <motion.button
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            onClick={() => navigate("/all-products")}
            className="mt-5 bg-blue-600 hover:bg-blue-800 flex items-center gap-2 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:-translate-y-1 shadow-lg w-fit"
          >
            View Products <ArrowRight size={18} />
          </motion.button>
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === i
                  ? "bg-lime-400 scale-125 shadow-lg"
                  : "bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= OUR PRODUCTS ================= */}
      <FadeInWhenVisible>
        <section className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-10 text-center flex items-center justify-center gap-3">
            <img src={boxIcon} className="h-10 w-10" alt="" />
            Our Products
          </h2>

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

                <p className="dark:text-gray-500 mt-2">
                  {truncateText(p.description, 100)}
                </p>

                <p className="text-gray-600 font-bold my-3">${p.price}</p>

                <button
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="mt-auto bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-lg font-medium mt-4 flex justify-center items-center gap-2"
                >
                  View Details
                  <ArrowRight />
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
        <FeedbackSection />
      </FadeInWhenVisible>

      {/* ================= EXTRA SECTION 1 ================= */}
      <FadeInWhenVisible>
        <section className="shadow-md bg-gray-200 container mx-auto rounded-xl py-16 text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-extrabold mb-6 flex justify-center items-center gap-2">
            <img src={chooseIcon} className="h-10 w-10" alt="" />
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
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-extrabold mb-6 flex justify-center items-center gap-2">
            <img src={commitmentIcon} className="h-10 w-10" alt="" />
            Our Commitment
          </h2>
          <p className="max-w-2xl font-semibold mx-auto">
            Quality, Transparency, and On-Time Delivery. Always. We ensure every
            garment is tracked meticulously from production to delivery,
            guaranteeing a smooth experience for our clients and partners.
          </p>
        </section>
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <section className="container mx-auto px-6 ">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center flex justify-center items-center gap-3 mb-10">
           <img src={valueIcon} className="h-10 w-10" alt="" /> Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3 text-blue-600">
                Quality First
              </h3>
              <p className="text-gray-600">
                Every product goes through strict quality checks to ensure
                premium finishing and durability for global garment standards.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3 text-blue-600">
                Customer-Centric Approach
              </h3>
              <p className="text-gray-600">
                Our team focuses on delivering comfort, style, and reliability
                with complete transparency throughout the order lifecycle.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3 text-blue-600">
                Sustainable Production
              </h3>
              <p className="text-gray-600">
                We follow eco-friendly processes to reduce waste and ensure a
                sustainable production pipeline for a better future.
              </p>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* =============== STATS OVERVIEW =============== */}
      <FadeInWhenVisible>
        <section className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl flex items-center justify-center gap-3 font-extrabold mb-10">
          <img src={growthIcon} className="h-10 w-10" alt="" />  Our Growth in Numbers
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "12K+", label: "Products Shipped" },
              { value: "98%", label: "On-Time Delivery" },
              { value: "350+", label: "Global Clients" },
              { value: "4.9/5", label: "Customer Rating" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-md p-8 rounded-xl border"
              >
                <h3 className="text-4xl font-bold text-blue-600">
                  {stat.value}
                </h3>
                <p className="mt-2 text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </FadeInWhenVisible>

      {/* =============== FAQ SECTION =============== */}
      <FadeInWhenVisible>
        <section class=" bg-gray-50">
          <div class="max-w-6xl mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold flex items-center justify-center gap-3 mb-10"><img src={trustIcon} className="h-12 w-12" alt="" /> Why People Trust Us</h2>

            <div class="grid md:grid-cols-3 gap-8">
              <div class="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition relative">
                <span class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  01
                </span>
                <h3 class="text-2xl font-semibold mb-2">Fast Performance</h3>
                <p class="text-gray-600">
                  We ensure ultra-fast loading and smooth navigation for all
                  users.
                </p>
              </div>

              <div class="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition relative">
                <span class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  02
                </span>
                <h3 class="text-2xl font-semibold mb-2">Secure System</h3>
                <p class="text-gray-600">
                  Data protection and privacy is our highest priority with
                  encryption.
                </p>
              </div>

              <div class="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition relative">
                <span class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  03
                </span>
                <h3 class="text-2xl font-semibold mb-2">24/7 Support</h3>
                <p class="text-gray-600">
                  Our support team stays active all day, every day.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <section className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl flex items-center justify-center gap-3 font-extrabold text-center mb-12">
          <img src={faqIcon} className="h-10 w-10" alt="" />  Frequently Asked Questions
          </h2>

          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                q: "Do you provide worldwide shipping?",
                a: "Yes! We ship globally with real-time tracking and guaranteed delivery timelines.",
              },
              {
                q: "How fast is production time?",
                a: "Depending on product type, average production time is 7–14 days.",
              },
              {
                q: "Do you allow bulk custom orders?",
                a: "Absolutely. We specialize in customized design, size, packaging, and branding.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="bg-white p-6 rounded-xl border shadow-sm cursor-pointer"
              >
                <summary className="font-semibold text-lg">{faq.q}</summary>
                <p className="text-gray-600 mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </FadeInWhenVisible>
      {/* =============== BIG CTA =============== */}
      <FadeInWhenVisible>
        <section className="container mx-auto px-6 text-center">
          <div className="bg-gray-200 rounded-2xl py-16 px-6 shadow-xl">
            <h2 className="text-3xl md:text-4xl flex justify-center items-center gap-3 font-extrabold mb-4">
            <img src={readyIcon} className="h-10 w-10" alt="" />  Ready to Start Your Production With Us?
            </h2>
            <p className=" max-w-xl mx-auto mb-8">
              Let’s discuss your project requirements and build long-term
              partnership.
            </p>

            <button
              onClick={() => navigate("/contact")}
              className="bg-blue-600 hover:bg-blue-700 px-10 py-3 text-lg font-semibold text-white rounded-lg"
            >
              Contact Us
            </button>
          </div>
        </section>
      </FadeInWhenVisible>
    </motion.div>
  );
};

export default Home;
