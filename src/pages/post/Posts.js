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
    <div className="container">
      <div className="row justify-content-center">
        {posts.map((post, i) => (
          <Card key={i} className="col-md-3 ml-2">
            {/* <CardImg
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
            /> */}
            <CardBody>
              <CardTitle tag="h5">{post.title}</CardTitle>
              {/* <CardSubtitle tag="h6" className="mb-2 text-muted">
                Card subtitle
              </CardSubtitle> */}
              <CardText>{post.body}</CardText>
              <Link
                to={`/post/${post._id}`}
                className="btn btn-sm border border-dark rounded text-dark"
              >
                Read more
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Posts;
