import { useEffect, useState } from "react";
import React from "react";
import { useAuthContext } from "../accounts/Authentication";

function BootstrapInputs(props) {
  const { id, labelText, onChange, placeholder, type, value } = props;

  return (
    <div className="form-floating mb-3">
      <label htmlFor={id}>{labelText}</label>
      <input
        onChange={onChange}
        placeholder={placeholder}
        required
        type={type}
        id={id}
        className="form-control"
        value={value}
      />
    </div>
  );
}

function CreateBlogsForm(props) {
  const { token } = useAuthContext();
  const [username, setUserName] = useState("");
  const post_date = new Date().toLocaleString() + "";
  const [title, setTitle] = useState("");
  const [pic_url, setPicURL] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = {
      username: username,
      post_date: post_date,
      title: title,
      pic_url: pic_url,
      description: description,
    };

        const blogURL = `${process.env.REACT_APP_BLOG_SERVICE}/blogs`
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(newBlog),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }

    fetch(blogURL, fetchConfig)
      .then((response) => response.json())
      .then(() => {
        setTitle("");
        setPicURL("");
        setDescription("");
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
          <h1>Create a New Blog</h1>
          <form onSubmit={handleSubmit} id="create-blog-form">
            <BootstrapInputs
              id="text"
              labelText="Title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write a Blog Title"
              type="text"
              value={title}
            />
            <BootstrapInputs
              id="text"
              labelText="Picture URL"
              onChange={(e) => setPicURL(e.target.value)}
              placeholder="Enter a Picture URL"
              type="text"
              value={pic_url}
            />
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                id="description"
                rows="3"
                value={description}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
        <br />
        <div className={messageClasses} id="success-message">
          Success! New Blog Posted!
        </div>
      </div>
    </div>
  );
}

export default CreateBlogsForm;
