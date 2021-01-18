import React from "react";

function SinglePost({ match: { params } }) {
  return <div>{params.postId}</div>;
}

export default SinglePost;
