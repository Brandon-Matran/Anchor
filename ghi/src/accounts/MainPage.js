import background_image from "../images/background_image.png";
import programmer from "../images/programmer.jpg";
import { Navigate, useNavigate } from "react-router";
import "./MainPage.css";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignupModal";
import { useToken } from "./Authentication.js";

function Column(props) {
  return (
    <div className="col-md">
      {props.list.map((data, index) => {
        const dateString = data.post_date;
        const dateObj = new Date(dateString);
        const date = dateObj.toLocaleDateString();
        return (
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
                <p className="card-text blogText">Date: {date}</p>

                <p className="card-text text-truncate blogText">Description: {data.description}</p>
              </div>
            </div>
          </div>
          </div>
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

  const handleLogout = () => {
    logout();
    alert("You have logged out");
  };

  const handleSignup = () => {
    navigate("/signup")
  }

  const handleLogin = () => {
    navigate("/login")
  }

  useEffect(() => {
    const url = "http://localhost:8080/blogs";
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
      <div
        className="header"
        style={{ backgroundImage: `url(${background_image})` }}
      >
        <div
          className="col-sm d-flex justify-content-end"
          id="logo"
          animation="fadeIn 3s"
        >
          Anchor
        </div>
      </div>
      <div className="middle">
        <div>
          <div className="container-fluid">
            <img
              src={programmer}
              className="programmer img-fluid"
              alt="programmer"
            />
          </div>
          <div className="container">
            <div className="blogContainer d-flex align-items-center row">
              <div className="col-sm d-flex justify-content-end">
                <button
                  onClick={() => {
                    setSignUpModal(true);
                  }}
                  // onClick={() => {handleSignup()}}
                  type="button"
                  className="openSignupModal"
                >
                  Sign Up
                </button>
                {signupModal && (
                  <SignUpModal closeSignupModal={setSignUpModal} />
                )}
              </div>
              <div className="col-sm d-flex justify-content-start">
                <button
                  className="openLoginModal"
                  // onClick={() => {handleLogin()}}
                  onClick={() => setLoginModal(true)}
                >
                  Log In
                </button>
                {loginModal && <LoginModal closeLoginModal={setLoginModal} />}
              </div>
            </div>
          </div>

          <div className="aboveFooter fill-height">
            <div className="d-flex justify-content-center row fill-height">
              <div className="row g-0 col-md-4 blogRow">
                {blogs.map((blog, index) => {
                  return <Column key={index} list={blog} />;
                })}
              </div>
            </div>
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
