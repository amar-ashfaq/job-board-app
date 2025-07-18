import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate, useParams } from "react-router-dom";

type Job = {
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
};

function EditJob() {
  const [job, setJobDetails] = useState<Job>({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });

  const { id } = useParams<{ id: string }>();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase
      .from("jobs")
      .update({
        title: job.title.trim(),
        description: job.description.trim(),
        company: job.company.trim(),
        location: job.location.trim(),
        salary: job.salary.trim(),
      })
      .eq("id", id);

    if (error) {
      console.error("Error inserting record:", error);
    } else {
      console.log("Record inserted successfully!");
      navigate("/listings", { state: { updated: true } }); // redirect to listings page
    }
  };

  const handleInputChange =
    (key: keyof Job) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setJobDetails((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
        Edit Job Listing
      </h2>

      <div>
        <label
          className="block mb-1 font-medium text-gray-700 text-left"
          htmlFor="title"
        >
          Job Title
        </label>
        <input
          id="title"
          type="text"
          value={job.title}
          onChange={handleInputChange("title")}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter job title"
          required
        />
      </div>

      <div>
        <label
          className="block mb-1 font-medium text-gray-700 text-left"
          htmlFor="description"
        >
          Job Description
        </label>
        <textarea
          id="description"
          value={job.description}
          onChange={handleInputChange("description")}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          placeholder="Describe the job role"
          rows={4}
          required
        />
      </div>

      <div>
        <label
          className="block mb-1 font-medium text-gray-700 text-left"
          htmlFor="company"
        >
          Company Name
        </label>
        <input
          id="company"
          type="text"
          value={job.company}
          onChange={handleInputChange("company")}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter company name"
          required
        />
      </div>

      <div>
        <label
          className="block mb-1 font-medium text-gray-700 text-left"
          htmlFor="location"
        >
          Job Location
        </label>
        <input
          id="location"
          type="text"
          value={job.location}
          onChange={handleInputChange("location")}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter job location"
          required
        />
      </div>

      <div>
        <label
          className="block mb-1 font-medium text-gray-700 text-left"
          htmlFor="salary"
        >
          Salary
        </label>
        <input
          id="salary"
          type="text"
          value={job.salary}
          onChange={handleInputChange("salary")}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter salary"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition-colors cursor-pointer"
      >
        Update
      </button>
    </form>
  );
}
export default EditJob;
