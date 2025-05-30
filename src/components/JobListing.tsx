import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

type Job = {
  id: string;
  title: string;
  company: string;
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
    <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.title} at {job.company}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default JobListing;
