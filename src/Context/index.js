import React from "react";
import AppState from "./AppState";

export default ({ children }) => {
  return (
    <AppState>
        {children}
    </AppState>
  );
};
