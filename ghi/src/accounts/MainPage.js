import background_image from "../images/anchor_main_background.png";
import { useNavigate } from "react-router";
import "./MainPage.css";
import { useEffect, useState } from "react";
import { useToken } from "./Authentication.js";
import { Link } from "react-router-dom";
import SignUpModal from "./SignupModal";
import LoginModal from "./LoginModal";

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
                  <p className="card-text">{data.title}</p>
                </div>
                <div className="card-body">
                  <p className="card-text">By: {data.username}</p>
                </div>
                <div className="card-body">
                  <p className="card-text">{date}</p>
                </div>
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
          </Link>
        );
      })}
    </div>
  );
}

function MainPage() {
  const [token, login, logout] = useToken();
  const navigate = useNavigate();
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignUpModal] = useState(false);
  const [blogs, setBlogList] = useState([], [], []);

  const handleSignup = () => {
    navigate("/signup")
  }

  const handleLogin = () => {
    navigate("/login")
  }

  useEffect(() => {
    const url = `${process.env.REACT_APP_BLOG_SERVICE}/blogs`;
    const url = `${process.env.REACT_APP_BLOG_SERVICE}/blogs`;
    async function fetchData() {
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
    fetchData();
  }, []);

  return (
    <div>
      <div className="header" style={{ backgroundImage: `url(${background_image})`}}>
        <div className="row align-items-start">
          <div className="col align-self-start">
            <div className="logo">
              Anchor
            </div>
            <div className="logotext">
              A community crewed by engineers
            </div>
            <button
              onClick={() => {
                setSignUpModal(true);
              }}
              // onClick={() => {handleSignup()}}
              // type="button"
              className="openSignupModal mt-5"
            >
              Sign Up
            </button>
            {signupModal && (
              <SignUpModal closeSignupModal={setSignUpModal} />
            )}
            <button
              className="openLoginModal mt-5 mx-4"
              // onClick={() => {handleLogin()}}
              onClick={() => setLoginModal(true)}
            >
              Log In
            </button>
            {loginModal && <LoginModal closeLoginModal={setLoginModal} />}
          </div>
          <div className="col align-self-center">
          </div>
          <div className="cold-flex col align-self-end">
          </div>
        </div>
      </div>
        <div className="container-sm">
          <div>
            <h3>Blogs</h3>
          </div>
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
          className="footer footerHeight"
          id="footer"
          style={{ backgroundImage: `url(${background_image})` }}
        ></footer>
      </div>
  </div>
  );
}

export default MainPage;
