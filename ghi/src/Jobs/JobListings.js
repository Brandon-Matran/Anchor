import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useAuthContext } from "../accounts/Authentication"

const JobListings = () => {
  const [jobs, setJob] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const [Jwt, setJwt] = useState(null);
  const [userName, setUserName] = useState('')

  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
    setUserName(info.account.username);
}
  const getJob = async () => {
    const url = `${process.env.REACT_APP_LISTING_SERVICE}/listings`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setJob(data);
    }
  };

  async function getAccount() {
    const url = `${process.env.REACT_APP_ACCOUNT_SERVICE}/token`;
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      if (data?.account.user_type === "company") {
        return true
      }
      else{
        return false
      }
    }
  }

  useEffect(() => {
    getJob()
    {
      if (token) {
        parseJwt(token);
      }
    }
  }, [token]);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Company Name</th>
            <th scope="col">Job Position</th>
            <th scope="col">Apply</th>
            <th scope="col">Deadline</th>
            <th scope="col">Created Date</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => {
            if (getAccount === true){
              return (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company_name}</td>
                <td>{job.job_position}</td>
                <td>{job.deadline}</td>
                <td>{job.created}</td>
              </tr>
            );
            } else {
              return (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.company_name}</td>
                  <td>{job.job_position}</td>
                  <td>
                    <button onClick={() => { window.location.href = job.apply_url; } }
                        type="button"
                        className="btn btn-success"
                        >Apply
                    </button>
                  </td>
                  <td>{job.deadline}</td>
                  <td>{job.created}</td>
                  <td>
                  <button onClick={() => { window.location.href = job.apply_url; } }
                      type="button"
                      className="btn btn-success"
                      >Apply
                  </button>
                  </td>
                </tr>
              );
              }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default JobListings;
