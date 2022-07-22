import React from "react";
import { useState, useEffect } from "react";
import { Select } from "@mantine/core";
import axios from "axios";
import { Location, MasksTheater } from "tabler-icons-react";

const Theatre = () => {
  const [location, setLocation] = useState("");
  const [locdata, setLocdata] = useState([]);

  const [theater, setTheater] = useState("");
  const [theaterdata, setTheaterdata] = useState([]);

  const bms_baseurl = "https://in.bookmyshow.com";

  useEffect(() => {
    axios
      .get(`${bms_baseurl}/api/explore/v1/discover/regions`)
      .then((response) => {
        const location_data = response.data.BookMyShow.TopCities.map(
          (item, id) => ({
            key: `t-${id}`,
            label: item.RegionName,
            value: item.RegionCode,
          })
        );
        response.data.BookMyShow.OtherCities.forEach((element, id) => {
          location_data.push({
            key: `o-${id}`,
            label: element.RegionName,
            value: element.RegionCode,
          });
        });
        setLocdata(location_data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${bms_baseurl}/pwa/api/de/venues?regionCode=${location}&eventType=MT`
      )

      .then((response) => {
        const theatre_data = response.data.BookMyShow.arrVenue.map(
          (item, id) => ({
            key: `T-${id}`,
            label: item.VenueName,
            value: `${item.VenueName}-${item.VenueCode} `,
          })
        );
        setTheaterdata(theatre_data);
      });
  }, [location]);

  return (
    <>
      <Select
        className="w-full px-2 m-2 sm:w-2/3"
        placeholder="Location"
        required
        searchable
        clearable
        allowDeselect
        size="md"
        icon={<Location size={16} />}
        value={location}
        onChange={setLocation}
        data={locdata}
      />
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

export default Theatre;
