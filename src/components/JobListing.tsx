import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

type Job = {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
};

function JobListing() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from<"jobs", "*">("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching jobs:", error);
    else {
      console.log("Fetched jobs:", data);
      setJobs(data || []);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Job Listings</h1>
      <div className="overflow-x-auto border border-indigo-400 rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase">
                Company
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase">
                Salary
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-indigo-200">
            {jobs
              .filter((job) => job && job.title.trim() !== "") // Only jobs with non-empty title
              .map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-indigo-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-indigo-900 font-medium">
                    {job.title}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-indigo-800 text-left">
                    {job.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-indigo-900">
                    {job.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-indigo-900">
                    {job.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-indigo-900">
                    {job.salary}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default JobListing;
