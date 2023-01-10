import { NavLink, Link } from "react-router-dom";
import "./index.css";

function Nav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            CarCar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle mr-1"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Create...
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <Link
                      className="nav-link dropdown-item"
                      to="/models/new"
                      id="dropdown"
                    >
                      Model
                    </Link>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Nav;
