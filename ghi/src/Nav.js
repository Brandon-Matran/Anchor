import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import "./Nav.css"
import { useToken } from "./accounts/Authentication";
import anchor from './images/anchor.jpg'
import { useNavigate } from "react-router";

function Nav() {
  const [menu, setMenu] = useState(false);
  const [token, login, logout] = useToken();
  const navigate = useNavigate();

  const handleOpen = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    logout();
    alert('You have logged out')

  }

  const handleLogo = () => {
    navigate('/')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
  <img src={anchor} className='anchor' onClick={handleLogo}></img>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <div className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </div>


          </div>

          <div >
            <button
              className="burger"
              animation="fadeInAnimation ease 1s"
              onClick={handleOpen}
            >
              ☰
            </button>
            {menu && (

                <ul class="dropdownBurger cut">

                    <NavLink
                      className="dropdown-item link"
                      aria-current="page"
                      to="blogs"
                    >
                      Blogs
                    </NavLink>


                    <NavLink
                      className="dropdown-item link"
                      aria-current="page"
                      to="listings"
                    >
                      Job Listings
                    </NavLink>


                    <NavLink
                      className="dropdown-item link"
                      aria-current="page"
                      to="signup"
                    >
                      Signup
                    </NavLink>

                    <NavLink
                      className="dropdown-item link"
                      aria-current="page"
                      to="login"
                    >
                      Login
                    </NavLink>

                  {token &&
                  <NavLink
                      className="dropdown-item link"
                      aria-current="page"
                      to="/"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  }
                </ul>
            )}
          </div>
        </div>

      </nav>
    </div>
  );
}

export default Nav;
