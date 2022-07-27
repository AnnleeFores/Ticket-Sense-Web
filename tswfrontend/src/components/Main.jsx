import React from "react";
import { useState, useEffect } from "react";
import { DatePicker } from "@mantine/dates";
import { SegmentedControl, Autocomplete, Select } from "@mantine/core";
import dayjs from "dayjs";
import { Calendar, Location, MasksTheater, Movie } from "tabler-icons-react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from "axios";
import jsonp from "jsonp";

dayjs.extend(customParseFormat);

const Main = ({ childToParent }) => {
  const [site, setSite] = useState("bms");
  const [movie, setMovie] = useState("");
  const [moviedata, setMoviedata] = useState([]);
  const [value, onChange] = useState(new Date());

  const [location, setLocation] = useState(
    '{ "name": " ", "location_code": " " }'
  );
  const [locdata, setLocdata] = useState([]);
  const [theater, setTheater] = useState(
    `{ "name": " ", "theatre_code": " " }`
  );
  const [theaterdata, setTheaterdata] = useState([]);

  // convert output from calendar to date format
  const dateFormat = dayjs(value).format("YYYY-MM-DD");

  useEffect(() => {
    setLocation('{ "name": " ", "location_code": " " }');
    setTheater(`{ "name": " ", "theatre_code": " " }`);
    setTheaterdata([]);
    if (site === "bms") {
      bms_sense();
    } else {
      tk_sense();
    }
  }, [site]);

  useEffect(() => {
    if (movie.length > 1) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=00e6af3c5f4640d75b94527d05ec7098&language=en-US&query=${movie}&page=1&include_adult=false`
        )
        .then((response) => {
          const movietitle = response.data.results.map((item, id) => ({
            key: id,
            value: `${item?.title} (${dayjs(item?.release_date).format(
              "YYYY"
            )})`,
          }));

          setMoviedata(movietitle);
        });
    } else {
      setMoviedata([]);
    }
  }, [movie]);

  const bms_sense = async () => {
    axios
      .get(`https://in.bookmyshow.com/api/explore/v1/discover/regions`)
      .then((response) => {
        const location_data = response.data.BookMyShow.TopCities.map(
          (item, id) => ({
            key: `t-${id}`,
            label: item?.RegionName,
            value: `{"name": "${item?.RegionName}", "location_code": "${item?.RegionCode}"}`,
          })
        );
        response.data.BookMyShow.OtherCities.forEach((element, id) => {
          location_data.push({
            key: `o-${id}`,
            label: element?.RegionName,
            value: `{"name": "${element?.RegionName}", "location_code": "${element?.RegionCode}"}`,
          });
        });
        setLocdata(location_data);
      });
  };

  const tk_sense = async () => {
    // the tktnew api response is in jsonp format -> jsonp module used to extract infromation
    jsonp(
      `https://api.ticketnew.com/api?_api_access_key=b1ed36c7bdbe43c1a76d01a6b8ed9c46&_api_name=ticketnew.app.location.allCities&_api_timestamp=1658745104178&_api_version=1.0.0&request={"appDevice":1658745104178,"appVersion":"4.4.8","appPlatform":"H5","appEnv":"PROD","appChannel":"TICKETNEW"}&_api_signature=4ExixovOYhKwnTkuSm5v7p2uh/I=&_api_jsonp_callback=jsonp0`,
      { name: "jsonp0" },
      (error, data) => {
        if (error) {
          console.log(error);
        } else {
          const location_data = data.body.data.all.map((item, id) => ({
            key: `t-${id}`,
            label: item.name,
            value: `{"name": "${item.name}", "location_code": "${item.id}"}`,
          }));
          setLocdata(location_data);
        }
      }
    );
  };

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
      setTheaterdata([]);
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
      setTheaterdata([]);
    }
  };

  const log = async (e) => {
    e.preventDefault();
    childToParent(false);
    const loc = JSON.parse(location);
    const thea = JSON.parse(theater);

    axios
      .post(`api/trigger/`, {
        site: site,
        date: dateFormat,
        film: movie,
        location: loc,
        theater: thea,
      })
      .then((response) => {
        childToParent(true);
      });

    setMovie("");
    setMoviedata([]);
    onChange(new Date());
    setLocation('{ "name": " ", "location_code": " " }');
    setTheater(`{ "name": " ", "theatre_code": " " }`);
    setTheaterdata([]);
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

            <SegmentedControl
              className="m-2"
              color="blue"
              value={site}
              onChange={setSite}
              data={[
                { label: "BookMyShow", value: "bms" },
                { label: "Ticket New", value: "tk" },
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
            // required
            searchable
            clearable
            allowDeselect
            size="md"
            icon={<MasksTheater size={16} />}
            value={theater}
            onChange={setTheater}
            data={theaterdata}
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
