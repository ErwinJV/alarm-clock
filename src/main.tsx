import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { GlobalStyles, StyledEngineProvider } from "@mui/material";

import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <App />
    </StyledEngineProvider>
  </StrictMode>,
);
