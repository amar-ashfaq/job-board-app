function JobForm() {
  // new job will be created here

  return (
    <form>
      <label>
        Job title
        <input type="text" />
      </label>
      <label>
        Job description
        <input type="text" />
      </label>
      <label>
        Company name
        <input type="text" />
      </label>
      <label>
        Job location
        <input type="text" />
      </label>
      <label>
        Salary
        <input type="text" />
      </label>
      <button type="submit">Create</button>
    </form>
  );
}
export default JobForm;
