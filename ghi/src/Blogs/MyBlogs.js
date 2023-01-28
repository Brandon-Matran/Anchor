import { useEffect , useState} from "react";
import { useAuthContext } from "../accounts/Authentication"
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MyBlogs() {
    const [blogs, setBlogs] = useState([], [], []);
    const [username, setUserName] = useState('')
    const navigate = useNavigate()

    const { token } = useAuthContext();

    function parseJwt(data) {
        const base64Url = data.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const info = JSON.parse(window.atob(base64));
        setUserName(info.account.username);
    }

    async function fetchData() {
        const url = `${process.env.REACT_APP_BLOG_SERVICE}/blogs`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const rev_sorted_data = data.reverse();
            const filteredData = rev_sorted_data?.filter(fD => fD.username == username)
            const blogs = [[], [], []];

            let i = 0;
            for (const blog of filteredData) {
                blogs[i].push(blog);
                i++;
                if (i > 2) {
                    i = 0;
                }
              } setBlogs(blogs);
          }
    }

    useEffect(() => {
        if (token) {
          parseJwt(token);
        }
        fetchData()
    }, [token, username]);

    function deleteBlog(id) {
      const blogURL = `${process.env.REACT_APP_BLOG_SERVICE}/blogs/${id}`
      const fetchConfig = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
      }
      fetch(blogURL, fetchConfig)
      .then((response) => {
          if (!response.ok) {
              throw new Error ("Something went wrong!")
            }
          fetchData()
      })
      .catch((err) => {
      })
    }

    function BlogsColumn(props) {
      return (
        <div className="col text-truncate">
          {props.list.map((data, index) => {
            return (
              <div key={index} className="card mx-4 my-5 w-auto p-4 shadow">
                <Link to={`/blogs/${data.id}`} key={index} className="text-decoration-none text-reset">
                    <img src={data.pic_url} className="card-img-top figure-img img-fluid" />
                    <div className="card-body">
                      <h5 className="card-title mb-2">{data.title}</h5>
                      <h6 className="card-subtitle mb-3 text-muted">
                        Author: {data.username}
                      </h6>
                      <div className="text-truncate">
                        {data.description}
                      </div>
                    </div>
                </Link>
                <div className="card-footer">
                  <div className="btn-wrapper text-center d-flex justify-content-between">
                    <button className="btn btn-danger" onClick={() => deleteBlog(data.id)}>Delete</button>
                    <button className="btn btn-warning" onClick={() => navigate(`/blogs/update/${data.id}`)}>Update</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
  }

  return (
      <div style={{height: "100vh"}}>
          <div className="px-4 py-5 my-5 mt-0 text-center">
              <h1 className="display-5 fw-bold mb-4">My Blogs</h1>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <Link to="/blogs/create" className="btn btn-success btn-lg px-4 gap-3">Post a New Blog</Link>
              </div>
          </div>
          <div className="container">
          <h2>Blogs</h2>
          <div className="row">
              {blogs.map((blog, index) => {
                  return (
                      <BlogsColumn key={index} list={blog} />
                  );
              })}
          </div>
          </div>
      </div>
  );

}
export default MyBlogs
