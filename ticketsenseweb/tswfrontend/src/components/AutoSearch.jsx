import { Autocomplete } from "@mantine/core";
import React, { useContext, useEffect } from "react";
import { Movie } from "tabler-icons-react";
import AuthContext from "../context/AuthContext";
import dayjs from "dayjs";
import axios from "axios";

const AutoSearch = () => {
  let { movie, setMovie, moviedata, setMoviedata } = useContext(AuthContext);

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    if (movie.length > 1) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${movie}&page=1&include_adult=false`
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

  return (
    <>
      <Autocomplete
        className="w-full px-2 m-2 sm:w-2/3"
        placeholder="Movie Name"
        required
        limit={8}
        size="md"
        icon={<Movie size={16} />}
        value={movie}
        onChange={setMovie}
        data={moviedata}
      />
    </>
  );
};

export default AutoSearch;
