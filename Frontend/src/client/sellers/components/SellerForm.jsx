import React, { useState } from "react";
import { UploadImage } from "./imageUpload";

export const SellerForm = () => {
    return (
        <>
            <div className="justify-center items-center min-h-42 p-4 relative left-5 border-4 border-[#FF9F1C] rounded-2xl shadow-lg lg:min-h-100 lg:left-1/2">
            <p className="font-[Montserrat] text-xl left-5 font-bold text-[#FFFFFF] relative lg:left-33 lg:text-3xl">List Your Phone for Sale</p>
                <div className="flex flex-col">
                    <p className="text-sm text-[#FFFFFF] font-medium font-[Merriweather] mb-2 ml-6 mt-2 lg:mt-0 lg:text-md">
                        Upload Images <span className="text-[#FF0000]">*</span>
                    </p>
                    <div className="bg-[#FFFFFF] w-70 h-25 flex items-center justify-center text-center rounded-2xl ml-4 lg:w-150 lg:h-25">
                        <UploadImage />
                    </div>
                </div>

                <div className="lg:flex">
                    <div className="mt-5">
                        <p className="text-sm lg:text-md text-[#FFFFFF] font-medium font-[Merriweather] mb-2 ml-7">
                            Brand <span className="text-[#FF0000]">*</span>
                        </p>
                        <div className="bg-[#FFFFFF] w-70 h-15 flex items-center justify-center text-center rounded-2xl ml-5">
                            <input className="font-medium font-[Montserrat] w-60 h-10 ml-5 outline-none border-none focus:ring-0" type="text" placeholder="Enter brand name" />
                        </div>
                    </div>
                    <div className="-ml-1 mt-5 lg:ml-2">
                        <p className="text-md text-[#FFFFFF] font-medium font-[Merriweather] mb-2 ml-8">
                            Model <span className="text-[#FF0000]">*</span>
                        </p>
                        <div className="bg-[#FFFFFF] w-70 h-15 flex items-center justify-center text-center rounded-2xl ml-6">
                            <input className="font-medium font-[Montserrat] w-60 h-10 ml-5 outline-none border-none focus:ring-0" type="text" placeholder="Enter Model no" />
                        </div>
                    </div>
                </div>


                <div className="lg:flex">
                    <div className="mt-5">
                        <p className="text-md text-[#FFFFFF] font-medium font-[Merriweather] mb-2 ml-7">
                            Condition <span className="text-[#FF0000]">*</span>
                        </p>
                        <div className="bg-[#FFFFFF] w-70 h-15 flex items-center justify-center text-center rounded-2xl ml-5">
                            <input className="font-medium font-[Montserrat] w-60 h-10 ml-5 outline-none border-none focus:ring-0" type="text" placeholder="Describe the condition" />
                        </div>
                    </div>
                    <div className="-ml-1 mt-5 lg:ml-2">
                        <p className="text-md text-[#FFFFFF] font-medium font-[Merriweather] mb-2 ml-8">
                            Years Old <span className="text-[#FF0000]">*</span>
                        </p>
                        <div className="bg-[#FFFFFF] w-70 h-15 flex items-center justify-center text-center rounded-2xl ml-6">
                            <input className="font-medium font-[Montserrat] w-60 h-10 ml-5 outline-none border-none focus:ring-0" type="text" placeholder="How many years old" />
                        </div>
                    </div>
                </div>

                <div className="lg:flex">
                    <div className="mt-5">
                        <p className="text-md text-[#FFFFFF] font-medium font-[Merriweather] mb-2 ml-7">
                            IMEI No 1 <span className="text-[#FF0000]">*</span>
                        </p>
                        <div className="bg-[#FFFFFF] w-70 h-15 flex items-center justify-center text-center rounded-2xl ml-5">
                            <input className="font-medium font-[Montserrat] w-60 h-10 ml-5 outline-none border-none focus:ring-0" type="text" placeholder="Enter IMEI no:01" />
                        </div>
                    </div>
                    <div className="-ml-1 mt-5 lg:ml-2">
                        <p className="text-md text-[#FFFFFF] font-medium font-[Merriweather] mb-2 ml-8">
                            IMEI No 2 <span className="text-[#808080] text-sm">(optional)</span>
                        </p>
                        <div className="bg-[#FFFFFF] w-70 h-15 flex items-center justify-center text-center rounded-2xl ml-6">
                            <input className="font-medium font-[Montserrat] w-60 h-10 ml-5 outline-none border-none focus:ring-0" type="text" placeholder="Enter IEMI no:02" />
                        </div>
                    </div>
                </div>

                <button className=" bg-gradient-to-r from-[#FF9F1C] via-[#FF8F00] to-[#FF7F00] hover:bg-gradient-to-br text-[#FFFFFF] text-3xl font-bold font-[Merriweather] text-center w-70 h-12 lg:w-150 lg:h-15 ml-4 mt-5">
                    Submit to Verify
                </button>
            </div>
        </>
    )

}