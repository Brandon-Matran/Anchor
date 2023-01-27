import React, { useEffect, useState } from "react";
import { useAuthContext } from "../accounts/Authentication.js";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function UpdateListing() {
  const { id } = useParams()
  const [username, setUserName] = useState('')
  const [title, setTitle] = useState('');
  const [company_name, setName] = useState('');
  const [job_position, setPosition] = useState('');
  const [apply_url, setUrl] = useState('');
  const [deadline, setDead] = useState('');
  const [created, setCreated] = useState('');
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const { token } = useAuthContext();

  useEffect(() => {
    async function getListings(id) {
      const url = `${process.env.REACT_APP_LISTING_SERVICE}/listings/${id}`;
      try {
        const response = await fetch(url, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserName(data.username);
          setTitle(data.title);
          setName(data.company_name);
          setPosition(data.job_position);
          setUrl(data.apply_url);
          setDead(data.deadline);
          setCreated(data.created)
        }
      } catch (e) {}
    }
    getListings(id);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
    const updatedListings = {
      "username": username,
      "title": title,
      "company_name": company_name,
      "job_position": job_position,
      "apply_url": apply_url,
      "deadline": deadline,
      "created": created
  }

  const listingsURL = `${process.env.REACT_APP_LISTING_SERVICE}/listings/${id}`;
  const fetchConfig = {
      method: "put",
      body: JSON.stringify(updatedListings),
      headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
      },
  }

  fetch(listingsURL, fetchConfig)
      .then(response => response.json())
      .then(() => {
          setTitle('')
          setName('')
          setPosition('')
          setUrl('')
          setDead('')
          setSubmitted(true)
      })
      .then(navigate("/listings/mylistings"))
      .catch(e => console.error('ERROR: ', e))

  }

  let messageClasses = "alert alert-success d-none mb-0"
  if(submitted === true){
      messageClasses = "alert alert-success mb-0"
  }

  return (
    <section
      className="vh-100"
    >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black shadow p-4 mt-4">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Update Job Listings
                  </p>

                  <form onSubmit={handleSubmit} id="update-listings-form">
                    <div className="form-floating mb-3">
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        id="listingsTitle"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="title">Title</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        value={company_name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        id="companyName"
                        className="form-control"
                      ></input>
                      <label className="form-label" htmlFor="companyName">Company Name</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        value={job_position}
                        onChange={(e) => setPosition(e.target.value)}
                        type="text"
                        id="companyName"
                        className="form-control"
                      ></input>
                      <label className="form-label" htmlFor="jobPosition">Job Position</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        value={apply_url}
                        onChange={(e) => setUrl(e.target.value)}
                        type="url"
                        id="applyURL"
                        className="form-control"
                      ></input>
                      <label className="form-label" htmlFor="applyURL">Application URL</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        value={deadline}
                        onChange={(e) => setDead(e.target.value)}
                        type="date"
                        id="deadline"
                        className="form-control"
                      ></input>
                      <label className="form-label" htmlFor="deadline">Deadline</label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-outline-primary center"
                    >
                      Update Job Listing
                    </button>
                  </form>
                </div>
                <br />
                <div className={messageClasses} id="success-message">
                  Success! Job Listing Updated!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdateListing;
