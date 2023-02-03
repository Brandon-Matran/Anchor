import { useEffect , useState} from "react";
import { useAuthContext } from "../accounts/Authentication"
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';


function MyJobs() {
  const [jobs, setListings] = useState([], [], []);
  const [username, setUserName] = useState('')
  const navigate = useNavigate()
  const { token } = useAuthContext();

  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
    setUserName(info.account.username);
}

async function getJob() {
    const url = `${process.env.REACT_APP_LISTING_SERVICE}/listings`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const rev_sorted_data = data.reverse();
            const filteredData = rev_sorted_data?.filter(fD => fD.username == username)
            const listings = [[], [], []];
            let i = 0;
            for (const listing of filteredData) {
              listings[i].push(listing);
                i++;
                if (i > 2) {
                    i = 0;
                }
              } setListings(listings);
    }
  };

  useEffect(() => {
    if (token) {
      parseJwt(token);
    }
    getJob()
}, [token, username]);


function deleteListing(id) {
    const url = `${process.env.REACT_APP_LISTING_SERVICE}/listings/${id}`;
    const fetchConfig = {
      method: "delete",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    };
    fetch(url, fetchConfig)
    .then((response) => {
        if (!response.ok) {
            throw new Error ("Something went wrong!")
          }
          getJob()
    })
    .catch((err) => {
    })
  };


  function JobsColumn(props) {
    return (
      <div className="col">
        {props.list.map((data, index) => {
          return (
              <div key={index} className="card mb-3 shadow">
                <div className="card-body">
                  <h5 className="card-title">
                    Job Title: {data.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Company: {data.company_name}
                  </h6>
                  <p className="card-subtitle mb-2 text-muted">
                    Deadline: {data.deadline}
                  </p>
                  <button type="button" className="btn btn-danger" onClick={() => deleteListing(data.id)}>Delete Listing</button>
                  <button className="btn btn-warning" onClick={() => navigate(`/listings/update/${data.id}`)}>Update</button>
                </div>
              </div>
          );
        })}
      </div>
    );
}

  return (
    <div style={{height: "100vh"}}>
        <div className="px-4 py-5 my-5 mt-0 text-center">
            <h1 className="display-5 fw-bold mb-4">My Listings</h1>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <Link to="/listings/create" className="btn btn-success btn-lg px-4 gap-3">Post a New Job Listing</Link>
            </div>
        </div>
        <div className="container">
        <h2 className="mb-5">Job Listings</h2>
        <div className="row">
            {jobs.map((job, index) => {
                return (
                    <JobsColumn key={index} list={job} />
                );
            })}
        </div>
      </div>
    </div>
);

}
export default MyJobs;
