import React from "react";
import { Header } from "../components/Header";  // Ensure this path is correct
import { HomepageComp } from "../components/HomepageComp";
// import ProductCatalog from "../components/catalogComponent";
import CatalogPage from "./CatalogPage";
import Footer from '../components/Footer';
// import { RangeSelector } from "../components/priceScalar";
import { Categories } from "../components/Categories";
import { BecomeASeller } from "../components/BecomeASeller";
import { Verified } from "../components/Verified";
import { HowRePhoneWorks } from "../components/HowRePhoneWorks";
import ContactPage from "./ContactPage";

const HomePage = () => {
  return (
    <>
      <Header/> 
      <HomepageComp/>
      <Categories/>
      <BecomeASeller />
      <Verified/>
      <HowRePhoneWorks/>
      
      <ContactPage/>
      {/* <div className="relative top-120 z-100">
      <SideFilterBar/>
      </div> */}
    {/* <div className="relative top-60 mt-15 bg-[#FFFFFF] w-351">
    <CatalogPage/>
    </div> */}
    {/* <RangeSelector/> */}
      </>
     
  );
};

export default HomePage;