import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import loader from "../../loader.gif";
import { isAuth } from "../../components/helpers/auth";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);

  const listPosts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.log("error from users", error);
    }
  };

  useEffect(() => {
    listPosts();
  }, []);

  return (
    <>
      {!posts.length ? (
        <div className="text-center">
          <img src={loader} style={{ width: "auto", height: "350px" }} />
        </div>
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            {posts.map((post, i) => {
              const posterId = post.postedBy
                ? `/user/${post.postedBy._id}`
                : "";
              const posterName = post.postedBy ? post.postedBy.name : "Unknown";
              return (
                <Card key={i} className="col-md-3 ml-2 mb-2">
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
                    style={{ height: "300px" }}
                  />
                  <CardBody>
                    <CardTitle tag="h5">{post.title}</CardTitle>
                    {/* <CardSubtitle tag="h6" className="mb-2 text-muted">
                Card subtitle
              </CardSubtitle> */}
                    <CardText>
                      {post.body.length > 100
                        ? post.body.substring(0, 100) + "..."
                        : post.body}
                    </CardText>
                    <br />
                    <Link
                      to={`/post/${post._id}`}
                      className="btn btn-sm border border-dark rounded text-dark"
                    >
                      Read more
                    </Link>
                    <p className="font-italic mt-3">
                      Posted by <Link to={`${posterId}`}>{posterName} </Link>
                      on {new Date(post.created).toDateString()}
                    </p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Posts;
