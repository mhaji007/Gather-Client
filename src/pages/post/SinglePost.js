import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { remove } from "./apiPost";
import loader from "../../loader.gif";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { isAuth } from "../../components/helpers/auth";

function SinglePost({ match: { params } }) {
  const [state, setState] = useState({
    post: "",
    redirectToHome: false,
    like: false,
    likes: 0,
  });

  const { post, redirectToHome, like, likes} = state;

  console.log("likes from state on load ===>", likes)

  useEffect(() => {
    getPost();
  }, []);

  // Function to check whether usre has already liked the post
  // or not. Without this check in place the like count
  // is increased on refresh and user can like the already liked post
  // and increase the likes from 1 to 2 and only after liking
  // the post again the count reverts back to 0
  const checkLike = (likes) => {
    const userId = isAuth().data.user._id;
    console.log("likes from checkLike ====>", likes)
    let match = likes.toString().indexOf(userId) !==-1
    return match;
  }

  const getPost = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/post/${params.postId}`
      );
      console.log("Response from getPost =====>", response.data);
      console.log("Response likes from getPost =====>", response.data.likes);
      console.log("Response like's length from getPost =====>", response.data.likes.length);
      setState((state) =>({ ...state, likes: response.data.likes.length, post: response.data }));
      console.log("likes after setting state from getPost ===>", likes)
      setState((state) => ({ ...state, like: checkLike(response.data.likes) }));
    } catch (error) {
      console.log("error from users", error);
    }
  };

  const deletePost = () => {
    const postId = params.postId;
    const token = isAuth().data.token;

    remove(postId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setState({ redirectToHome: true });
      }
    });
  };

  const deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete this post?");
    if (answer) {
      deletePost();
    }
  };

  const likeHandler = async (postId, userId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/post/like`,
        { postId, userId },
        {
          headers: {
            Authorization: `Bearer ${isAuth().data.token}`,
          },
        }
      );
      setState({ ...state, like: !like, likes: response.data.likes.length });
    } catch (error) {
      console.log(error);
    }
  };

  const unLikeHandler = async (postId, userId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/post/unlike`,
        { postId, userId },
        {
          headers: {
            Authorization: `Bearer ${isAuth().data.token}`,
          },
        }
      );
      setState({ ...state, like: !like, likes: response.data.likes.length });
      console.log ("likes length after setting state ===>", likes)
    } catch (error) {
      console.log(error);
    }
  };

  const likeToggle = () => {
    let callApi = like ? unLikeHandler : likeHandler;
    const userId = isAuth().data.user._id;
    const postId = post._id;
    callApi(postId, userId);
  };

  const renderPost = (post) => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : "Unknown";

    return (
      <Card>
        <CardImg
          className="img-thumbnail mb-3"
          top
          width="100%"
          // height="320vw"
          objectFit="cover"
          src={`${process.env.REACT_APP_API}/post/photo/${
            post._id
          }?${new Date().getTime()}`}
          alt={post.title}
          onError={(i) => (i.target.src = "/avatar.png")}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <CardBody>
          {/* <CardTitle tag="h5">{post.title}</CardTitle> */}
          {/* <CardSubtitle tag="h6" className="mb-2 text-muted">
                Card subtitle
              </CardSubtitle> */}
          <h3 onClick={likeToggle}>{likes} Like</h3>
          <CardText>{post.body}</CardText>
          <br />
          <p className="font-italic mt-3">
            Posted by <Link to={`${posterId}`}>{posterName} </Link>
            on {new Date(post.created).toDateString()}
          </p>

          <div className="d-inline-block">
            <Link
              to={`/`}
              className="btn  border border-dark rounded text-dark mr-5"
            >
              Back to Posts
            </Link>
            {isAuth().data.user &&
              isAuth().data.user._id === post.postedBy._id && (
                <>
                  <Link
                    to={`/post/edit/${post._id}`}
                    className="btn  border border-dark rounded text-dark mr-5"
                  >
                    Edit Post
                  </Link>
                  <button
                    className="btn  border border-danger  text-danger"
                    onClick={deleteConfirmed}
                  >
                    Delete Post
                  </button>
                </>
              )}
          </div>
        </CardBody>
      </Card>
    );
  };

  if (redirectToHome) {
    return <Redirect to={"/"} />;
  } else
    return (
      <div className="container">
        <h2 className="display-4 mt-5 mb-5">{post.title}</h2>
        {!post ? (
          <div className="text-center">
            <img src={loader} style={{ width: "auto", height: "350px" }} />
          </div>
        ) : (
          renderPost(post)
        )}
      </div>
    );
}

export default SinglePost;
