import background_image from "../images/background_image.png";
import programmer from "../images/programmer.jpg";
import { useNavigate } from "react-router";
import './MainPage.css';
import { getToken, useToken } from "./Authentication";
import { useEffect, useState } from "react";

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
                <p className="card-text">
                  Date: {date}
                </p>

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
  const [token] = useToken();
  const navigate = useNavigate();
  const [blogs, setBlogList] = useState([], [], [])


useEffect(() => {
    const url = "http://localhost:8080/blogs";
    async function fetchData() {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const blogs = [[], [], []];
        let i = 0;
        for (const event of data) {
          blogs[i].push(event);
          i = i + 1;
          if (i > 2) {
            i = 0;
          }
        }
        console.log(blogs.length)
        setBlogList(blogs);


    }
  }
    fetchData();
  }, []);


  const signupClick = async (e) => {
    navigate("/signup");
  };

  const LoginClick = async (e) => {
    navigate("/login");
  }



  return (
    <section
      className="vh-100"
      style={{ backgroundImage: `url(${background_image})` }}
    >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="w-100">
                    <div>
                      <div className="container max-width">
                        <div className="d-flex flex-row-reverse">
                          <button
                            onClick={() => signupClick()}
                            type="button"
                            className="signup btn btn-primary btn-lg text-right"
                          >
                            Sign Up
                          </button>
                        </div>
                        <div className="d-flex flex-row-reverse">
                          <button
                            onClick={() => LoginClick()}
                            type="button"
                            className="signup btn btn-primary btn-lg text-right"
                          >
                            Log In
                          </button>
                        </div>
                      </div>
                      <img
                        src={programmer}
                        className="programmer img-fluid"
                        alt="programmer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                {blogs.map((blog, index) => {
                  return <Column key={index} list={blog} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainPage;
