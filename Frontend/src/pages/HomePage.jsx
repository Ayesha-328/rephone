import React from "react";
import { Header } from "../components/Header";  // Ensure this path is correct
import { HomepageComp } from "../components/homepageComp";
import ProductCatalog from "../components/catalogComponent";

const HomePage = () => {
  return (
    <>
      <Header/> 
      <HomepageComp/>
    <ProductCatalog />
      </>
      
      
  );
};

export default HomePage;
