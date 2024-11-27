import React from "react";
import Navbar from "./navbar/Navbar.jsx";
import SearchBar from "./navbar/SearchBar.jsx";
import Crousel from "./navbar/Carousel.jsx";
import CardGrid from "../Cards/Card.jsx";

const Home = () => {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <div style={{ marginTop: "20px" }}> 
        <Crousel />

      </div>

      <div style={{ marginTop: "20px" }}> 
        <CardGrid/>
      </div>
      
    </div>
  );
};

export default Home;
