import React from "react";
import Auth from "../components/_app/Auth";

const Account = () => {
  return (
    <div>this is a protected page and should only been seen if logged in.</div>
  );
};

export default Auth(Account);
