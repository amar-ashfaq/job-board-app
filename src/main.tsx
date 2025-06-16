import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navigation from "./components/Navigation.tsx";
import { UserProvider } from "./components/UserContext.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Navigation />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
