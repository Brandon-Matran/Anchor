import { useState } from "react";
import React from "react";
// import { useAuthContext } from "../accounts/Authentication";


function CreateJobsForm() {
  // const { token } = useAuthContext();
  const [title, setTitle] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [job_position, setJobPosition] = useState("");
  const [apply_url, setApplyUrl] = useState("");
  const [deadline, setDeadline] = useState("");
  const created = new Date().toLocaleString() + "";
  const [submitted, setSubmitted] = useState(false);


  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleCompanyNameChange = (event) => {
    const value = event.target.value;
    setCompanyName(value);
  };

  const handleJobPositionChange = (event) => {
    const value = event.target.value;
    setJobPosition(value);
  };

  const handleApplyUrlChange = (event) => {
    const value = event.target.value;
    setApplyUrl(value);
  };

  const handleDeadlineChange = (event) => {
    const value = event.target.value;
    setDeadline(value);
  };

  const handleCreatedChange = (event) => {
    const value = event.target.value;
    created(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newJob = {
      title: title,
      company_name: company_name,
      job_position: job_position,
      apply_url: apply_url,
      deadline: deadline,
      created: created,
    };

    const jobsListingURL = "${REACT_APP_LISTING_SERVICE}/listings";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(newJob),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(jobsListingURL, fetchConfig)
      .then((response) => response.json())
      .then(() => {
        setTitle("");
        setCompanyName("");
        setJobPosition("");
        setApplyUrl("");
        setDeadline("");
        setSubmitted(true);
      })
      .catch((e) => console.error("ERROR: ", e));
  };

  let messageClasses = "alert alert-success d-none mb-0";
  if (submitted === true) {
    messageClasses = "alert alert-success mb-0";
  }


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create Job Listing</h1>
          <form onSubmit={handleSubmit} id="create-job-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleTitleChange}
                placeholder="Title"
                required
                type="text"
                name="title"
                id="name"
                className="form-control"
                value={title}
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleCompanyNameChange}
                placeholder="Company Name"
                required
                type="text"
                name="company_name"
                id="company_name"
                className="form-control"
                value={company_name}
              />
              <label htmlFor="company_name">Company Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleJobPositionChange}
                placeholder="Job Position"
                required
                type="text"
                name="job_position"
                id="job_position"
                className="form-control"
                value={job_position}
              />
              <label htmlFor="job_position">Job Position</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleApplyUrlChange}
                placeholder="Apply Url"
                required
                type="text"
                name="apply_url"
                id="apply_url"
                className="form-control"
                value={apply_url}
              />
              <label htmlFor="apply_url">Apply Url</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleDeadlineChange}
                placeholder="Deadline"
                required
                type="date"
                name="deadline"
                id="deadline"
                className="form-control"
                value={deadline}
              />
              <label htmlFor="deadline">Deadline</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleCreatedChange}
                placeholder="Created"
                required
                type="date"
                name="created"
                id="created"
                className="form-control"
                value={created}
              />
              <label htmlFor="created">Created</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Post Job
            </button>
          </form>
        </div>
        <br />
        <div className={messageClasses} id="success-message">
          Success! New Job Added!
        </div>
      </div>
    </div>
  );
}

export default CreateJobsForm
