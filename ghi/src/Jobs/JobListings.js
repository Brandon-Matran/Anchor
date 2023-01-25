import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useAuthContext } from "../accounts/Authentication"

const JobListings = () => {
  const [jobs, setJob] = useState([]);
  const navigate = useNavigate();
  const token = useAuthContext();
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
      console.log(data);
      setJob(data);
    }
    //   if (data?.account.user_type === "individual"){}
    // const navigate = useNavigate()
  };

  async function getAccount() {
    const url = `http://localhost:8100/token`;
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      if (data?.account.user_type === "company") {
        console.log(data?.account.user_type);
        console.log(true)
        return true
      }
      else{
        console.log(false)
        return false
      }
    }
  }
  console.log("ACCOUNT", getAccount())


  // const DeleteJobListing = async (id) => {

  //   const url = `${process.env.REACT_APP_LISTING_SERVICE}/${id}`;
  //   const fetchConfig = { 
  //     method: "delete",
  //     headers: {
  //       "Authorization": `Bearer ${Jwt}`,
  //       "Content-Type": "application/json"
  //     }
  //   };
  //   const response = await fetch(url, fetchConfig);
  //   if (response.ok) {
  //     getJob();
  //   }
  // };
 

  // const applyClick = async (apply_url) => {
    
  //   navigate(`${apply_url}`);
  // };



  // const ApplyToJobListing = async (apply_url) => {
  //   const url = `${apply.url}`;
  //   // const fetchConfig = {
  //   //   method: "put",
  //   //   body: JSON.stringify({ applied: true }),
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   // };
  //   // const response = await fetch(url, fetchConfig);
  //   const response = await fetch(url, apply_url);
  //   if (response.ok) {
  //     // getJob(url);
  //     window.location.href = url;
  //   }
  // };

  useEffect(() => {
    getJob();
    fetch(token)
    .then(response => {if ((typeof response.token) !== "object") {
        setJwt(token.token);
        if (Jwt !== null) {
            parseJwt(Jwt);
        }
    }})
  }, [token, Jwt, userName]);
    console.log(Jwt, "GHJFGHFFGHJFHGHJHJFGHFGJJGH")

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
            <th scope="col"> Button </th>
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
                {/* <td>
                  <button type="button" className="btn btn-danger" onClick={() => DeleteJobListing(job.id)}>Delete Listing</button>
                </td> */}
              </tr>
            );
            } else {
              return (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.company_name}</td>
                  <td>{job.job_position}</td>
                  <td>{job.deadline}</td>
                  <td>{job.created}</td>

                  <td>
                  <button onClick={() => { window.location.href = job.apply_url; } }
                      type="button"
                      className="btn btn-success"
                      >Apply
                  </button>

                    {/* <button
                    
                      onClick={() =>  <Link to={{ pathname: `${job.apply_url}` }} target="_blank"> </Link>}
                      type="button"
                      className="btn btn-success"
                    >Apply
                    </button> */}
                  </td>
                </tr>
              );
              }
  

            // return (
            //   <tr key={job.id}>
            //     <td>{job.title}</td>
            //     <td>{job.company_name}</td>
            //     <td>{job.job_position}</td>
            //     <td>{job.apply_url}</td>
            //     <td>{job.deadline}</td>
            //     <td>{job.created}</td>
            //     <td>
            //       <button
            //         onClick={() => applyClick()}
            //         type="button"
            //         className="btn btn-danger"
            //       >Apply
            //       </button>
            //     </td>


            //     {/* <td>
            //       <button
            //         type="button"
            //         className="btn btn-danger"
            //         onClick={() => useNavigate(jobs.apply_url)}
            //       >
            //         Apply
            //       </button>
            //     </td> */}

            


            //     {/* <td>
            //       <button
            //         type="button"
            //         className="btn btn-danger"
            //         onClick={() => { window.location.href = `http://localhost:8080/listings${job.apply_url}` }}
            //       >Apply
            //       </button>
            //     </td> */}

            //   </tr>
            // );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default JobListings;

//  <button
//    type="button"
//    className="btn btn-danger"
//    onClick={() => ApplyToJobListing(job.apply_url)}
//    to={{
//      pathname: `http://localhost:8080/listings${jobs.apply_url}`,
//    }}
//  >
//    Apply
//  </button>;


{/* <td>
<button
  type="button"
  className="btn btn-danger"
  onClick={() => ApplyToJobListing(job.apply_url)}
  >Apply
</button>
</td> */}