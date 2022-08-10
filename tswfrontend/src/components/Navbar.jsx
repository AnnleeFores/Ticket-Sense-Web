import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image/logo.png";

const Navbar = () => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-5 ml-5">
        <Link to="/">
          <img src={logo} alt="Ticketsense" className="w-[40px] " />
        </Link>
        <div className="flex flex-row uppercase text-sm font-bold mr-5 md:mr-8">
          <p className="p-2 md:p-4 cursor-pointer">Docs</p>
          <p className="p-2 md:p-4 cursor-pointer">About</p>
          <p className="p-2 md:p-4 cursor-pointer">Contact</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
