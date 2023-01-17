import background_image from "../images/background_image.png";
import programmer from "../images/programmer.jpg";
import { useNavigate } from "react-router";
import "./MainPage.css";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignupModal";

function Column(props) {
  return (
    <div className="col">
      {props.list.map((data, index) => {
        const dateString = data.post_date;
        const dateObj = new Date(dateString);
        const options = { timeStyle: "short" };
        const date = dateObj.toLocaleDateString();
        return (
          <div key={index} className="card mb-3 shadow">
            <div className="card shadow">
              <img src={data.pic_url} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{data.venue}</h5>
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
  const navigate = useNavigate();
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignUpModal] = useState(false);
  const [blogs, setBlogList] = useState([], [], []);

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

  const signupClick = async (e) => {
    navigate("/signup");
  };

  const LoginClick = async (e) => {
    navigate("/login");
  };

  return (
    <div>
      <div
        className="header"
        style={{ backgroundImage: `url(${background_image})` }}
      >
        <div id="logo">Anchor ⚓</div>
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
              <div className="blogContainer max-width">
                <div className="d-flex flex-row-reverse">
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
                <button
                  className="openLoginModal"
                  onClick={() => setLoginModal(true)}
                >
                  Log In
                </button>
                {loginModal && <LoginModal closeLoginModal={setLoginModal} />}
              </div>
            </div>
            <div className="justify">
              <div className="aboveFooter">
                <div>
                  <div className="row blogRow">
                    {blogs.map((blog, index) => {
                      return <Column key={index} list={blog} />;
                    })}
                  </div>
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
        >
        </footer>
      </div>
    </div>
  );
}

export default MainPage;
