import React, { useContext } from "react";
import TelegramLoginButton from "react-telegram-login";
import AuthContext from "../context/AuthContext";

const Telegram = () => {
  const { loginUser } = useContext(AuthContext);

  const handleTelegramResponse = (response) => {
    loginUser(response);
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
