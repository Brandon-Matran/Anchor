import { useEffect , useState} from "react";
import { useAuthContext } from "../accounts/Authentication"
import React from 'react';
// import { Link } from 'react-router-dom';


function MyJobs(props) {
  const [jobs, setJobs] = useState([], [], []);
  const [job, setJob] = useState([]);
  const [username, setUserName] = useState('')
  const [Jwt, setJwt] = useState(null);

  const token = useAuthContext();



  const getJob = async () => {
    const url = `${process.env.REACT_APP_LISTING_SERVICE}/listings`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setJob(data);
      window.location.reload(false)
    }
  };

  const DeleteJobListing = async (id) => {

    const url = `${process.env.REACT_APP_LISTING_SERVICE}/listings/${id}`;
    const fetchConfig = {
      method: "delete",
      headers: {
        "Authorization": `Bearer ${Jwt}`,
        "Content-Type": "application/json"
      }
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      getJob();
      const data = await response.json()
    }
  };

  function parseJwt(data) {
      const base64Url = data.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const info = JSON.parse(window.atob(base64));
      setUserName(info.account.username);
  }

  function JobsColumn(props) {
    return (
      <div className="col">
        {props.list.map((data, index) => {
          return (
            // <Link to={`/listings/${data.id}`} key={index} className="text-decoration-none text-reset" >
              <div key={index} className="card mb-3 shadow">
                <div className="card-body">
                  <h5 className="card-title">
                    Job Title: {data.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Company: {data.company_name}
                  </h6>
                  <h7 className="card-subtitle mb-2 text-muted">
                    Deadline: {data.deadline}
                  </h7>
                  <p className="card-text">
                    Posted date: {data.created}
                  </p>

                  <button type="button" className="btn btn-danger" onClick={() => DeleteJobListing(data.id)}>Delete Listing</button>

                </div>
              </div>
            // </Link>
          );
        })}
      </div>
    );
}


  useEffect(() => {
        const url = `${process.env.REACT_APP_LISTING_SERVICE}/listings`;
        fetch(token)
        .then(response => {if ((typeof response.token) !== "object") {
            setJwt(token.token);
            if (Jwt !== null) {
                parseJwt(Jwt);
            }
        }})
        async function fetchData() {
          const response = await fetch(url);
          if (response.ok) {
              const data = await response.json();
              const rev_sorted_data = data.reverse();
              const filteredData = rev_sorted_data?.filter(fD => fD.username == username)
              const blogs = [[], [], []];

              let i = 0;
              for (const job of filteredData) {
                  blogs[i].push(job);
                  i++;
                  if (i > 2) {
                      i = 0;
                  }
                  setJobs(blogs);
              }
          }
      }
      fetchData();
  }, [token, Jwt, username])




  return (
    <>
        <div className="px-4 py-5 my-5 mt-0 text-center bg-white">
            <h1 className="display-5 fw-bold">My Listings</h1>
        </div>
        <div className="container">
        <h2>Job Listings</h2>
        <div className="row">
            {jobs.map((job, index) => {
                return (
                    <JobsColumn key={index} list={job} />

                );

            })}

        </div>
        </div>
    </>
);

}
export default MyJobs;
