import React from "react";
import { useState } from "react";
import { data } from "../data/data.js";

const Food = () => {
  const [foods, setFoods] = useState(data);

  //filter type burgers pizza

  const filterType = (category) => {
    setFoods(
      data.filter((item) => {
        return item.category === category;
      })
    );
  };

  return (
    <div className="max-w-[1640px] mt-6 m-auto px-4 py-12">
      <p className="font-bold text-xl m-2 flex justify-center md:justify-start ">
        Added Notifications
      </p>
      <div>
        <div className="flex justify-center md:justify-start flex-wrap">
          <button
            onClick={() => setFoods(data)}
            className="border text-xs px-3 rounded hover:bg-[#00df9a] hover:text-black p-1 m-2"
          >
            All
          </button>
          <button
            onClick={() => filterType("burger")}
            className="border text-xs rounded hover:bg-[#00df9a] hover:text-black p-1 m-2"
          >
            BookMyShow
          </button>
          <button
            onClick={() => filterType("pizza")}
            className="border text-xs rounded hover:bg-[#00df9a] hover:text-black p-1 m-2"
          >
            Ticket New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-8 gap-6 pt-4">
        {foods.map((item, index) => (
          <div
            key={index}
            className=" shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="flex justify-between px-2 py-4">
              <p className="font-bold">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;
