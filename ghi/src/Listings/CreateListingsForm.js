import {useEffect, useState} from "react"
import React from "react";
import { useAuthContext } from "../accounts/Authentication";
import { useNavigate } from "react-router-dom";

function CreateJobsForm() {
  const navigate = useNavigate();
  const today = new Date()
  const { token } = useAuthContext();
  const [username, setUserName] = useState('')
  const [title, setTitle] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [job_position, setJobPosition] = useState("");
  const [apply_url, setApplyUrl] = useState("");
  const [deadline, setDeadline] = useState("");
  const created = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getDate()
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


  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
    setUserName(info.account.username);
}

useEffect(() => {
  {
    if (token) {
      parseJwt(token);
    }
  }
}, [token]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const newJob = {
      username: username,
      title: title,
      company_name: company_name,
      job_position: job_position,
      apply_url: apply_url,
      deadline: deadline,
      created: created,
    };

    const jobsListingURL = `${process.env.REACT_APP_LISTING_SERVICE}/listings`
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(newJob),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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
      .then(navigate("/listings/mylistings"))
      .catch((e) => console.error("ERROR: ", e));
  };

  let messageClasses = "alert alert-success d-none mb-0";
  if (submitted === true) {
    messageClasses = "alert alert-success mb-0";
  }


  return (
    <section
    className="vh-100"
  >
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black shadow p-4 mt-4">
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Create Job Listing
                </p>
                <form onSubmit={handleSubmit} id="create-listings-form">
                  <div className="form-floating mb-3">
                    <input
                      value={title}
                      required
                      onChange={handleTitleChange}
                      type="text"
                      id="title"
                      placeholder="Title"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="title">Title</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      value={company_name}
                      required
                      onChange={handleCompanyNameChange}
                      type="text"
                      id="company_name"
                      placeholder="Company Name"
                      className="form-control"
                    ></input>
                    <label className="form-label" htmlFor="company_name">Company Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      value={job_position}
                      required
                      onChange={handleJobPositionChange}
                      type="text"
                      id="job_position"
                      placeholder="Job Position"
                      className="form-control"
                    ></input>
                    <label className="form-label" htmlFor="jobPosition">Job Position</label>
                  </div>

                  <div className="form-floating mb-3">
                      <input
                        value={apply_url}
                        required
                        onChange={handleApplyUrlChange}
                        type="url"
                        id="application_url"
                        placeholder="Enter Application URL"
                        className="form-control"
                      ></input>
                      <label className="form-label" htmlFor="application_url">Application URL</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        value={deadline}
                        required
                        onChange={handleDeadlineChange}
                        type="date"
                        id="deadline"
                        placeholder="Deadline"
                        className="form-control"
                      ></input>
                      <label className="form-label" htmlFor="deadline">Deadline</label>
                    </div>

                  <button
                    type="submit"
                    className="btn btn-outline-primary center"
                  >
                    Post Job
                  </button>
                </form>
              </div>
              <br />
              <div className={messageClasses} id="success-message">
                Success! New Job Listed!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default CreateJobsForm
