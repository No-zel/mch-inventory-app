import React, { createContext, useReducer, useState } from "react";
import { initialUserState, userReducer } from "./user/reducer";

const UserContext = createContext();

function GlobalProvider({ children }) {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState); // USER DETAILS, TOKEN

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
}
export {
  GlobalProvider,
  UserContext,
};
