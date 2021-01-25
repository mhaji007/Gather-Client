import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardImg,
//   CardText,
//   CardBody,
//   CardTitle,
//   CardSubtitle,
// } from "reactstrap";
// import axios from "axios";
// import { Link, Redirect } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import EditPostForm from "../../components/forms/EditPostForm";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../components/helpers/alerts";
import loader from "../../loader.gif";

import { isAuth } from "../../components/helpers/auth";
import axios from "axios";

function EditPost({ match: { params } }) {
  const [state, setState] = useState({
    id: "",
    title: "",
    body: "",
    success: "",
    error: "",
    loading: false,
    postData: new FormData(),
    redirectToProfile: false,
  });

  const {
    id,
    title,
    body,
    photo,
    success,
    error,
    user,
    postData,
    loading,
    redirectToProfile,
  } = state;

  useEffect(() => {
    getPost(params.postId);
  }, [params.postId]);

  const getPost = async (postId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${isAuth().data.token}`,
          },
        }
      );
      setState({
        ...state,
        id: response.data._id,
        title: response.data.title,
        body: response.data.body,
        error: "",
      });
    } catch (error) {
      console.log("error from profile", error);
      // User trying to access this
      // resource is not authenticated
      setState({ error: error.response.data.error, redirectToProfile: true });
    }
  };

  const photoUrl = id
    ? `${process.env.REACT_APP_API}/post/photo/${id}?${new Date().getTime()}`
    : "/avatar.png";

  return redirectToProfile ? (
    <Redirect to={`/user/${isAuth().data.user._id}`} />
  ) : (
    <div className="container">
      <h2 className="mt-5 mb-5 text-center">Edit post</h2>
      {success && showSuccessMessage(success)}
      {error && showErrorMessage(error)}
      <div className="text-center">
        {loading && (
          <img src={loader} style={{ width: "auto", height: "250px" }} />
        )}
      </div>
      <div className="text-center ">
        {/* To display the image we need to provide src to img tag
        so there is no need fetch from backend.
        If we do want to fetch photo from server
        we have to modify how data is returned from server,
        currently we are returning image type in headers.
        if we use fetch, we have to return image data as json response
        and then use that in react to display the image. */}

        <img
          src={photoUrl}
          style={{ width: "auto", height: "150px" }}
          // if src is not found that is error.
          // so if there is error use default image
          onError={(i) => (i.target.src = "/avatar.png")}
          className="img-thumbnail "
          alt={title}
        />
      </div>
      <EditPostForm state={state} setState={setState} />
    </div>
  );
}

export default EditPost;
