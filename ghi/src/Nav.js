import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css"
import { useAuthContext, useToken } from "./accounts/Authentication";
import anchor from './images/anchor_icon.png'
import { useNavigate } from "react-router";

function Nav() {
  const [menu, setMenu] = useState(false);
  const [token, login, logout] = useToken();
  const [iscompany, setisCompany] = useState(false)
  const navigate = useNavigate();

  const handleOpen = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    logout();
    alert('You have logged out')

  }

  const handleLogo = () => {
    if (token) {
    navigate('/main')
  } else {
    navigate('/')
  }
}

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const info = JSON.parse(window.atob(base64));
  const user_type = info.account.user_type
  if (user_type === "company") {
  setisCompany(true)
  }
  }


useEffect( () => {
  if (token) {
    parseJwt(token)

  }
}, [token])



  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div id="logo_holder">
            <img src={anchor} className='anchor' onClick={handleLogo}/>
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

                <ul className="dropdownBurger cut">

                    <Link
                      className="dropdown-item link"
                      aria-current="page"
                      to="blogs"
                    >
                      Blogs
                    </Link>

                    {token && <Link
                      className="dropdown-item link"
                      aria-current="page"
                      to="blogs/create"
                    >
                      Create Blog
                    </Link>
                    }

                    {token && <Link
                      className="dropdown-item link"
                      aria-current="page"
                      to="/blogs/myblogs"
                    >
                      My Blogs

                    </Link>
                    }

                    <Link
                      className="dropdown-item link"
                      aria-current="page"
                      to="listings"
                    >
                      Job Listings
                    </Link>

                    {iscompany === true && <Link
                      className="dropdown-item link"
                      aria-current="page"
                      to="listings/create"
                    >
                      Post Job Listing
                    </Link>
                    }

                    {token && <Link
                      className="dropdown-item link"
                      aria-current="page"
                      to="/listings/mylistings"
                    >
                      My listings

                    </Link>
                    }


                    {!token && <Link
                      className="dropdown-item link"
                      aria-current="page"
                      to="/signup"
                    >
                      Signup

                    </Link>
                    }

                    {!token &&
                    <Link
                      className="dropdown-item link"
                      aria-current="page"
                      to="login"
                    >
                      Login
                    </Link>
                    }

                  {token &&
                  <Link
                      className="dropdown-item link"
                      aria-current="page"
                      to="/"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  }

                    <Link
                      className="dropdown-item link"
                      aria-current="page"
                      to="/about"
                    >
                      About Us
                    </Link>
                </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
