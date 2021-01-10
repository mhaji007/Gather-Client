import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuth } from "../components/helpers/auth";

const isActive = (history, path) => {
  if (history.location.pathname === path)
    return "text-primary border border-primary";
  else return "text-dark";
  //  return { color: "#ff9900" };
  // else return { color: "#ffffff" };
};

function Navbar({ history }) {
  return (
    <div
      className={`navbar navbar-expand-lg navbar-light bg-white justify-content-between`}
    >
      <Link class="navbar-brand" to="/">
        <img src="./logo.png" width="100" height="auto" alt="Gather logo" />
      </Link>

      <ul className="nav">
        {!isAuth() && (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive(
                  history,
                  "/signin"
                )} rounded ml-1`}
                to="/signin"
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive(
                  history,
                  "/signup"
                )} rounded ml-1`}
                to="/signup"
              >
                Sign up
              </Link>
            </li>
          </>
        )}
        {isAuth() && (
          <>
            <li className="nav-item">
              <a
                className={`nav-link btn btn-danger rounded ml-1 text-white`}
                onClick={() => signout(() => history.push("/signin"))}
                style={{ cursor: "pointer" }}
              >
                Sign out
              </a>
            </li>
            <li className="nav-item">
              <Link to ={`/user/${isAuth().data.user._id}`} className="nav-link border border-primary rounded ml-1 text-primary">
                {isAuth().data.user.name}
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default withRouter(Navbar);
