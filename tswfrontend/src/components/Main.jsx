import React from "react";
import { useState, useEffect } from "react";
import { DatePicker } from "@mantine/dates";
import { SegmentedControl, Autocomplete } from "@mantine/core";
import dayjs from "dayjs";
import { Calendar, MasksTheater, Movie } from "tabler-icons-react";
import customParseFormat from "dayjs/plugin/customParseFormat";

import axios from "axios";
import requests from "../Requests";

dayjs.extend(customParseFormat);

const Main = () => {
  const [value, onChange] = useState(new Date());
  const [movie, setMovie] = useState("");
  const [moviedata, setMoviedata] = useState([]);
  const [theater, setTheater] = useState("");
  const [site, setSite] = useState("bms");

  // convert output from calendar to date format
  const dateFormat = dayjs(value).format("YYYY-MM-DD");

  useEffect(() => {
    if (movie.length > 1) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=00e6af3c5f4640d75b94527d05ec7098&language=en-US&query=${movie}&page=1&include_adult=false`
        )
        .then((response) => {
          const movietitle = response.data.results.map(
            (item, id) =>
              `${item?.title} - ${dayjs(item?.release_date).format("YYYY")}`
          );

          setMoviedata(movietitle);
        });
    } else {
      setMoviedata([]);
    }
  }, [movie]);

  const log = async (e) => {
    e.preventDefault();
    console.log(theater);
    console.log(site);
    console.log(dateFormat);
    console.log(movie);
    setMovie("");
    setMoviedata([]);
    setTheater([]);
    onChange(new Date());
  };

  return (
    <div className="w-full h-[500px] text-white">
      <div className="m-4">
        <h1 className="text-[#00df9a] text-5xl mt-[50px] font-bold flex justify-center ">
          Ticket Sense
        </h1>

        <form
          onSubmit={log}
          className=" max-w-[700px] mt-[80px]  flex flex-col items-center justify-center w-full mx-auto "
        >
          <div className=" mb-3 flex flex-col sm:flex-row justify-between items-center">
            <p className="  text-gray-300  m-2 ">Select Booking Website</p>

            <SegmentedControl
              className="m-2"
              color="blue"
              value={site}
              onChange={setSite}
              data={[
                { label: "BookMyShow", value: "bms" },
                { label: "TicketNew", value: "tk" },
              ]}
            />
          </div>
          <Autocomplete
            className="w-full px-2 m-2 sm:w-2/3"
            placeholder="Movie Name"
            required
            size="md"
            icon={<Movie size={16} />}
            value={movie}
            onChange={setMovie}
            data={moviedata}
          />
          <Autocomplete
            className="w-full px-2 m-2 sm:w-2/3"
            placeholder="Movie Theater"
            required
            size="md"
            icon={<MasksTheater size={16} />}
            value={theater}
            onChange={setTheater}
            data={["React", "Angular", "Svelte", "Vue"]}
          />

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

          <button className="bg-[#00df9a] text-black rounded-md font-medium w-[200px] m-4 mt-8 p-3">
            Enable Ticket Sense
          </button>
        </form>
      </div>
    </div>
  );
};

export default Main;
