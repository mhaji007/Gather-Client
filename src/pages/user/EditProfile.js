import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import EditProfileForm from "../../components/forms/EditProfileForm";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../components/helpers/alerts";
import loader from "../../loader.gif";

import { isAuth } from "../../components/helpers/auth";

function EditProfile({ match: { params } }) {
  const [state, setState] = useState({
    id: "",
    name: "",
    about: "",
    email: "",
    password: "",
    error: "",
    success: "",
    loading: false,
    formData: new FormData(),
    fileSize: 0,
    imageUploadText: "Upload Photo",
    redirectToProfile: false,
    buttonText: "Update",
  });

  const {
    id,
    name,
    email,
    about,
    password,
    error,
    success,
    loading,
    formData,
    fileSize,
    redirectToProfile,
    buttonText,
  } = state;

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/user/${params.userId}`,
        {
          headers: {
            Authorization: `Bearer ${isAuth().token}`,
          },
        }
      );
      setState({
        ...state,
        id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        about: response.data.about,
      });
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

  const photoUrl = id
    ? // Without ?${new Date().getTime()} when re-uploading an image
      // (i.e., choosing another image after choosing one image)
      // results in getting the same old image and therefore
      // sometimes there is a need for browser refresh for
      // the new image to appear
      // Browsers cache the images to speed things up and might not refetch if the source is same
      // by adding date in url as query we can trick the browser
      // so that we get updated image instantly
      `${process.env.REACT_APP_API}/user/photo/${id}?${new Date().getTime()}`
    : "/avatar.png";

  return redirectToProfile ? (
    <Redirect to={`/user/${id}`} />
  ) : (
    <div className="container">
      <h2 className="mt-5 mb-5 text-center">Edit Profile</h2>
      {success && showSuccessMessage(success)}
      {error && showErrorMessage(error)}
      <div className="text-center">
        {loading && (
          <img src={loader} style={{ width: "auto", height: "250px" }} />
        )}
      </div>
      <div className="text-center ">
        {/*To display the image we need to provide src to img tag
        so there is no need fetch from backend.
        If we do want to fetch photo from server
        we have to modify how data is returned from server,
        currently we are returning image type in headers.
        if we use fetch, we have to return image data as json response
        and then use that in react to display the image.
         */}
        <img
          src={photoUrl}
          alt={name}
          style={{ width: "auto", height: "150px" }}
          // if src is not found that is error.
          // so if there is error use default image
          onError={(i) => (i.target.src = "/avatar.png")}
          className="img-thumbnail "
        />
      </div>
      <EditProfileForm state={state} setState={setState} />
    </div>
  );
}

export default EditProfile;
