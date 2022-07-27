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
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative m-2">
      <img
        className="w-full h-auto block"
        src={`https://www.themoviedb.org/t/p/w533_and_h300_bestv2/p1F51Lvj3sMopG948F5HsBbl43C.jpg`}
        alt="Thor"
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white ">
        <div className="flex flex-col justify-center items-center mt-3 h-full text-center ">
          <p className="white-space-normal text-xs md:text-sm font-bold w-full p-1 text-ellipsis overflow-hidden">
            Thor: Love and Thunder
            <p className="p-1 w-full mx-auto text-ellipsis overflow-hidden font-normal text-xs md:text-sm text-gray-300">
              Carnival Downtown: Thalassery
            </p>
            <p className="w-full mx-auto font-light text-xs md:text-sm text-gray-300">
              30-07-2022
            </p>
          </p>
        </div>

        <p onClick={deleteShow}>
          <MdDeleteForever
            size={20}
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
