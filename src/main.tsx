import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme.ts";
import { CalendarContextProvider } from "./context/CalendatContext/Provider.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CalendarContextProvider>
        <App />
      </CalendarContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
