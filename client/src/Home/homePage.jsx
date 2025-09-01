import { Routes, Route } from "react-router-dom";
import Home from "./home";
import React from "react";
import Header from "../Components/Header";
import Store from "../marche/store";
import Footer from "../Components/Footer";

function HomePage() {
  return (
    <React.Fragment>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
      <Footer/>
    </React.Fragment>
  );
}

export default HomePage;
