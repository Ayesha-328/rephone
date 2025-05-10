import React from "react";
import { motion } from "framer-motion";
import { FaPhone, FaCheckCircle, FaRegCreditCard, FaShippingFast, FaHandHoldingUsd } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GlowingEffect } from "./ui/glowing-effect";

export function HowRePhoneWorks() {
  return (
    <section className="bg-gradient-to-b from-[#003366] via-[#0655a4] to-[#95c6f6] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-[aperture] lg:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#FF9F1C] to-[#dbb51e]">
            How REPHONE Works: Selling Your Phone in 6 Easy Steps
          </h2>
          <p className="mt-4 text-white text-lg font-light">
            Our simple process makes selling your phone quick, secure, and rewarding. Follow these steps to get started!
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
          {[ 
            {
              step: "1",
              title: "Choose Your Phone",
              description: "Select the phone you want to sell from your collection.",
              icon: <FaPhone className="text-4xl text-[#FF9F1C]" />,
            },
            {
              step: "2",
              title: "IMEI Verification",
              description: "Ensure your phone is genuine and not stolen with IMEI verification.",
              icon: <FaCheckCircle className="text-4xl text-[#FF9F1C]" />,
            },
            {
              step: "3",
              title: "Phone Evaluation",
              description: "Provide the condition, and we’ll evaluate your phone’s value.",
              icon: <FaCheckCircle className="text-4xl text-[#FF9F1C]" />,
            },
            {
              step: "4",
              title: "Offer & Approval",
              description: "Review and accept our offer based on the evaluation.",
              icon: <FaRegCreditCard className="text-4xl text-[#FF9F1C]" />,
            },
            {
              step: "5",
              title: "Payment",
              description: "Receive payment once your phone is confirmed and processed.",
              icon: <FaHandHoldingUsd className="text-4xl text-[#FF9F1C]" />,
            },
            {
              step: "6",
              title: "Shipping",
              description: "Ship your phone or opt for a pickup service.",
              icon: <FaShippingFast className="text-4xl text-[#FF9F1C]" />,
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative bg-[#fac77b] border border-[#003366]/20 rounded-2xl p-6 shadow-md flex flex-col items-center justify-center"
            >
          
              <div className="bg-[#003366] p-4 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-[#003366] font-semibold text-lg">{step.title}</h3>
              <p className="text-[#003366] text-sm mt-2">{step.description}</p>
         
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8">
        <button className="bg-gradient-to-r from-[#003366] to-[#165ba0] text-white py-3 px-6 rounded-xl shadow-md hover:brightness-110 transition">
          <Link to="/seller/login" className="w-full h-full">
            Start Selling Your Phone Now
          </Link>
        </button>
        </motion.div>
      </div>
    </section>
  );
}
