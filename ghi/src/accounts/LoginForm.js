import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useToken } from "./Authentication.js";

function LoginForm() {
  const navigate = useNavigate();
  const [token, login] = useToken();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    login(username, password);
    e.preventDefault();
    navigate("/main");
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <section
      className="vh-100"
    >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Log In
                  </p>
                  <form onSubmit={handleSubmit} id="update-blog-form">
                    <div className="form-floating mb-3">
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        id="username"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="username">Username</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                      ></input>
                      <label className="form-label" htmlFor="password">Password</label>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-outline-primary center"
                    >
                      Log In
                    </button>
                  </form>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
