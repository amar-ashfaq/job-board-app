import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import App from "../App.tsx";
import JobListing from "./JobListing";
import JobForm from "./JobForm.tsx";
import JobDetails from "./JobDetails.tsx";

function Navigation() {
  return (
    <Router>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/listings"}>Job Listings</Link>
        <Link to={"/create-listing"}>Create job listing</Link>
      </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/listings" element={<JobListing />} />
        <Route path="/create-listing" element={<JobForm />} />
        <Route path="/listings/:id" element={<JobDetails />} />
      </Routes>
    </Router>
  );
}
export default Navigation;
