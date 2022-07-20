import React from "react";

const Main = () => {
  return (
    <div className="w-full h-[500px] text-white">
      <div className="">
        <div className="m-4">
          <form className=" max-w-[1000px] mt-[200px] flex flex-col items-center justify-between w-full mx-auto ">
            <div className="flex flex-row">
              <input
                className="p-3 flex w-full rounded-l-md  bg-gray-600 text-white"
                type="email"
                placeholder="Enter Movie Name"
              />
              <input
                className="p-3 flex w-1/2 rounded-r-md border-l border-gray-800 bg-gray-600 text-white"
                type="email"
                placeholder="Choose Date"
              />
            </div>
            <button className="bg-[#00df9a] text-black rounded-md font-medium w-[120px]  ml-4 my-6 px-3 py-3">
              Notify Me
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;
