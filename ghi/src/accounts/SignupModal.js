import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useToken } from "./Authentication";
import signup_image from "../images/signup_image.png";
import "./SignupModal.css";

function SignUpModal({ closeSignupModal }) {
  const navigate = useNavigate();
  const [token, login, logout, signup] = useToken();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user_type, setType] = useState("");
  const [signUpSuccess, setsignUpSuccess] = useState(null);


  if (token) {
    return <Navigate to="/" />;
  }

  // function handleClick() {
  //   if (token) {
  //     setsignUpSuccess(true);
  //     navigate("/test");
  //   }
  //   else {
  //     alert('Invalid Credentials')
  //   }
  // }
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await signup(username, password, user_type);
  // };

  return (
    <div className="modalBackground">
      <div className="container-fluid signUpModal">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <form className="mx-1 mx-md-4" >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-anchor fa-lg me-3 fa-fw"></i>
                        <div className="flex-fill mb-0">
                          <label className="form-label">Your User Name</label>
                          <input
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            type="text"
                            className="form-control"
                            value={username}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="flex-fill mb-0">
                          <label className="form-label">Password</label>
                          <input
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            value={password}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label">
                            Pick your user type:
                          </label>
                          <select
                            required
                            onChange={(e) => setType(e.target.value)}
                            value={user_type}
                            className="form-select"
                          >
                            <option>Choose...</option>
                            <option value="individual">Individual</option>
                            <option value="company">Company</option>
                          </select>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          onClick={async () =>
                            await signup(username, password, user_type)
                          }
                          type="button"
                          className="submitSignup"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="cancelSignup"
                          onClick={() => closeSignupModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={signup_image}
                      className="img-fluid"
                      alt="signup_image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
