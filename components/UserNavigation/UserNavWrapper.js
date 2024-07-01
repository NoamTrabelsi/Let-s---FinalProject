// components/UserNavigation/UserNavWrapper.js
import React from "react";
import { SocketProvider } from "../UserContext/SocketContext";
import UserNav from "./UserNav";

const UserNavWrapper = () => {
  return (
    <SocketProvider>
      <UserNav />
    </SocketProvider>
  );
};

export default UserNavWrapper;
