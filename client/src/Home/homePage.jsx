import { Routes, Route } from "react-router-dom";
import Home from "./home";
import React from "react";
import Header from "../Components/Header";

function HomePage() {
  return (
    <React.Fragment>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
