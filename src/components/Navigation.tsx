import { Route, Routes, Link, useNavigate } from "react-router-dom";
import App from "../App.tsx";
import JobListing from "./jobs/JobListing.tsx";
import JobForm from "./jobs/JobForm.tsx";
import JobDetails from "./jobs/JobDetails.tsx";
import EditJob from "./jobs/EditJob.tsx";
import Dashboard from "./dashboard/Dashboard.tsx";
import Login from "./auth/Login.tsx";
import Signup from "./auth/Signup.tsx";
import { useUser } from "./UserContext.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

function Navigation() {
  const { user, logout } = useUser(); // make sure logout is exposed
  const navigate = useNavigate();

  return (
    <>
      {/* Fixed full-width nav bar at the top */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-900 p-4 shadow-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left side links */}
          <div className="flex space-x-8">
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

          {/* Right side links */}
          <div className="flex space-x-6">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white font-semibold hover:text-indigo-300 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="text-white font-semibold hover:text-red-300 transition-colors duration-200 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-white font-semibold hover:text-indigo-300 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Add padding-top to avoid content hidden under fixed nav */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/listings" element={<JobListing />} />
          <Route path="/create-listing" element={<JobForm />} />
          <Route path="/listings/:id" element={<JobDetails />} />
          <Route path="/listings/:id/editDetails" element={<EditJob />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}
export default Navigation;
