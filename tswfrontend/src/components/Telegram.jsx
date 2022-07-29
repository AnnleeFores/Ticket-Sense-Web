import React from "react";
import TelegramLoginButton from "react-telegram-login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Telegram = () => {
  const navigate = useNavigate();

  const handleTelegramResponse = (response) => {
    axios.post(`api/verifyuser/`, response).then((response) => {
      if (response.data.authenticated === true) {
        navigate("/home");
      } else {
        console.log({ error: "authentication invalid" });
      }
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
