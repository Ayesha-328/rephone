
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";



export const HomepageComp = () => {
    const [currentImage, setCurrentImage] = useState("phone");

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => {
                if (prevImage === "phone") return "women1";
                if (prevImage === "women1") return "women2";
                return "phone"; // Loop back to phone
            });
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="lg:flex">
                {/* Text Section */}
                <div className="absolute top-40 left-20">
                    <motion.p
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-3xl -mt-5 -ml-10 text-white font-bold font-[Montserrat] lg:text-7xl lg:-ml-10 lg:mt-5"
                    >
                        Rephone
                    </motion.p>

                    <motion.p
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-lg tracking-wider text-white font-bold font-[Merriweather] mt-7 w-70 -ml-10 lg:2xl lg-mt-7 lg-w-100 lg-ml-1"
                    >
                        Pakistan’s Trusted Hub for Top Quality Second-Hand Phones!
                    </motion.p>

                    <motion.p
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-lg w-70 mt-7  -ml-14 tracking-wider text-white font-bold text-right font-[Merriweather] mt-7 lg:-ml-2 lg:w-100 lg:text-2xl"
                    >
                        Building Trust, Ensuring Security, and Authenticating the Second-Hand Phone Market
                    </motion.p>
                </div>

                {/* Image Section */}
                {/* Image Section */}
                <div className="relative justify-center items-center w-full h-[400px] hidden lg:flex">

                    {/* Background Image */}
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-90 h-100 top-45 ml-210 relative z-0"
                        src="/imageAnimationbg.svg"
                        alt="Background Image"
                    />

                    {/* Animated Image Transition */}
                    <AnimatePresence mode="wait">
                        {currentImage === "phone" && (
                            <motion.img
                                key="phone"
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -100, opacity: 0 }}
                                transition={{ duration: 1, type: "spring", stiffness: 50, damping: 9, mass: 0.5 }}
                                className="absolute top-23 left-4/5 transform -translate-x-1/2 z-10 w-82"
                                src="/phoneImage.svg"
                                alt="Phone Image"
                            />
                        )}

                        {currentImage === "women1" && (
                            <motion.img
                                key="women1"
                                initial={{ x: 200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -200, opacity: 0 }}
                                transition={{
                                    duration: 0.5,
                                    type: "spring",
                                    stiffness: 150,
                                    damping: 12,
                                    mass: 0.7
                                }}
                                className="absolute -top-14 left-4/5 transform -translate-x-1/2 z-10 w-120"
                                src="/womenImage1.svg"
                                alt="Women Image 1"
                            />
                        )}

                        {currentImage === "women2" && (
                            <motion.img
                                key="women2"
                                initial={{ x: 200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -200, opacity: 0 }}
                                transition={{
                                    duration: 0.5,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 12,
                                    mass: 0.7
                                }}
                                className="absolute -top-8 left-4/5 transform -translate-x-1/2 z-10 w-130"
                                src="/womenImage2.svg"
                                alt="Women Image 2"
                            />
                        )}
                    </AnimatePresence>
                </div>
                <img className="w-20 h-20 mt-85 -ml-15" src="/arrow.svg" alt="" />
            </div>
        </>
    );
};
