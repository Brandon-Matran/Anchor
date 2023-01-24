import React, { useEffect, useState } from "react";
import { useAuthContext } from "../accounts/Authentication.js";
import { useParams } from "react-router";

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
      .catch(e => console.error('ERROR: ', e))

  }

  let messageClasses = "alert alert-success d-none mb-0"
  if(submitted === true){
      messageClasses = "alert alert-success mb-0"
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Update Job Listings</h1>
          <form onSubmit={handleSubmit} id="update-jobListings-form">
            <div className="form-floating mb-3">
              <input onChange={e => setTitle(e.target.value)} placeholder="Title"
              type="text" name ="title" id="title"
              className="form-control" value={title}/>
              <label htmlFor="title">Title</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={e => setName(e.target.value)} placeholder="Company Name"
              type="text" name ="companyName" id="companyName"
              className="form-control" value={company_name}/>
              <label htmlFor="companyName">Company Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={e => setPosition(e.target.value)} placeholder="Job Position"
              type="text" name ="jobPosition" id="jobPosition"
              className="form-control" value={job_position}/>
              <label htmlFor="jobPosition">Job Position</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange = {e => setUrl(e.target.value)} placeholder="Enter an Application URL"
              type="url" name="applyURL"  id="applyURL"
              className="form-control" value={apply_url}/>
              <label htmlFor="applyURL">Application Url</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange = {e => setDead(e.target.value)} placeholder="Deadline"
              type="date" name="deadline"  id="deadline"
              className="form-control" value={deadline}/>
              <label htmlFor="deadline">Deadline</label>
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </div><br/>
        <div className={messageClasses} id="success-message">
          Success! Job Listing Updated!
        </div>
      </div>
    </div>
  );
}

export default UpdateListing;
