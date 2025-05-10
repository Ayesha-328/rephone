import React from "react";
import { motion } from "framer-motion";
import VerifiedImg from "../assets/verification.png";
import ImeiImg from "../assets/imei.png"; // Adjust the path as necessary
import SecureImg from "../assets/security.png";
import TrustImg from "../assets/anti-stolen.png";
import { GlareCard } from "./ui/glare-card"; 


export function Verified() {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        {/* Left Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-[aperture] lg:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#FF9F1C] to-[#dbb51e]">
            IMEI Verified: Only Genuine, Safe Phones
          </h2>
          <p className="mt-4 text-black text-lg font-light">
            We ensure that every phone listed on our platform has a valid IMEI number, guaranteeing it's not stolen and ready for use.
          </p>
        </motion.div>

        {/* Benefits Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-8">
          {[ 
            { img: VerifiedImg, title: "Genuine Phones Only", desc: "No blacklisted or stolen phones allowed." },
            { img: ImeiImg, title: "Secure and Safe", desc: "Verified through a secure IMEI check process." },
            { img: SecureImg, title: "Trustworthy Transactions", desc: "Buy with confidence knowing your phone is legit." },
            { img: TrustImg, title: "Global Check", desc: "IMEI can be checked globally for peace of mind." },
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-4"
            >
              
                <GlareCard className="bg-[#003366] border-0 outline-0 shadow-lg flex flex-col items-center justify-center p-4">
              <img src={benefit.img} alt={benefit.title} className="w-23 h-23 mb-4 mx-auto" />
              <h3 className="font-[Montserrat] text-lg text-white font-semibold">{benefit.title}</h3>
              <p className="text-sm mt-2 text-white">{benefit.desc}</p>

                </GlareCard>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8"
        >
        </motion.div>
      </div>
    </section>
  );
}