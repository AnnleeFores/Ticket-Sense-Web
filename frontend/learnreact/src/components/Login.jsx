import React from "react";
import TelegramLoginButton from "react-telegram-login";


const Login = () => {

    const handleTelegramResponse = (response) => {
        console.log(response);
      };


  return (
    <div className="flex justify-center">
        <TelegramLoginButton dataOnauth={handleTelegramResponse} botName="ticketsense_test_bot" usePic="false" cornerRadius="7"/>
    </div>
  )
}

export default Login
