import React from "react";
import { useState } from "react";
import { Calendar } from "@mantine/dates";
import { Chip, Chips, MantineProvider } from "@mantine/core";
import dayjs from "dayjs";

const Main = () => {
  const [value, setValue] = useState([]);
  const [movie, setMovie] = useState([]);
  const [theater, setTheater] = useState([]);
  const [site, setSite] = useState("");

  // convert output from calendar to date format
  const dateFormat = value
    .map((date) => dayjs(date).format("YYYY-MM-DD"))
    .join(", ");

  const log = async (e) => {
    e.preventDefault();
    console.log(movie);
    console.log(theater);
    console.log(site);
    console.log(dateFormat);
    setMovie([]);
    setTheater([]);
    setValue([]);

    e.target.reset();
  };

  return (
    <div className="w-full h-[500px] text-white">
      <div className="m-4">
        <h1 className="text-[#00df9a] text-6xl mt-[50px] font-bold flex justify-center ">
          Ticket Sense
        </h1>
        <form
          onSubmit={log}
          className=" max-w-[700px] mt-[50px] flex flex-col items-center justify-between w-full mx-auto "
        >
          <div className="flex flex-row w-full">
            <input
              onChange={(e) => setMovie(e.target.value)}
              className="p-3 flex w-full rounded-l-md  bg-gray-600  text-white"
              type="text"
              placeholder="Movie Name"
            />
            <input
              onChange={(e) => setTheater(e.target.value)}
              className="p-3 flex w-full rounded-r-md border-l-2 border-gray-800 bor bg-gray-600 text-white"
              type="text"
              placeholder="Movie Theater"
            />
          </div>
          <div className="flex flex-col justify-between w-full items-center md:flex-row">
            <div>
              <p className="mt-8 mb-3 text-gray-300 flex justify-center items-center font-semibold">
                Which website?
              </p>
              <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                  colorScheme: "dark",
                  colors: {
                    // override dark colors to change them for all components
                    dark: [
                      "#d5d7e0",
                      "#acaebf",
                      "#8c8fa3",
                      "#666980",
                      "#4d4f66",
                      "#1d1e30",
                      "#0c0d21",
                      "#01010a",
                    ],
                  },
                }}
              >
                <Chips
                  size="md"
                  multiple={false}
                  value={value}
                  onChange={setSite}
                >
                  <Chip value="bms">BookMyShow</Chip>
                  <Chip value="tk">Ticket New</Chip>
                </Chips>
              </MantineProvider>
            </div>

            <div className="mb-5">
              <p className="mt-8 mb-3 text-gray-300 flex justify-center items-center font-semibold">
                Choose Ticket Booking Date(s)
              </p>
              <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                  colorScheme: "dark",
                  colors: {
                    // override dark colors to change them for all components
                    dark: [
                      "#d5d7e0",
                      "#acaebf",
                      "#8c8fa3",
                      "#666980",
                      "#4d4f66",
                      "#1d1e30",
                      "#0c0d21",
                      "#01010a",
                    ],
                  },
                }}
              >
                <Calendar multiple value={value} onChange={setValue} />
              </MantineProvider>
            </div>
          </div>
          <button className="bg-[#00df9a] text-black rounded-md font-medium w-[200px] m-4 p-3">
            Enable Ticket Sense
          </button>
        </form>
      </div>
    </div>
  );
};

export default Main;
