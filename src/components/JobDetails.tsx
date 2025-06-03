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

    if (error) console.error("Error fetching jobs:", error);
    else {
      console.log("Fetched jobs:", data);
      setJobDetails(data);
    }
  };

  return (
    <div>
      <p>
        <span className="font-semibold">Title:</span> {jobDetails?.title}
      </p>
      <p>
        <span className="font-semibold">Company:</span> {jobDetails?.company}
      </p>
      <p>
        <span className="font-semibold">Location:</span> {jobDetails?.location}
      </p>
      <p>
        <span className="font-semibold">Salary:</span> {jobDetails?.salary}
      </p>
    </div>
  );
}
export default JobDetails;
