import React, { useState, useEffect } from "react";
import { useAuthContext } from "../accounts/Authentication"


const BlogsList = () => {
  const [blogs, setBlog] = useState([]);
  const token = useAuthContext();
  const [Jwt, setJwt] = useState(null);
  const [userName, setUserName] = useState('')

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

  const deleteBlog = async (id) => {
    const url = `${process.env.REACT_APP_BLOG_SERVICE}/blogs/${id}`;
    const fetchConfig = {
      method: "delete",
      headers: {
        "Authorization": `Bearer ${Jwt}`,
        "Content-Type": "application/json"
      }
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      getBlog();
    }
  };

  useEffect(() => {
    getBlog();
    fetch(token)
    .then(response => {if ((typeof response.token) !== "object") {
        setJwt(token.token);
        if (Jwt !== null) {
            parseJwt(Jwt);
        }
    }})
  }, [token, Jwt, userName]);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Post Date</th>
            <th scope="col">Title</th>
            <th scope="col"></th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => {
            return (
              <tr key={blog.id}>
                <td>{blog.username}</td>
                <td>{blog.post_date}</td>
                <td>{blog.title}</td>
                <td>
                <img src={blog.pic_url} alt="cur" className="center"
                  height={50}
                  width={60}
                  />
                </td>
                <td>{blog.description}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteBlog(blog.id)}
                    >Delete Blog
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
