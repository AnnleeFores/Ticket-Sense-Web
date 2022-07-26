import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Listing = ({ item }) => {
  const [like, setlike] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveShow = () => {
    console.log("hello");
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://www.denofgeek.com/wp-content/uploads/2022/07/Chris-Hemsworth-in-Thor-Love-and-Thunder-Art.jpeg`}
        alt="image"
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white ">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          Title
        </p>
      </div>
    </div>
  );
};

export default Listing;
