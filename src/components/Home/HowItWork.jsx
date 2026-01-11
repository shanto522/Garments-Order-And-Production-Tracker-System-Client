import { motion } from "framer-motion";
import { ArrowRight, ListChecks } from "lucide-react";
import bookIcon from '../../assets/book.png'

const steps = [
  { title: "Order Placed" },
  { title: "Production Started" },
  { title: "Quality Check" },
  { title: "Packed & Shipped" },
  { title: "Delivered" },
];

const HowItWorks = () => {
  return (
    <section className="container mx-auto px-4 py-4 ">
      <h2 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-4">
       <img src={bookIcon} className="h-10 w-10" alt="" />How It Works
        
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="bg-white p-4 rounded-lg shadow text-center"
          >
            <div className="text-xl font-bold mb-2">{idx + 1}</div>
            <p className="font-semibold">{step.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
