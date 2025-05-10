import React from "react";
import { motion } from "framer-motion";
import BecomeSellerImg from "../assets/becomeSellerImage.jpg"; // Adjust the path as necessary
import { Link } from "react-router-dom";


export function BecomeASeller() {
  return (
    <section className="bg-gradient-to-b from-[#e6f0ff] to-[#f5faff] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-[aperture] lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#003366] via-[#165ba0] to-[#003366]">
            Become a Seller – Turn Your Used Phone Into Cash
          </h2>
          <p className="mt-4 text-[#003366] text-lg font-light">
            Got an old phone lying around? Sell it on our platform and get the best value instantly.
          </p>

          {/* Timeline Steps */}
<div className="relative mt-10 pl-2 border-l-2 border-[#165ba0]/40">
  {[1, 2, 3].map((num, i) => {
    const steps = [
      {
        title: "List Your Device",
        desc: "Provide details like model, condition, and accessories.",
      },
      {
        title: "Get Instant Offers",
        desc: "Receive competitive offers from verified buyers.",
      },
      {
        title: "Ship & Get Paid",
        desc: "Free pickup or drop-off. Get paid once your phone is verified.",
      },
    ];
    const step = steps[i];
    return (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: i * 0.2 }}
        viewport={{ once: true }}
        className="relative mb-10 ml-4"
      >
        {/* Circle with Number */}
        <div className="absolute -left-[38px] top-0 w-8 h-8 rounded-full bg-[#FF9F1C] text-[#003366] flex items-center justify-center text-sm font-semibold shadow-md">
          {num}
        </div>

        {/* Content */}
        <div className="px-3">
          <h3 className="text-[#003366] font-semibold text-xl">{step.title}</h3>
          <p className="text-[#003366] text-sm mt-1">{step.desc}</p>
        </div>
      </motion.div>
    );
  })}
</div>


          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <button className="bg-gradient-to-r from-[#003366] to-[#165ba0] text-white py-3 px-6 rounded-xl shadow-md hover:brightness-110 transition">
            <Link to="/seller/login" className="w-full h-full">
    Become a Seller
        </Link>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Image or Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src={BecomeSellerImg}
            alt="Sell Your Phone"
            className="max-w-md w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
