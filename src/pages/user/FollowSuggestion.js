import React, { useState, useEffect } from "react";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../components/helpers/alerts";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { isAuth } from "../../components/helpers/auth";

function FollowSuggestion() {
  const [state, setState] = useState({
    users:[],
    success:"",
    error:"",
    open:false,
  });

  const {users, success, error, open} = state


  const listUsers = async (userId, token) => {
    console.log("userId, token ====>", userId, token);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/user/findpeople/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setState({...state, users:response.data});
    } catch (error) {
      console.log("error from follow suggestion ===>", error);
    }
  };

  useEffect(() => {
    const userId = isAuth().data.user._id;
    const token = isAuth().data.token;
    listUsers(userId, token);
  }, []);

  // Function responsible for making a request
  // to follow endpoint to add the currrenlty logged-in user
  // to profile owner's followers as well as adding
  // the pofile owner to the array of followings of
  // the currently logged-in user
  const getFollow = async (userId, token, followId, i) => {

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

      let toFollow = users;
      // Remove the user for whom the follow button
      // was clicked on from the state
      toFollow.splice(i,1)


      setState({ ...state, users:toFollow, open:true, success:`Following ${followId.name}`});
      // window.location.reload()
    } catch (error) {
      console.log("error from profile", error);
      // User trying to access this
      // resource is not authenticated
      setState({ ...state, error: error.respnose.data.error });
    }
  };

  const handleFollow = (followId, i) => {
        const userId = isAuth().data.user._id;
        const token = isAuth().data.token;
        getFollow (userId, token, followId, i);


  };

  return (
    <div className="container">
      <div>
        {open &&success && showSuccessMessage(success)}
      </div>
      <div className="row">
        {users.map((user, i) => (
          <Card key={i} className="col-md-4 ml-2">
            <CardImg
              className="img-thumbnail"
              top
              width="100%"
              // height="320vw"
              objectFit="cover"
              src={`${process.env.REACT_APP_API}/user/photo/${
                user._id
              }?${new Date().getTime()}`}
              alt="Card image cap"
              onError={(i) => (i.target.src = "/avatar.png")}
              style={{ height: "420px" }}
            />
            <CardBody>
              <CardTitle tag="h5">{user.name}</CardTitle>
              {/* <CardSubtitle tag="h6" className="mb-2 text-muted">
                Card subtitle
              </CardSubtitle> */}
              <CardText>{user.email}</CardText>
              <Link
                to={`/user/${user._id}`}
                className="btn btn-sm border border-dark rounded text-dark"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
                <span className="ml-3">View Profile</span>
              </Link>
              <button

                className="btn btn-sm border border-info rounded text-info float-right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-person-plus-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path
                    fill-rule="evenodd"
                    d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
                <span className="ml-3" onClick={() => handleFollow(user, i)}>
                  Follow
                </span>
              </button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FollowSuggestion;
