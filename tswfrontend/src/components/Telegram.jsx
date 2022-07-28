import React from "react";
import TelegramLoginButton from "react-telegram-login";
import axios from "axios";

const Telegram = () => {
  const handleTelegramResponse = (response) => {
    axios
      .post(`api/verifyuser/`, {
        id: 378882317,
        first_name: "Annlee",
        last_name: "Fores",
        username: "annleefores",
        auth_date: 1659037084,
        hash: "ab620a7133e2c5ac4895f48dfc64be22593e832907464e277088678ee69b03fe",
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="flex justify-center">
      <TelegramLoginButton
        dataOnauth={handleTelegramResponse}
        botName="ticketsense_bot"
        usePic="false"
        cornerRadius="5"
      />
    </div>
  );
};

export default Telegram;
