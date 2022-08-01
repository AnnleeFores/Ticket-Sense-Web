import React from "react";
import Telegram from "./Telegram";

const Login = () => {
  return (
    <div className="text-white">
      <div className="max-w-[860px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <h1 className="text-[#00df9a] text-5xl mt-[45px] font-bold flex justify-center p-2 md:text-7xl sm:text-6xl md:py-6">
          Ticket Sense
        </h1>

        <p className="md:text-2xl text-[1rem] font-bold mt-3 text-gray-500">
          Get notified about ticket sales at your preferred theater before
          anyone else.
        </p>
        <div className="mt-[60px]">
          <Telegram />
        </div>
      </div>
    </div>
  );
};

export default Login;
