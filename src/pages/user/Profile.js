// Profile page for displaying details of a single user.
// When user lands on this page via clicking on view profile
// link in users, their userId is already pushed to the url
// This userId is then retrieved on component mount and whenever
// there is a change in userId
// (e.g., user clicking on their own profile from this page) via props.match.params.
// match.params is made available by default for any route component

import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import { isAuth, signout } from "../../components/helpers/auth";
import FollowButton from "../../components/user/FollowButton";
import ProfileTabs from "../../components/user/ProfileTabs"
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

function Profile({ match: { params } }) {
  const [state, setState] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: "",
    following: false,
  });

  const [deletestate, setDeleteState] = useState({
    error: "",
    success: "",
    redirect: false,
  });

  const { user, redirectToSignin, following, user:{followers}, user:{following:userfollowing} } = state;
  const { error, success, redirect } = deletestate;

  // Function for returning the details of
  // a given user (when "view profile" is clicked in users page)
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
      // Pass user whose profile we are currently on
      // to check whether we(logged-in user) are
      // in his followers
      let following = checkFollow(response.data);
      // update the state with user and result of the check
      setState({ user: response.data, following });
    } catch (error) {
      console.log("error from profile", error);
      // User trying to access this
      // resource is not authenticated
      setState({ redirectToSignin: true });
    }
  };
  // Retrieve user info on component mount
  // and on userId change
  useEffect(() => {
    getUser();
  }, [params.userId]);

  const handleDelete = (userId) => async (e) => {
    if (window) {
      const alert = window.confirm("Delete profile?");
    }
    if (alert) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${isAuth().data.token}`,
            },
          }
        );

        signout(() => console.log("User was successfully deleted"));
        setDeleteState({ ...state, redirect: true });
        setDeleteState({
          error: "",
          success: response.data.message,
        });
      } catch (error) {
        console.log(error);
        setDeleteState({
          ...state,
          error: error.response.data.error,
        });
      }
    }
  };

  const photoUrl = user._id
    ? // Without ?${new Date().getTime()} when re-uploading an image
      // (i.e., choosing another image after choosing one image)
      // results in getting the same old image and therefore
      // sometimes there is a need for browser refresh for
      // the new image to appear
      `${process.env.REACT_APP_API}/user/photo/${
        user._id
      }?${new Date().getTime()}`
    : "/avatar.png";

  // Function to check whether a given user
  // is followed by the currently logged-in user
  const checkFollow = (user) => {
    // get currently logged-in user from local storage
    // (available on isAuth().data.user)
    const jwt = isAuth();
    // Check whether the currently logged-in user
    // is found in the array of followers of
    // the user
    const match = user.followers.find((follower) => {
      return follower._id === jwt.data.user._id;
    });
    return match;
  };
  // Function responsible for making a request
  // to follow endpoint to add the currrenlty logged-in user
  // to profile owner's followers as well as adding
  // the pofile owner to the array of followings of
  // the currently logged-in user
  const getFollow = async (userId, token, followId) => {
    console.log(
      "userId, token and followId from getFollow ===>",
      userId,
      token,
      followId
    );
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/user/follow`,
        { userId, followId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // // Pass user whose profile we are currently on
      // // to check whether we(logged-in user) are
      // // in his followers
      // let following = checkFollow(response.data);
      // update the state with user and result of the check
      setState({ ...state, user: response.data, following: !following });
      // window.location.reload()
    } catch (error) {
      console.log("error from profile", error);
      // User trying to access this
      // resource is not authenticated
      setState({ ...state, erro: error.respnose.data.error });
    }
  };
  // Function responsible for making a request
  // to unfollow endpoint to remove the currrenlty logged-in user
  // from profile owner's followers as well as removing
  // the pofile owner from the array of followings of
  // the currently logged-in user
  const getUnfollow = async (userId, token, unfollowId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/user/unfollow`,
        { userId, unfollowId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update the state with user and result of the check
      setState({ ...state, user: response.data, following: !following });
      // window.location.reload()
    } catch (error) {
      console.log("error from profile", error);
      // User trying to access this
      // resource is not authenticated
      setState({ ...state, erro: error.respnose.data.error });
    }
  };

  const followButtonHandler = () => {
    const userId = isAuth().data.user._id;
    const token = isAuth().data.token;

    getFollow(userId, token, user._id);
  };
  const unFollowButtonHandler = () => {
    const userId = isAuth().data.user._id;
    const token = isAuth().data.token;

    getUnfollow(userId, token, user._id);
  };

  return redirectToSignin ? (
    <Redirect to="/signin" />
  ) : redirect ? (
    <Redirect to="/" />
  ) : (
    <div className="container">
      <h2 className="mt-5 mb-5">Profile</h2>
      <div className="row">
        <div className="col-md-4">
          <Card className="col-md-6">
            <CardImg
              top
              width="100%"
              objectFit="cover"
              src={photoUrl}
              onError={(i) => (i.target.src = "/avatar.png")}
              alt="Card image cap"
            />
          </Card>
        </div>
        {/*
      Once use signs out, the info from localStorage is deleted so
      isAuth() returns nothing and app throws an error.
      We can either avoid isAuth altogether and just use properties
      from state. Or we can implement a check before we
      access the user like below:
      isAuth() && isAuth().name
      */}
        {/* <p>Hello {isAuth() && isAuth().data.user.name}</p>
      <p>Email: {isAuth() && isAuth().data.user.email}</p> */}
        {/* Note: if the above two lines are used on clicking view
      profile when navigating from users page, we end up with the same
      name and email as isAuth mehtod pulls the information from local storage
      while what we need in fact is name and email stored in the state on
      component mounting
       */}
        <div className="col-md-6 lead">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>{user && `Joined ${new Date(user.created).toDateString()}`}</p>
          {/* Conditionally display the edit and delete profile buttons.
        Check to see whether the user info from local storge (i.e., logged-in user info)
        is same as user info from state (i.e., user who owns the profile)
        If yes, only then display the edit and delete buttons*/}
          {isAuth() &&
          isAuth().data.user &&
          isAuth().data.user._id === user._id ? (
            <div className="d-inline-block mt-3">
              <Link
                className="btn btn-sm btn-success mr-5"
                to={`/user/edit/${user._id}`}
              >
                Edit Profile
              </Link>
              <Link
                className="btn btn-sm btn-raised btn-danger"
                onClick={handleDelete(user._id)}
              >
                Delete Profile
              </Link>
            </div>
          ) : (
            <FollowButton
              following={following}
              followButtonHandler={followButtonHandler}
              unFollowButtonHandler={unFollowButtonHandler}
            />
          )}

        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-5 mb-5">
          <div className="lead">{user.about}</div>
          <hr/>
          <ProfileTabs followers={followers} followings={userfollowing}/>
        </div>
      </div>
    </div>
  );
}

export default Profile;
