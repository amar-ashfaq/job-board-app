import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import App from "../App.tsx";
import JobListing from "./JobListing";
import JobForm from "./JobForm.tsx";
import JobDetails from "./JobDetails.tsx";

function Navigation() {
  return (
    <Router>
      {/* Fixed full-width nav bar at the top */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-900 p-4 shadow-md z-50">
        <div className="max-w-7xl mx-auto flex space-x-8">
          <Link
            to="/"
            className="text-white font-semibold hover:text-indigo-300 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/listings"
            className="text-white font-semibold hover:text-indigo-300 transition-colors duration-200"
          >
            Job Listings
          </Link>
          <Link
            to="/create-listing"
            className="text-white font-semibold hover:text-indigo-300 transition-colors duration-200"
          >
            Create Job Listing
          </Link>
        </div>
      </nav>

      {/* Add padding-top to avoid content hidden under fixed nav */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/listings" element={<JobListing />} />
          <Route path="/create-listing" element={<JobForm />} />
          <Route path="/listings/:id" element={<JobDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
export default Navigation;
