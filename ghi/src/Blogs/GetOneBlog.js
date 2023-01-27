import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getToken } from "../accounts/Authentication";
import { useAuthContext } from "../accounts/Authentication"


function GetOneBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const { token } = useAuthContext()

  useEffect(()=> {
    const url = `${process.env.REACT_APP_BLOG_SERVICE}/blogs/${id}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBlog(data);
      });


  }, []);

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
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link to="/blogs" className={logOutClasses}>Back to Blogs</Link>
                <Link to="/blogs/myblogs" className={logInClasses}>Back to MyBlogs</Link>
              </div>
            </div>
          </div>
        ) : null}
    </div>
  )
}
export default GetOneBlog
