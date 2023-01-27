import { useState, useEffect } from "react";
import { useToken } from "./Authentication.js";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css";

function LoginModal({ closeLoginModal }) {
  const [token, login] = useToken();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formSuccess, setFormSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(username, password);
  };

  useEffect(() => {
    if (token) {
      setFormSuccess(true);
      navigate("/main");
    }
  }, [token]);


  return (
    <div className="modalBackground">
      <div className="modalContainer" animation="fadeInAnimation ease 1s">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <h2>Welcome Back ShipMate!</h2>
              <label htmlFor="username">Username</label>
              <input
                required
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="form-control"
                id="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control"
                id="password"
              />
            </div>
            <button type="submit" className="submit">
              Submit
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => closeLoginModal(false)}
            >
              Cancel
            </button>
          </form>
          {formSuccess === true && (
            <p className="success-message">Login Successful!</p>
          )}
          {formSuccess === false && (
            <p className="error-message">Login Failed</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
