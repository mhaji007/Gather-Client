import React, { useState, useEffect } from "react";
import { isAuth } from "../../components/helpers/auth";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

function Profile({ match: { params } }) {
  const [state, setState] = useState({
    user: "",
    redirectToSignin: "",
  });

  const { user, redirectToSignin } = state;

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/user/${params.userId}`,
        {
          headers: {
            Authorization: `Bearer ${isAuth().data.token}`,
          },
        }
      );
      setState({ user: response.data });
    } catch (error) {
      console.log("error from profile", error);
      // User tryong to access this
      // resource is not authenticated
      setState({ redirectToSignin: true });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return redirectToSignin ? (
    <Redirect to="/signin" />
  ) : (
    <div className="container">
      <div className="row">

      <div className="col-md-6">
      <h2 className="mt-5 mb-5">Profile</h2>
      {/*
      Once use signs out, the info from localStorage is deleted so
      isAuth() returns nothing and app throws an error.
      We can either avoid isAuth altogether and just use properties
      from state. Or we can implement a check before we
      access the user like below:
      isAuth() && isAuth().name
      */}
      <p>Hello {isAuth() && isAuth().data.user.name}</p>
      <p>Email: {isAuth() && isAuth().data.user.email}</p>
      <p>{user && `Joined ${new Date(user.created).toDateString()}`}</p>

      </div>
      <div className="col-md-6">
          {isAuth() && isAuth().data.user && isAuth().data.user._id == user._id && (
            <div className="d-inline-block mt-5">
                <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${user._id}`}>
                  Edit Profile
                </Link>
                <Link className="btn btn-raised btn-danger ">
                  Delete Profile
                </Link>
            </div>
          )}
      </div>
      </div>
    </div>
  );
}

export default Profile;
