import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../accounts/Authentication"


function GetOneBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);

  const [comments, setComment] = useState([]);
  const [username, setUserName] = useState('')
  let today = new Date()
  let post_date = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getDate()
  const [description, setDescription] = useState('')
  const blog_id = id

  const { token } = useAuthContext()
  const navigate = useNavigate()

  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
    setUserName(info.account.username);
  }

  async function fetchData() {
    const blogURL = `${process.env.REACT_APP_BLOG_SERVICE}/blogs/${id}`;
    const commentURL = `${process.env.REACT_APP_BLOG_SERVICE}/comments`;
    const URLs = [blogURL, commentURL]
    Promise.all(URLs.map( URL => fetch(URL)
      .then(response => response.json())
      ))
      .then((data) => {
        const rev_comment_data = data[1].reverse();
        const filteredData = rev_comment_data?.filter(fD => fD.blog_id == id)
        setBlog(data[0]);
        setComment(filteredData);
      })
      .catch(e => console.error('ERROR: ', e))

  }

  useEffect(()=> {
    if (token) {
      parseJwt(token);
    }
    fetchData()
  }, [token, username]);

  console.log(comments)

  async function handleSubmit(event) {
    if(!token) {
      navigate("/login")
    }
    else{
      event.preventDefault();
      const newComment = {
        username: username,
        post_date: post_date,
        description: description,
        blog_id: blog_id,
      };
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
      }
      const commentURL = `${process.env.REACT_APP_BLOG_SERVICE}/comments`

      const response = await fetch(commentURL, fetchConfig)
      // .then((response) => response.json())
      if (response.ok) {
        fetchData()
      }
    }
  };

  let logOutClasses = "btn btn-warning btn-lg px-4 gap-3";
  let logInClasses = "btn btn-warning btn-lg px-4 gap-3 d-none";
  if (token) {
    logInClasses = "btn btn-warning btn-lg px-4 gap-3";
    logOutClasses = "btn btn-warning btn-lg px-4 gap-3 d-none";
  }

  return (
      <div>
        {blog ? (
          <div>
            <div className="px-5 py-auto mx-5 text-center bg-white">
              <h1 className="display-5 fw-bold">{blog.title}</h1>
              <div className="d-flex justify-content-center">by {blog.username} | {blog.post_date}</div>
              <img src={blog.pic_url} className="card-img-top figure-img img-fluid mx-auto w-auto p-3" />
              <div className="align-middle">
                <p className="text-md-start">{blog.description}</p>
              </div>
              <div>
                <form onSubmit={handleSubmit} id="create-blog-form">
                    <div className="form-floating mb-3">
                      <textarea
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        type="text"
                        placeholder="leave a comment"
                        id="commentDescription"
                        rows="3"
                        style={{height: 100}}
                      ></textarea>
                      <label className="form-label">Leave a Comment</label>
                    </div>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                      <Link to="/blogs" className={logOutClasses}>Back to Blogs</Link>
                      <Link to="/blogs/myblogs" className={logInClasses}>Back to MyBlogs</Link>
                      <button
                      type="submit"
                      className="btn btn-outline-primary center"
                      >
                      Post Comment
                      </button>
                    </div>
                </form>
              </div><br/>
              <h2 className="align-top">Comments</h2>
              <div className="container align-items-center">
                {comments?.map((comment, index) => {
                  return (
                    <div className="row position-relative" key={index}>
                        <div className="card mx-4 my-5 w-auto p-4 shadow">
                            <div className="card-body">
                              <div className="card-text">
                                {comment.description}
                              </div>
                              <h6 className="card-subtitle mb-3 text-muted">
                                User: {comment.username}
                              </h6>
                            </div>
                        </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
    </div>
  )
}
export default GetOneBlog
