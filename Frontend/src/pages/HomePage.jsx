import React from "react";
import { Header } from "../components/Header";  // Ensure this path is correct
import { HomepageComp } from "../components/HomepageComp";
// import ProductCatalog from "../components/catalogComponent";
import CatalogPage from "./CatalogPage";
import { SideFilterBar } from "../components/sideFilterBar";
// import { RangeSelector } from "../components/priceScalar";

const HomePage = () => {
  return (
    <>
      <Header/> 
      <HomepageComp/>
      {/* <div className="relative top-120 z-100">
      <SideFilterBar/>
      </div> */}
    <div className="relative top-60 mt-15 bg-[#FFFFFF] w-351">
    <CatalogPage/>
    </div>
    {/* <RangeSelector/> */}

      </>
  );
};

export default HomePage;
