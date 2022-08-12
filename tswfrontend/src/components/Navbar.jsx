import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image/logo.png";

const Navbar = () => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-5 ml-5">
        <Link to="/" className="flex flex-row items-center">
          <img src={logo} alt="Ticketsense" className="w-[30px] md:w-[40px] " />
          <p className="ml-1 md:mb-1 text-sm md:text-2xl font-semibold">
            ticket sense
          </p>
        </Link>
        <div className="flex flex-row uppercase mr-5 md:mr-8">
          <p className="p-2 md:p-4 cursor-pointer text-sm md:text-lg font-semibold">
            DOCS
          </p>
          <p className="p-2 md:p-4 cursor-pointer text-sm md:text-lg font-semibold">
            Contact
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
