import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const [menu, setMenu] = useState(false);

  const handleToggle = () => {
      setMenu((prev) => !prev);
    };

    const closeMenu = () => {
      setMenu(false)
    }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-opacity-75 bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          ANCHOR
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

            <li className="nav-item dropdown">
              <a
                className=" nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Account
              </a>
              <span className="hamburger"></span>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="signup"
                  >
                    Signup
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="login"
                  >
                    Login
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <nav className="navBar">
            <button onClick={handleToggle}>{menu ? "Close" : "Open"}</button>
            <NavLink
              to={"/test"}
              activeClassName="active-link"
              onClick={() => closeMenu()}
              exact
            >
              SignUp
            </NavLink>
          </nav>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
