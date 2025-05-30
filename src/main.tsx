import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import JobListing from "./components/JobListing.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <JobListing />
  </StrictMode>
);
