import React, { useState, useEffect } from "react";

const JobListings = () => {
  const [jobs, setJob] = useState([]);



  const getJob = async () => {
    const url = `${process.env.REACT_APP_LISTING_SERVICE}/listings`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setJob(data);
    }
  };

  // const DeleteJobListing = async (title) => {
  //   const url = `http://localhost:8080/${title}`;
  //   const fetchConfig = { method: "delete" };
  //   const response = await fetch(url, fetchConfig);
  //   if (response.ok) {
  //     getJob();
  //   }
  // };

  const ApplyToJobListing = async (id) => {
    const url = `http://localhost:8080/${jobs.apply_url}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify({ applied: true }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      getJob(url);
    }
  };

  useEffect(() => {
    getJob();
  }, []);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Company Name</th>
            <th scope="col">Job Position</th>
            <th scope="col">Deadline</th>
            <th scope="col">Created Date</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => {
            // if (####IDK  job.UserAuthorized == true) {
            //   return (
            //   <tr key={job.title}>
            //     <td>{job.title}</td>
            //     <td>{job.company_name}</td>
            //     <td>{job.job_position}</td>
            //     <td><button type="button" className="btn btn-danger" onClick={() => DeleteJobListing(job.title)}>Delete Listing</button></td>
            //     <td>{job.deadline}</td>
            //     <td>{job.created}</td>
            //   </tr>
            // );
            // } else if (job.UserAuthorized == ###) {
            //   ###
            // }

            return (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company_name}</td>
                <td>{job.job_position}</td>
                <td>{job.deadline}</td>
                <td>{job.created}</td>
                <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => ApplyToJobListing(job.apply_url)}>Apply
                </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default JobListings;
