import React from "react";
import { Link } from "react-router-dom";

function ProfileTabs({ followers, following, posts }) {
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <h3 className="text-dark">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-person-bounding-box"
              viewBox="0 0 16 16"
            >
              <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            </svg>
            <span className="ml-3 mb-3">Followers</span>
          </h3>
          <hr />
          {followers.map((person, i) => {
            return (
              <div key={i}>
                <div className="row">
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        className=" mr-2 ml-3 mb-3 my-auto"
                        width="30px"
                        src={`${process.env.REACT_APP_API}/user/photo/${person._id}`}
                        onError={(i) => (i.target.src = "/avatar.png")}
                        alt={person.name}
                      />

                      <div className="d-inline-block">{person.name}</div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-md-4">
          <h3 className="text-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-person-square"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
            </svg>
            <span className="ml-3">Following</span>
          </h3>
          <hr />
          {following.map((person, i) => {
            return (
              <div key={i}>
                <div className="row">
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        className="mr-2 ml-3 mb-3 my-auto"
                        height="40px"
                        onError={(i) => (i.target.src = "/avatar.png")}
                        src={`${process.env.REACT_APP_API}/user/photo/${person._id}`}
                        alt={person.name}
                      />

                      <div className="d-inline-block">{person.name}</div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-md-4">
          <h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            <span className="ml-3 mb-3">Posts</span>
          </h3>
          <hr />
          {/* {posts.map((post, i) => {
            return (
              <div key={i}>
                <div className="row">
                  <div>
                    <Link to={`/post/${post._id}`}>

                      <div className="d-inline-block">{post.title}</div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })} */}

          {posts.map((post, i) => (
            <div key={i}>
              <div>
                <Link to={`/post/${post._id}`}>
                  <div>
                    <p className="lead">{post.title}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileTabs;
