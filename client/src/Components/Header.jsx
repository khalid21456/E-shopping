import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Search } from "lucide-react";
import { IoPersonOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { GrCart } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import Categories from "./Categories";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Get the offset position of the header sections above the "no-scrollabel" div
      // This is the gray section (64px) + the top section (36px) = 100px
      const stickyOffset = 100;

      if (window.pageYOffset >= stickyOffset) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="bg-gray-500 h-16"></div>
      <div className="bg-gray-200 h-9 flex justify-around">
        <label
          className="text-orange-500 pt-2 hover:underline hover:text-blue-500 cursor-pointer text-[13px] font-bold"
          style={{ fontFamily: "Poppins" }}
        >
          Vender sur e-shop
        </label>
        <img
          src={logo}
          width="70px"
          style={{ marginRight: "100px" }}
          alt="logo"
        />
        <div></div>
      </div>

      {/* Add a placeholder div when sticky to prevent layout jump */}
      {isSticky && <div className="h-18"></div>}

      <div
        id="no-scrollabel"
        className={`bg-white h-18 flex justify-center transition-all duration-300 z-50 ${
          isSticky ? "fixed top-0 left-0 right-0 shadow-lg" : "relative"
        }`}
      >
        <div className="relative group flex items-center">
          <MdMenu
            style={{
              fontSize: "30px",
              marginTop: "2px",
              marginRight: "20px",
              cursor: "pointer",
            }}
          />

          {/* Dropdown container */}
          <div className="absolute left-0 top-full mt-2 w-56 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
            {/* Arrow pointing up */}
            <div className="absolute -top-2 left-4 w-4 h-4 bg-white transform rotate-45 z-10"></div>

            {/* Categories dropdown */}
            <div className="bg-white rounded-lg shadow-lg p-2 relative z-20">
              <Categories />
            </div>
          </div>
        </div>
        <img
          src={logo}
          height="100px"
          style={{ marginRight: "100px", cursor: "pointer" }}
          alt="logo"
          onClick={(e) => navigate("/e-shop")}
        />
        <div className="flex mr-9">
          <div className="flex items-center bg-white rounded border border-gray-200 h-12 w-[500px] mt-3 overflow-hidden hover:shadow-xl transition-shadow ">
            <div className="pl-4 pr-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cherchez un produit, une marque ou une catégorie"
              className="flex-1 py-4 px-2 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none text-base"
            />
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 h-12 mt-3 ml-2 cursor-pointer rounded font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
            Rechercher
          </button>
        </div>
        <div
          id="connect"
          className="flex mt-5 hover:text-orange-500 cursor-pointer transition-colors duration-200"
        >
          <IoPersonOutline style={{ fontSize: "30px" }} />
          <span
            className="font-bold pt-1 pl-2"
            onClick={(e) => navigate("/login")}
          >
            Se connecter
          </span>
        </div>
        <div id="aide">
          <div className="relative group">
            <button className="flex items-center px-4 py-2 mt-3 font-bold text-gray-700 bg-white rounded cursor-pointer transition-colors duration-200 hover:text-orange-500 focus:outline-none">
              <IoMdHelpCircleOutline
                style={{ fontSize: "30px", marginRight: "5px" }}
              />
              Aide
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <a
                href="#faq"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                FAQ
              </a>
              <a
                href="#contact"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Contact
              </a>
              <a
                href="#support"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Support
              </a>
            </div>
          </div>
        </div>
        <div
          id="pannier"
          className="flex mt-5 hover:text-orange-500 cursor-pointer transition-colors duration-200"
        >
          <GrCart style={{ fontSize: "30px" }} />
          <span className="font-bold pt-1 pl-2">Panier</span>
        </div>
      </div>
    </React.Fragment>
  );
}
