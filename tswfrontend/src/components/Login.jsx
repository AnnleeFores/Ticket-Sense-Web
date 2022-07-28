import React from "react";
import Typed from "react-typed";
import Telegram from "./Telegram";

const Login = () => {
  return (
    <div className="text-white">
      <div className="max-w-[860px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <h1 className="text-[#00df9a] text-5xl mt-[45px] font-bold flex justify-center p-2 md:text-7xl sm:text-6xl md:py-6">
          Ticket Sense
        </h1>
        <div className="flex sm:flex-row justify-center items-center">
          <h1 className="md:text-4xl sm:text-3xl text-[1.10rem] font-bold md:py-2 mt-8">
            The tool for that perfect
          </h1>
          <Typed
            className="md:text-4xl sm:text-3xl mt-8 text-[1.10rem] font-bold md:pl-2 pl-1"
            strings={["SHOW", "SEAT", "FUN", "DAY"]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="md:text-2xl text-[1rem] font-bold mt-3 text-gray-500">
          Get notified about ticket sales at your preferred theater before
          anyone else.
        </p>
        <div className="mt-8">
          <Telegram />
        </div>
      </div>
    </div>
  );
};

export default Login;
