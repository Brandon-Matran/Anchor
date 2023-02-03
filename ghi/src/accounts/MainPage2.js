import background_image from "../images/anchor_main_background.png";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./MainPage.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../accounts/Authentication"



function Column(props) {
  return (
    <div className="col-md">
      {props.list.map((data, index) => {
        const dateString = data.post_date;
        const dateObj = new Date(dateString);
        const date = dateObj.toLocaleDateString();
        return (
          <Link to={`/blogs/${data.id}`} key={index} className="text-decoration-none text-reset">
            <div key={index} className="card mb-5">
              <div className="row g-0 blogCard">
                <div className="col-md-4">
                  <img
                    src={data.pic_url}
                    className="card-img-top pic"
                    alt="..."
                  />
                </div>
                <div className="col-md-8 cardBackground">
                  <div className="card-body">
                    <p>By {data.username} | Date: {date}</p>
                    <p className="text-truncate">{data.description}</p>
                  </div>
                </div>
              </div>
            </div>
        </Link>
        );
      })}
    </div>
  );
}

function MainPage() {
  const navigate = useNavigate();
  const [blogs, setBlogList] = useState([], [], []);
  const [username, setUserName] = useState('');
  const [iscompany, setisCompany] = useState(false)
  const { token } = useAuthContext()

  const handleLogout = () => {
    logout();
    alert("You have logged out");
  };

  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
    setUserName(info.account.username);
    const user_type = info.account.user_type;
    if (user_type === "company") {
    setisCompany(true)
    }
  }

  async function fetchData() {
    const url = `${process.env.REACT_APP_BLOG_SERVICE}/blogs`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const blogData = data.slice(data.length - 3);
      const blogs = [[], [], []];
      let i = 0;

      for (const event of blogData) {
        blogs[i].push(event);
        i = i + 1;
        if (i > 2) {
          i = 0;
        }

        setBlogList(blogs);
      }
    }
  }

  useEffect(() => {
    {
      if (token) {
        parseJwt(token);
      }
    }
    fetchData();
  }, [token, username]);

  return (
    <div className="targetall">
      <div className="header" style={{ backgroundImage: `url(${background_image})` }}>
        <div className="row align-items-start">
          <div className="col align-self-start mt-5">
            <div className="logintext">
              Welcome aboard, {username}
            </div>
            <button className="openSignupModal mt-5" onClick={() => navigate("/blogs/myblogs")}>View MyBlogs</button>
            {/* <button className="openLoginModal mt-5 mx-4" onClick={() => navigate("/listings/mylistings")}>View MyListings</button> */}
            {iscompany === true &&  <button className="openLoginModal mt-5 mx-4" onClick={() => navigate("/listings/mylistings")}>View MyListings</button>}
          </div>
        </div>
      </div>
        <div className="container-sm">
          <h2 className="text-center w-50 p-5">Blogs</h2>
          <div className="d-flex justify-content-center row">
            <div className="row g-0 col-md-4 blogRow">
              {blogs.map((blog, index) => {
                return <Column key={index} list={blog} />;
              })}
            </div>
          </div>
        </div>
      <div className="container" id="footer-container">
        <footer
          className="footer"
          id="footer"
          style={{ backgroundImage: `url(${background_image})` }}
        ></footer>
      </div>
    </div>
  );
}

export default MainPage;
