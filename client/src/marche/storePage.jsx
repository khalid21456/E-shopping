import { Routes, Route } from "react-router-dom";
import React from "react";
import Header from "../Components/Header";
import Store from "../marche/store";
import Footer from "../Components/Footer";

function StorePage() {
  return (
    <React.Fragment>
      <Header />
      <div>
        <Routes>
          <Route path="/store" element={<Store/>} />
        </Routes>
      </div>
      <Footer/>
    </React.Fragment>
  );
}

export default StorePage;
