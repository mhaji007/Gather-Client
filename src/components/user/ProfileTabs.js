import React from "react";
import { Link } from "react-router-dom";

function ProfileTabs({ followings, followers }) {
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
            <span className="ml-3">

            Following
            </span>
          </h3>
          <hr />
          {followings.map((person, i) => {
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
      </div>
    </div>
  );
}

export default ProfileTabs;
