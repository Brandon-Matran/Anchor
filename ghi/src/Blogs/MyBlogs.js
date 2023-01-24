import { useEffect , useState} from "react";
import { useAuthContext } from "../accounts/Authentication"
import React from 'react';

function BlogsColumn(props) {
    return (
      <div className="col">
        {props.list.map((data, index) => {
          return (
            // <Link to={`/blogs/${data.id}`} key={data.id} className="text-decoration-none text-reset">
              <div key={index} className="card mb-3 shadow">
                <img src={data.pic_url} className="card-img-top figure-img img-fluid" />
                <div className="card-body">
                  <h5 className="card-title">{data.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Author: {data.username}
                  </h6>
                  <p className="card-text">
                    {data.description}
                  </p>
                </div>
              </div>
            // </Link>
          );
        })}
      </div>
    );
}

function MyBlogs(props) {
    const [blogs, setBlogs] = useState([], [], []);
    const [username, setUserName] = useState('')
    const [Jwt, setJwt] = useState(null);

    const token = useAuthContext();

    function parseJwt(data) {
        const base64Url = data.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const info = JSON.parse(window.atob(base64));
        setUserName(info.account.username);
        // setUserType(info.account.user_type);
    }

    useEffect(() => {
        const url = `${process.env.REACT_APP_BLOG_SERVICE}/blogs`;
        fetch(token)
        .then(response => {if ((typeof response.token) !== "object") {
            setJwt(token.token);
            if (Jwt !== null) {
                parseJwt(Jwt);
            }
        }})
        async function fetchData() {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                const rev_sorted_data = data.reverse();
                const filteredData = rev_sorted_data?.filter(fD => fD.username == username)
                console.log(filteredData)
                const blogs = [[], [], []];

                let i = 0;
                for (const blog of filteredData) {
                    blogs[i].push(blog);
                    i++;
                    if (i > 2) {
                        i = 0;
                    }
                    setBlogs(blogs);
                }
            }
        }
        fetchData();
    }, [token, Jwt, username])

    return (
        <>
            <div className="px-4 py-5 my-5 mt-0 text-center bg-white">
                <h1 className="display-5 fw-bold">My Blogs</h1>
                {/* <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Link to="/shoes/new" className="btn btn-primary btn-lg px-4 gap-3">Add New Shoes</Link>
                    <Link to="/shoes/list" className="btn btn-success btn-lg px-4 gap-3">All Shoes</Link>
                </div> */}
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
        </>
    );

}
export default MyBlogs
