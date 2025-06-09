import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import DeleteJob from "./DeleteJob";

type JobDetailsProps = {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
};

function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [jobDetails, setJobDetails] = useState<JobDetailsProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    //delete operation happens here
    const { error } = await supabase.from("jobs").delete().eq("id", id);

    if (error) {
      console.error("Error deleting job:", error);
    } else {
      console.log("Job deleted successfully");
      setIsModalOpen(false);
      navigate("/listings", { state: { deleted: true } }); // redirect to listings page
    }
  };

  const editJobDetails = () => {
    navigate(`/listings/${id}/editDetails`);
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
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {jobDetails.description}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Loading job details...</p>
      )}

      <div className="flex justify-center space-x-4 mt-8">
        {/* Add margin-top to separate the delete button from above content */}

        <button
          type="submit"
          className="w-32 bg-indigo-600 text-white font-semibold px-6 py-3 rounded hover:bg-indigo-700 transition-colors cursor-pointer"
          onClick={editJobDetails}
        >
          Edit Job
        </button>

        {/* Add margin-top to separate the delete button from above content */}

        <button
          type="submit"
          className="w-32 bg-red-600 text-white font-semibold px-6 py-3 rounded hover:bg-red-700 transition-colors cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Delete Job
        </button>
      </div>

      {/* Add margin-top to the modal */}
      <div className="mt-4">
        <DeleteJob isOpen={isModalOpen}>
          <h3 className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this job?
          </h3>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 cursor-pointer"
            >
              Delete
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </DeleteJob>
      </div>
    </div>
  );
}

export default JobDetails;
