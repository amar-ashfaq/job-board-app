import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navigation from "./components/Navigation.tsx";
import { UserProvider } from "./components/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <Navigation />
    </UserProvider>
  </StrictMode>
);
