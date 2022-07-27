import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Movie = () => {
  const [like, setlike] = useState(false);
  const [saved, setSaved] = useState(false);

  const deleteShow = () => {
    console.log("deleted");
  };

  return (
    <div className="h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] inline-block cursor-pointer relative m-2">
      <img
        className="w-auto h-full block"
        src={`https://image.tmdb.org/t/p/w500//uLUJB2zqi91lhsxqqFJtCAYfLjW.jpg`}
        alt="Thor"
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white ">
        <div className="flex flex-col justify-center items-center h-full text-center ">
          <p className="white-space-normal text-xs md:text-sm font-bold w-full p-1 text-ellipsis overflow-hidden">
            Thallumaala
          </p>
          <p className="p-1 w-full mx-auto text-ellipsis overflow-hidden font-normal text-xs md:text-[10px] text-gray-300">
            Carnival Downtown: Thalassery
          </p>
          <p className="w-full mx-auto font-light text-xs md:text-[10px] text-gray-300">
            30-07-2022
          </p>
        </div>

        <p onClick={deleteShow}>
          <MdDeleteForever
            size={25}
            className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-300"
          />
        </p>
        {/* <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p> */}
      </div>
    </div>
  );
};

export default Movie;
