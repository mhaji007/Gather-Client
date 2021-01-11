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
      <Link className="navbar-brand" to="/">
        <img src="/logo.PNG" width="100" height="auto" alt="Gather logo" />
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
                <span className="ml-2">Sign out </span>
              </a>
            </li>
            <li className="nav-item">
              <Link
                to={`/user/${isAuth().data.user._id}`}
                className="nav-link border border-primary rounded ml-1 text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-person-badge"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
                </svg>
                <span className="ml-2">{isAuth().data.user.name}</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/users`}
                className="nav-link border border-dark rounded ml-1 text-dark"
              >
                <svg
                  className="mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-people-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path
                    fill-rule="evenodd"
                    d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                  />
                  <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
                <span className="ml-2">Users </span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default withRouter(Navbar);
