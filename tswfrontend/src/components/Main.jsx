import React from "react";
import { useState, useContext } from "react";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { Calendar } from "tabler-icons-react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from "axios";

import AuthContext from "../context/AuthContext";
import SelectSlider from "./SelectSlider";
import AutoSearch from "./AutoSearch";
import LocationSelect from "./LocationSelect";
import TheaterSelect from "./TheaterSelect";

dayjs.extend(customParseFormat);

const Main = () => {
  let {
    setNewpost,
    user,
    site,
    movie,
    setMoviedata,
    setMovie,
    setLocation,
    location,
    setTheaterdata,
    theater,
    setTheater,
  } = useContext(AuthContext);

  const [value, onChange] = useState(new Date());

  // convert output from calendar to date format
  const dateFormat = dayjs(value).format("YYYY-MM-DD");

  const log = async (e) => {
    e.preventDefault();
    setNewpost(false);
    const loc = JSON.parse(location);
    const thea = JSON.parse(theater);

    axios
      .post(`api/trigger/`, {
        site: site,
        date: dateFormat,
        film: movie,
        location: loc,
        theater: thea,
        tg_user_id: user,
      })
      .then((response) => {
        if (response.data.message === "success") {
          setNewpost(true);
        }
      });

    setMovie("");
    setMoviedata([]);
    onChange(new Date());
    setLocation('{ "name": " ", "location_code": " " }');
    setTheater(`{ "name": " ", "theatre_code": " " }`);
    setTheaterdata([{ value: "", label: "" }]);
  };

  return (
    <div className=" text-white">
      <div className="w-full h-full">
        <h1 className="text-[#00df9a] text-5xl mt-[45px] font-bold flex justify-center ">
          Ticket Sense
        </h1>

        <form
          onSubmit={log}
          className=" max-w-[700px] mt-[80px]  flex flex-col items-center justify-center w-full mx-auto "
        >
          <div className=" mb-3 flex flex-col sm:flex-row justify-between items-center">
            <p className="  text-gray-300  m-2 ">Select Booking Website</p>
            <SelectSlider />
          </div>

          <AutoSearch />

          <LocationSelect />
          <TheaterSelect />

          <DatePicker
            className="w-full px-2 m-2 sm:w-2/3"
            placeholder="Pick date"
            required
            size="md"
            inputFormat="DD/MM/YYYY"
            icon={<Calendar size={16} />}
            value={value}
            onChange={onChange}
          />

          <button className="bg-[#00df9a] text-black rounded-md shadow-lg font-medium w-[200px] m-4 mt-8 p-3">
            Enable Ticket Sense
          </button>
        </form>
      </div>
    </div>
  );
};

export default Main;
