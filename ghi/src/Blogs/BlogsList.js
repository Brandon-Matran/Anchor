import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import React from "react";

const BlogsList = () => {
  const [blogs, setBlog] = useState([]);

  const getBlog = async () => {
    const url = "http://localhost:8080";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setBlog(data);
    }
  };

  const deleteBlog = async (id) => {
    const url = `http://localhost:8080/${id}`;
    const fetchConfig = { method: "delete" };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      getBlog();
      // const data = await response.json();
      // getBlog(data);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Post Date</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {blogs.blogs?.map((blog) => {
            return (
              <tr key={blog.id}>
                <td>{blog.username}</td>
                <td>{blog.post_date}</td>
                <td>{blog.title}</td>
                <td>{blog.description}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteBlog(blog.id)}
                  >
                    Delete Blog
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BlogsList;
