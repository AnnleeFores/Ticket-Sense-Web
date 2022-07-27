import axios from "axios";
import React, { useEffect, useState } from "react";
import Row from "./Row";

const Listing = ({ parentToChild }) => {
  const [bms, setBms] = useState([]);
  const [tk, setTk] = useState([]);

  const getData = async () => {
    axios.get("api/trigger/").then((response) => {
      let bms = [];
      let tk = [];

      response.data.forEach((item, id) => {
        if (item.site === "bms") {
          bms.push(item);
        } else {
          tk.push(item);
        }
      });
      setBms(bms);
      setTk(tk);
    });
  };

  useEffect(() => {
    if (parentToChild === true) {
      getData();
    }
  }, [parentToChild]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-12 mb-6">
      <Row rowID="1" title="BookMyShow" trigger_data={bms} />
      <Row rowID="2" title="Ticket New" trigger_data={tk} />
    </div>
  );
};

export default Listing;
