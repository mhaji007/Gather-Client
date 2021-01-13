import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import EditProfileForm from "../../components/forms/EditProfileForm";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../components/helpers/alerts";
import { isAuth } from "../../components/helpers/auth";

function EditProfile({ match: { params } }) {
  const [state, setState] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
    formData: new FormData(),
    imageUploadText: "Upload Photo",
    redirectToProfile: false,
    buttonText: "Update",
  });

  const {
    id,
    name,
    email,
    password,
    error,
    success,
    formData,
    redirectToProfile,
    buttonText,
  } = state;

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
      setState({
        ...state,
        id: response.data._id,
        name: response.data.name,
        email: response.data.email,

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

  return redirectToProfile ? (
    <Redirect to={`/user/${id}`} />
  ) : (
    <div className="container">
      <h2 className="mt-5 mb-5 text-center">Edit Profile</h2>
      {success && showSuccessMessage(success)}
      {error && showErrorMessage(error)}
      <EditProfileForm state={state} setState={setState} />
    </div>
  );
}

export default EditProfile;
