import { useState } from "react";
import { supabase } from "../supabaseClient";

type Job = {
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
};

function JobForm() {
  // new job will be created here

  const [job, setJob] = useState<Job>({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    // insert record to the supabase db - replace with object properties
    const { error } = await supabase.from("jobs").insert({
      title: job.title,
      description: job.description,
      company: job.company,
      location: job.location,
      salary: job.salary,
    });

    if (error) {
      console.error("Error inserting record:", error);
    } else {
      console.log("Record inserted successfully!");

      setJob({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
      });
    }
  };

  const handleInputChange =
    (key: keyof Job) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setJob((previousState) => ({ ...previousState, [key]: value }));
    };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Job title
        <input
          type="text"
          value={job.title}
          onChange={handleInputChange("title")}
        />
      </label>
      <label>
        Job description
        <input
          type="text"
          value={job.description}
          onChange={handleInputChange("description")}
        />
      </label>
      <label>
        Company name
        <input
          type="text"
          value={job.company}
          onChange={handleInputChange("company")}
        />
      </label>
      <label>
        Job location
        <input
          type="text"
          value={job.location}
          onChange={handleInputChange("location")}
        />
      </label>
      <label>
        Salary
        <input
          type="text"
          value={job.salary}
          onChange={handleInputChange("salary")}
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
}
export default JobForm;
