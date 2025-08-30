import { Routes, Route } from "react-router-dom";
import React from "react";
import Header from "../Components/Header";
import Store from "../marche/store";

function StorePage() {
  return (
    <React.Fragment>
      <Header />
      <div>
        <Routes>
          <Route path="/store" element={<Store/>} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default StorePage;
