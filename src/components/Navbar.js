import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path)
  return "text-primary border border-primary"
  else return "text-dark"
  //  return { color: "#ff9900" };
  // else return { color: "#ffffff" };
};

function Navbar({ history }) {
  return (
    <div
      className={`navbar navbar-expand-lg  ${isActive(
        history,
        "/"
      )}  navbar-light bg-white justify-content-between`}
    >
      <Link class="navbar-brand" to="/">
        <img src="./logo.png" width="100" height="auto" alt="Gather logo" />
      </Link>

      <ul className="nav">
        <li className="nav-item">
          <Link
            className={`nav-link bg-light ${isActive(
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
            className={`nav-link bg-light ${isActive(
              history,
              "/signup"
            )} rounded ml-1`}
            to="/signup"
          >
            Sign up
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default withRouter(Navbar);
