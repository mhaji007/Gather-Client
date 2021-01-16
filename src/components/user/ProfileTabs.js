import React from "react";
import { Link } from "react-router-dom";

function ProfileTabs({ followings, followers }) {
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <h3 className="text-dark">Followers</h3>
          <hr />
          {followers.map((person, i) => {
            return (
              <div key={i}>
                <div className="row">
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        className="mr-2"
                        height="40px"
                        onError={(i) => (i.target.src = "/avatar.png")}
                        src={`${process.env.REACT_APP_API}/user/photo${person._id}`}
                        alt={person.name}
                      />

                      <div className="d-inline-block">{person.name}</div>
                    </Link>
                    <p style={{ clear: "both" }}>{person.about}</p>
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
