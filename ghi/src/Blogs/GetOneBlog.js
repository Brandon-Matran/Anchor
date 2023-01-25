import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function GetOneBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);

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
  return (
      <div>
        {blog ? (
          <div>
            <div className="px-5 py-auto mx-5 text-center bg-white">
              <h1 className="display-5 fw-bold">{blog.title}</h1>
              <div className="d-flex justify-content-center">by {blog.username} | {blog.post_date}</div>
              <img src={blog.pic_url} className="card-img-top figure-img img-fluid" />
            </div>
            <div>
              <div className="grid gap-6">
                <p className="text-start">{blog.description}</p>
              </div>
            </div>
          </div>
        ) : null}
    </div>
  )
}
export default GetOneBlog
