import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContainerTextFlip } from "./ui/container-text-flip";
import {BackgroundBeams} from "./ui/background-beams";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { Link } from "react-router-dom";

export const HomepageComp = () => {
  const [currentImage, setCurrentImage] = useState("phone");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) =>
        prevImage === "phone" ? "women1" : prevImage === "women1" ? "women2" : "phone"
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative top-0 left-0 w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#002241] to-[#003566] flex flex-col lg:flex-row items-center justify-center px-6 py-16">
  {/* Background Beams - z-0 */}
  <div className="absolute w-full inset-0 z-0">
    <BackgroundBeams />
  </div>

  {/* Text Section - z-10 */}
  <div className="relative flex flex-col justify-center z-10 w-full lg:w-1/2 md:ml-8 md:pl-16 text-white space-y-6 text-center lg:text-left pt-20">
    <motion.h1
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-3xl md:text-6xl font-bold font-[aperture]"
    >
      Experience the Better Way to{" "}
      <ContainerTextFlip
  words={["buy", "sell", "trusted", "secure"]}
  animationDuration={700}
  interval={2000}
  className="font-[Montserrat] text-6xl my-4"
/>
      {" "} Used Smartphones in Pakistan.
    </motion.h1>

    <motion.p
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="text-base md:text-lg font-light font-[Merriweather]"
    >
      Join thousands of smart users turning old phones into cash or grabbing great deals with peace of mind.

    </motion.p>
<motion.div 
initial={{ x: -100, opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
transition={{ duration: 1 }}
className="flex gap-4 justify-center md:justify-start">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="text-base md:text-lg font-semibold font-[aperture] text-[#fdb34d] bg-[#002241] px-8 py-3 hover:bg-[#003566] transition-colors"
      >
       <Link to='/catalog'>Buy Now</Link>
      </HoverBorderGradient>
      
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="text-base md:text-lg font-semibold font-[aperture] text-[#002241] hover:bg-[#fdb34d] px-8 py-3 bg-[#FF9F1C] transition-colors"
      >
       <Link to='/seller/register'>Become a Seller</Link>
      </HoverBorderGradient>

</motion.div>
      
      
    
  </div>

  {/* Image Section - z-10 */}
  <div className="relative z-10 w-full lg:w-1/2 h-[300px] md:h-[400px] flex items-center justify-center">
    {/* Background SVG as decoration */}
    <motion.img
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute inset-0 w-full h-full object-contain z-0 opacity-30"
      src="/imageAnimationbg.svg"
      alt="Background"
    />

    {/* Foreground Animated Images */}
    <AnimatePresence mode="wait">
      {currentImage === "phone" && (
        <motion.img
          key="phone"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 50, damping: 9, mass: 0.5 }}
          className="z-10 w-2/3 md:w-1/2 object-contain"
          src="/phoneImage.svg"
          alt="Phone"
        />
      )}
      {currentImage === "women1" && (
        <motion.img
          key="women1"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 150, damping: 12 }}
          className="z-10 w-3/4 md:w-2/3 object-contain"
          src="/womenImage1.svg"
          alt="Woman 1"
        />
      )}
      {currentImage === "women2" && (
        <motion.img
          key="women2"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 12 }}
          className="z-10 w-3/4 md:w-2/3 object-contain"
          src="/womenImage2.svg"
          alt="Woman 2"
        />
      )}
    </AnimatePresence>
  </div>
</div>

  );
};
