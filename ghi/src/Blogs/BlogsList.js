import React, { useState, useEffect } from "react";
import { useAuthContext } from "../accounts/Authentication"
import { useNavigate } from 'react-router-dom';

const BlogsList = () => {
  const [blogs, setBlog] = useState([]);
  const { token } = useAuthContext();
  const navigate = useNavigate()

  const getBlog = async () => {
    const url = `${process.env.REACT_APP_BLOG_SERVICE}/blogs`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setBlog(data);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div>
      <div className="px-4 py-5 my-5 mt-0 text-center">
          <h1 className="display-5 fw-bold">Blogs</h1>
      </div>
      <div>
        <table className="table table-striped text-center login">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Title</th>
              <th scope="col">Picture</th>
              <th scope="col">Post Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {blogs?.map((blog) => {
              return (
                <tr key={blog.id}>
                  <td>{blog.username}</td>
                  <td>{blog.title}</td>
                  <td>
                  <img src={blog.pic_url} className="img-thumbnail w-25"/>
                  </td>
                  <td>{blog.post_date}</td>
                  <td>
                  <button className="btn btn-success" onClick={() => navigate(`/blogs/${blog.id}`)}>Check it out</button>
                  </td>
                </tr>

              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogsList;
