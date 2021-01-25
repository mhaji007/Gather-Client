import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/user/Signup";
import Signin from "./pages/user/Signin";
import Profile from "./pages/user/Profile";
import Navbar from "./components/Navbar";
import Users from "./pages/user/Users";
import EditProfile from "./pages/user/EditProfile";
import FollowSuggestion from "./pages/user/FollowSuggestion";
import NewPost from "./pages/post/NewPost";
import EditPost from "./pages/post/EditPost";
import SinglePost from "./pages/post/SinglePost";
import PrivateRoute from "./components/helpers/auth";

const Router = () => {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute exact path="/post/create" component={NewPost}></PrivateRoute>
        <PrivateRoute exact path="/post/:postId" component={SinglePost}></PrivateRoute>
        <PrivateRoute exact path="/post/edit/:postId" component={EditPost}></PrivateRoute>
        <Route exact path="/users" component={Users}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/signin" component={Signin}></Route>
        <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}></PrivateRoute>
        <PrivateRoute exact path="/findpeople" component={FollowSuggestion}></PrivateRoute>
        <PrivateRoute exact path="/user/:userId" component={Profile}></PrivateRoute>
      </Switch>
    </div>
  );
};

export default Router;
