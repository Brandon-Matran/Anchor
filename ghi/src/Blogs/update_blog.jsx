import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../accounts/Authentication.js";
import background_image from "../images/background_image.png";


function UpdateBlog() {
  const { token } = useAuthContext();
  const { id } = useParams();

  const [username, setUserName] = useState("");
  const [post_date, setDate] = useState("");

  const [title, setTitle] = useState("");
  const [pic_url, setPicURL] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()

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
      setTitle(data.title);
      setPicURL(data.pic_url);
      setDescription(data.description);
      setSubmitted(true);
      navigate("/blogs/myblogs")
    }
  }

  let messageClasses = "alert alert-success d-none mb-0";
  if (submitted === true) {
    messageClasses = "alert alert-success mb-0";
  }

  return (
    <section
      className="vh-100"
      style={{ backgroundImage: `url(${background_image})` }}
    >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Blog
                  </p>

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
                        id="exampleFormControlTextarea1"
                        rows="3"
                        style={{height: 300}}
                      ></textarea>
                      <label className="form-label">Description</label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-outline-primary center"
                    >
                      Finish the update
                    </button>
                  </form>
                </div>
                <br />
                <div className={messageClasses} id="success-message">
                  Success! Blog Updated!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdateBlog;
