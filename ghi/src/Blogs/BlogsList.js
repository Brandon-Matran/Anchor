import React, { useState, useEffect } from "react";
import { useAuthContext } from "../accounts/Authentication"
import { useNavigate } from 'react-router-dom';


const BlogsList = () => {
  const [blogs, setBlog] = useState([]);
  const { token } = useAuthContext();
  const [Jwt, setJwt] = useState(null);
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
    setUserName(info.account.username);
  }

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
    {
      if (token) {
        parseJwt(token);
      }
    }
  }, [token]);

  return (
    <div>
      <table className="table table-striped">
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
                <img src={blog.pic_url} className="img-thumbnail"/>
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
  );
};

export default BlogsList;
