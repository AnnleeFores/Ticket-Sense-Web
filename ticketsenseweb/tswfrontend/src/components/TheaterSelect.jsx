import { Select } from "@mantine/core";
import React, { useContext } from "react";
import { MasksTheater } from "tabler-icons-react";
import AuthContext from "../context/AuthContext";

const TheaterSelect = () => {
  let { theater, setTheater, theaterdata } = useContext(AuthContext);

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
