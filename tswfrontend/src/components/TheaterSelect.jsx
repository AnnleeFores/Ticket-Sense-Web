import { Select } from "@mantine/core";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { MasksTheater } from "tabler-icons-react";
import AuthContext from "../context/AuthContext";

const TheaterSelect = () => {
  let { theater, setTheater, theaterdata, setTheaterdata, location, site } =
    useContext(AuthContext);

  useEffect(() => {
    if (site === "bms") {
      bms_theatre();
    } else {
      tktnew_theatre();
    }
  }, [location]);

  const bms_theatre = async () => {
    try {
      const loc = JSON.parse(location).location_code;
      if (loc.length > 1) {
        axios.get(`api/bms/${loc}/`).then((response) => {
          const theatre_data = response.data.BookMyShow.arrVenue.map(
            (item, id) => ({
              key: `T-${id}`,
              label: item.VenueName,
              value: `{ "name": "${item.VenueName}", "theater_code": "${item.VenueCode}" }`,
            })
          );
          setTheaterdata(theatre_data);
        });
      }
    } catch (err) {
      setTheaterdata([{ value: "", label: "" }]);
    }
  };
  const tktnew_theatre = async () => {
    try {
      const loc = JSON.parse(location).name;
      if (loc.length > 1) {
        axios.get(`api/tktnew/${loc}/`).then((response) => {
          if (!response.data.error) {
            const theatre_data = response.data.data.map((item, id) => ({
              key: `T-${id}`,
              label: item.value,
              value: `{ "name": "${item.value}", "link": "${item.bookinglink}" }`,
            }));
            setTheaterdata(theatre_data);
          } else {
            console.log(response.data.error);
          }
        });
      }
    } catch (err) {
      setTheaterdata([{ value: "", label: "" }]);
    }
  };

  return (
    <>
      <Select
        className="w-full px-2 m-2 sm:w-2/3"
        placeholder="Movie Theater"
        required
        searchable
        clearable
        allowDeselect
        size="md"
        icon={<MasksTheater size={16} />}
        value={theater}
        onChange={setTheater}
        data={theaterdata}
      />
    </>
  );
};

export default TheaterSelect;
