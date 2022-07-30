import { Select } from "@mantine/core";
import React, { useContext } from "react";
import { Location } from "tabler-icons-react";
import AuthContext from "../context/AuthContext";

const LocationSelect = () => {
  let { location, setLocation, locdata } = useContext(AuthContext);
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
    </>
  );
};

export default LocationSelect;
