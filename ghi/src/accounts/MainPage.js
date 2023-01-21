import background_image from "../images/background_image.png";
import programmer from "../images/programmer.jpg";
import { useNavigate } from "react-router";
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
          <div key={index} className="card mb-3 shadow">
            <div className="card-shadow">
              <div className="col-md-6">
                <img
                  src={data.pic_url}
                  className="card-img-top pic"
                  alt="..."
                />
              </div>
              <div className="card-body">
                <p className="card-text">Date: {date}</p>

                <p className="card-text">Description: {data.description}</p>
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
            <div className="blogContainer max-width justify-content-center row">
              <div className="col-sm d-flex justify-content-end">
                <button
                  onClick={() => {
                    setSignUpModal(true);
                  }}
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
                  onClick={() => setLoginModal(true)}
                >
                  Log In
                </button>
                {loginModal && <LoginModal closeLoginModal={setLoginModal} />}
              </div>
            </div>
          </div>
    
          <div className="aboveFooter">
            <div className="no-gutters row-cols-3 d-flex justify-content-center ">
              <div className="row  no-gutters blogRow">
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
          className="footer"
          id="footer"
          style={{ backgroundImage: `url(${background_image})` }}
        ></footer>
      </div>
    </div>
  );
}

export default MainPage;
