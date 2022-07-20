import React from "react";
import { useState } from "react";
import { Calendar } from "@mantine/dates";
import { MantineProvider } from "@mantine/core";

const Main = () => {
  const [value, setValue] = useState([]);
  const [movie, setMovie] = useState([]);
  const [theater, setTheater] = useState([]);

  const log = (e) => {
    e.preventDefault();
    console.log(value);
    console.log(movie);
    console.log(theater);
    setMovie([]);
    setTheater([]);
    setValue([]);

    e.target.reset();
  };

  return (
    <div className="w-full h-[500px] text-white">
      <div className="">
        <div className="m-4">
          <form
            onSubmit={log}
            className=" max-w-[800px] mt-[150px] flex flex-col items-center justify-between w-full mx-auto "
          >
            <div className="flex flex-row w-full">
              <input
                onChange={(e) => setMovie(e.target.value)}
                className="p-3 flex w-full rounded-l-md  bg-gray-600 text-white"
                type="text"
                placeholder="Enter Movie Name"
              />
              <input
                onChange={(e) => setTheater(e.target.value)}
                className="p-3 flex w-full rounded-r-md border-l border-gray-800 bg-gray-600 text-white"
                type="text"
                placeholder="Enter Movie Theater"
              />
            </div>
            <p className="mt-8 mb-3 text-gray-300">
              Choose Ticket Booking Date(s)
            </p>
            <div className="mb-5">
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
            <button className="bg-[#00df9a] text-black rounded-md font-medium w-[200px] m-4 p-3">
              Enable Ticket Sense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;
