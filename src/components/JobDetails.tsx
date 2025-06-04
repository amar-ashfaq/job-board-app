import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

type JobDetailsProps = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
};

function JobDetails() {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState<JobDetailsProps | null>(null);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select()
      .eq("id", id)
      .single();

    if (error) console.error("Error fetching job:", error);
    else {
      console.log("Fetched job:", data);
      setJobDetails(data);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">Job Details</h1>
      {jobDetails ? (
        <div className="space-y-4 text-indigo-900">
          <p>
            <span className="font-semibold">Title:</span> {jobDetails.title}
          </p>
          <p>
            <span className="font-semibold">Company:</span> {jobDetails.company}
          </p>
          <p>
            <span className="font-semibold">Location:</span>{" "}
            {jobDetails.location}
          </p>
          <p>
            <span className="font-semibold">Salary:</span> {jobDetails.salary}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Loading job details...</p>
      )}
    </div>
  );
}

export default JobDetails;
