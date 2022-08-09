import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import dayjs from "dayjs";
import no_image from "../assets/image/no_image.png";
import AuthContext from "../context/AuthContext";

const Listing = () => {
  let { newpost } = useContext(AuthContext);

  const [mainData, setmainData] = useState([]);

  const [displayData, setdisplayData] = useState([]);

  const [buttonValue, setButtonValue] = useState("all");

  const [user_data, setUser_data] = useState(sessionStorage.getItem("user"));

  const getData = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/getdata/${user_data}/`)
      .then((response) => {
        const data = response.data.map((item, id) => item);
        setmainData(data);
        setdisplayData(data);
        setButtonValue("all");
      });
  };

  const filterType = (site) => {
    setButtonValue(site);
    if (site === "all") {
      setdisplayData(mainData);
    } else {
      setdisplayData(
        mainData.filter((item) => {
          return item.site === site;
        })
      );
    }
  };

  useEffect(() => {
    if (newpost === true) {
      getData();
    }
  }, [newpost]);

  useEffect(() => {
    getData();
  }, []);

  const deleteShow = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URI}api/trigger/${id}/`)
      .then((response) => {
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
            onClick={() => filterType("all")}
            className={
              buttonValue === "all"
                ? "border text-xs rounded bg-[#00df9a] border-[#00df9a] text-black p-1 px-4 m-2"
                : "border text-xs rounded hover:border-[#00df9a] hover:text-[#00df9a]  p-1 px-4 m-2"
            }
          >
            All
          </button>
          <button
            onClick={() => filterType("bms")}
            className={
              buttonValue === "bms"
                ? "border text-xs rounded bg-[#00df9a] border-[#00df9a] text-black p-1 m-2"
                : "border text-xs rounded hover:border-[#00df9a] hover:text-[#00df9a] p-1 m-2"
            }
          >
            BookMyShow
          </button>
          <button
            onClick={() => filterType("tk")}
            className={
              buttonValue === "tk"
                ? "border text-xs rounded bg-[#00df9a] border-[#00df9a] text-black p-1 m-2"
                : "border text-xs rounded hover:border-[#00df9a] hover:text-[#00df9a] p-1 m-2"
            }
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
