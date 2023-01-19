import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../accounts/Authentication.js";
// import parseJwt from "../decode.jsx";

function UpdateBlog() {
  const { token } = useAuthContext();
  //   const info = parseJwt(token);
  const { id } = useParams();

  const [username, setUserName] = useState("");
  const [post_date, setDate] = useState("");
  // const new_post_date = new Date().toLocaleString() + "";
  const [title, setTitle] = useState("");
  const [pic_url, setPicURL] = useState("");
  const [description, setDescription] = useState("");
  // const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function getBlog(id) {
      const url = `${process.env.REACT_APP_BLOG_SERVICE}/blogs/${id}`;
      try {
        const response = await fetch(url, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserName(data.username);
          setDate(data.post_date);
          setTitle(data.title);
          setPicURL(data.pic_url);
          setDescription(data.description);
          console.log(title);
        }
      } catch (e) {}
    }
    getBlog(id);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const newBlog = {
      username: username,
      post_date: post_date,
      title: title,
      pic_url: pic_url,
      description: description,
    };
    console.log(newBlog);
    const url = `${process.env.REACT_APP_BLOG_SERVICE}/blogs/${id}`;

    const fetchConfig = {
      method: "put",
      body: JSON.stringify(newBlog),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(url, fetchConfig);
    if (res.ok) {
      const data = await res.json();
      // setUserName(data.username);
      // // setDate(data.post_date);
      setTitle(data.title);
      setPicURL(data.pic_url);
      setDescription(data.description);
    }
  }
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <form onSubmit={handleSubmit} id="update-blog-form">
            <div className="form-floating mb-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="form6Example1"
                className="form-control"
              />
              <label className="form-label">Title</label>
            </div>

            <div className="form-floating mb-3">
              <input
                value={pic_url}
                onChange={(e) => setPicURL(e.target.value)}
                className="form-control"
              ></input>
              <label className="form-label">Picture</label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              ></textarea>
              <label className="form-label">Description</label>
            </div>

            <button type="submit" className="btn btn-primary">
              Finish the update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBlog;
