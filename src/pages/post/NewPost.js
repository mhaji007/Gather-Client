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
import PostForm from "../../components/forms/PostForm";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../components/helpers/alerts";
import loader from "../../loader.gif";

import { isAuth } from "../../components/helpers/auth";

function NewPost() {
  const [state, setState] = useState({
    title: "",
    body: "",
    photo: "",
    success: "",
    error: "",
    postData: new FormData(),
    // Which user created the post
    user: {},
    loading: false,
    redirectToProfile: false,
  });

  const { title, body, photo, success, error, user, postData, loading, redirectToProfile } = state;

  console.log("from data from NewPost ===>", postData );


  // const photoUrl = isAuth().data.user._id
  //   ? // Without ?${new Date().getTime()} when re-uploading an image
  //     // (i.e., choosing another image after choosing one image)
  //     // results in getting the same old image and therefore
  //     // sometimes there is a need for browser refresh for
  //     // the new image to appear
  //     // Browsers cache the images to speed things up and might not refetch if the source is same
  //     // by adding date in url as query we can trick the browser
  //     // so that we get updated image instantly
  //     `${process.env.REACT_APP_API}/user/photo/${
  //       isAuth().data.user._id
  //     }?${new Date().getTime()}`
  //   : "/avatar.png";

  return redirectToProfile ? (
    <Redirect to={`/user/${isAuth().data.user._id}`} />
  ) : (
    <div className="container">
      <h2 className="mt-5 mb-5 text-center">Create a new post</h2>
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
        {/* <img
          src={photoUrl}

          style={{ width: "auto", height: "150px" }}
          // if src is not found that is error.
          // so if there is error use default image
          onError={(i) => (i.target.src = "/avatar.png")}
          className="img-thumbnail "
        /> */}
      </div>
      <PostForm state={state} setState={setState} />
    </div>
  );
}

export default NewPost;
