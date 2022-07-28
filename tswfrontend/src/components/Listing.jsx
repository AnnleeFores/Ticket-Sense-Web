import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import dayjs from "dayjs";
import no_image from "../assets/image/no_image.png";

const Listing = ({ parentToChild }) => {
  const [mainData, setmainData] = useState([]);

  const [displayData, setdisplayData] = useState([]);

  const getData = async () => {
    axios.get(`api/trigger/`).then((response) => {
      const data = response.data.map((item, id) => item);
      setmainData(data);
      setdisplayData(data);
    });
  };

  const filterType = (site) => {
    setdisplayData(
      mainData.filter((item) => {
        return item.site === site;
      })
    );
  };

  useEffect(() => {
    if (parentToChild === true) {
      getData();
    }
  }, [parentToChild]);

  useEffect(() => {
    getData();
  }, []);

  const deleteShow = (id) => {
    axios.put(`api/trigger/${id}/`).then((response) => {
      getData();
    });
  };

  return (
    <div className="max-w-[1640px] mt-6 m-auto px-4 py-12">
      <p className="font-bold text-xl m-2 flex justify-center md:justify-start ">
        Added Notifications
      </p>
      <div>
        <div className="flex justify-center md:justify-start flex-wrap">
          <button
            onClick={() => setdisplayData(mainData)}
            className="border text-xs px-3 rounded hover:bg-[#00df9a] hover:text-black p-1 m-2"
          >
            All
          </button>
          <button
            onClick={() => filterType("bms")}
            className="border text-xs rounded hover:bg-[#00df9a] hover:text-black p-1 m-2"
          >
            BookMyShow
          </button>
          <button
            onClick={() => filterType("tk")}
            className="border text-xs rounded hover:bg-[#00df9a] hover:text-black p-1 m-2"
          >
            Ticket New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4 pt-4">
        {displayData.map((item, index) => (
          <div
            key={index}
            className="shadow-lg relative rounded-lg hover:scale-105 duration-300 "
          >
            <img
              src={
                item?.poster
                  ? `https://image.tmdb.org/t/p/w300${item?.poster}`
                  : no_image
              }
              alt={item.movie}
              className="w-[200px] h-full object-cover rounded hover:brightness-[0.15]"
            />

            <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 cursor-pointer opacity-0 hover:opacity-100 text-white ">
              <div className="flex flex-col justify-center items-center h-full text-center ">
                <p className="white-space-normal text-xs md:text-sm font-bold w-full p-1 text-ellipsis overflow-hidden">
                  {item?.movie}
                </p>
                <p className="p-1 w-full mx-auto text-ellipsis overflow-hidden font-normal text-xs text-gray-300">
                  {item?.theater}
                </p>
                <p className="w-full mx-auto font-light text-xs text-gray-300">
                  {dayjs(item?.date).format("DD-MM-YYYY")}
                </p>
              </div>

              <p onClick={() => deleteShow(item?.id)}>
                <AiOutlineCloseSquare
                  size={25}
                  className="absolute top-1 right-1 text-gray-300 hover:bg-gray-300 hover:text-black"
                />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listing;
