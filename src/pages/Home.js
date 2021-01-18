import React from "react";
import Posts from "./post/Posts"

function Home() {
  return (
    <>
    <div className="jumbotron">
      <div className=" text-center">Recent Posts</div>
    </div>
    <div className="container">
      <Posts/>
    </div>
    </>
  );
}

export default Home;
