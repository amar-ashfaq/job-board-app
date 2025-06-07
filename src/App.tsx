import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

function App() {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from("jobs").select("*");
      console.log("Test data:", data);
      console.log("Test error:", error);
    };

    testConnection();
  }, []);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)] overflow-hidden -mt-16">
      <div className="w-full max-w-3xl h-96 bg-indigo-700 rounded-lg p-1 flex items-center justify-center">
        {/* Inner content box */}
        <div className="w-full h-full bg-indigo-600 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
            Welcome to the Job Board
          </h1>
          <p className="max-w-xl text-center text-indigo-200 mb-8">
            Find your dream job or post new opportunities with ease. Explore
            listings, create job posts, and connect with top employers all in
            one place.
          </p>
          <div className="flex space-x-4">
            <a
              href="/listings"
              className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded shadow hover:bg-indigo-50 transition cursor-pointer"
            >
              Browse Jobs
            </a>
            <a
              href="/create-listing"
              className="px-6 py-3 border border-white font-semibold rounded hover:bg-white hover:text-indigo-700 transition cursor-pointer"
            >
              Post a Job
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
