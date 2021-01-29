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
import Comment from "./Comment"

function SinglePost({ match: { params } }) {
  const [state, setState] = useState({
    post: "",
    redirectToHome: false,
    redirectToSignIn: false,
    like: false,
    likes: 0,
    comments:[]
  });

  const { post, redirectToHome, redirectToSignIn, like, likes, comments } = state;

  console.log("likes from state on load ===>", likes);

  useEffect(() => {
    getPost();
  }, []);

    const updateComments = (comments) => {
      setState({...state, comments})
    };


  // Function to check whether usre has already liked the post
  // or not. Without this check in place the like count
  // is increased on refresh and user can like the already liked post
  // and increase the likes from 1 to 2 and only after liking
  // the post again the count reverts back to 0
  const checkLike = (likes) => {
    const userId = isAuth()
    && isAuth().data.user._id;
    let match = likes.toString().indexOf(userId) !== -1;
    return match;
  };

  const getPost = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/post/${params.postId}`
      );

      setState((state) => ({
        ...state,
        likes: response.data.likes.length,
        post: response.data,
      }));

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
      console.log("likes length after setting state ===>", likes);
    } catch (error) {
      console.log(error);
    }
  };

  const likeToggle = () => {
    if(!isAuth()) {
      setState({redirectToSignIn:true})
      // Prevent rest of the code from executing
      return false;
    }
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
          <h4 onClick={likeToggle} style={{cursor:"pointer"}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="22"
              fill="currentColor"
              class="bi bi-hand-thumbs-up"
              viewBox="0 0 16 16"
            >
              <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
            </svg>
            <span className="ml-3">{likes} </span>
          </h4>
          <CardText>{post.body}</CardText>
          <br />
          <p className="font-italic mt-2">
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
  } else if (redirectToSignIn) {
    return <Redirect to={"/signin"} />;
  }
  else
    return (
      <div className="container">
        <h2 className=" mt-5 mb-5">{post.title}</h2>
        {!post ? (
          <div className="text-center">
            <img src={loader} style={{ width: "auto", height: "350px" }} />
          </div>
        ) : (
          renderPost(post)
        )}
    <Comment postId={post._id} comments={comments} updateComments={updateComments} getPost={getPost}/>
      </div>
    );
}

export default SinglePost;
