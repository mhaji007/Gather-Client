import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/user/Signup";
import Signin from "./pages/user/Signin";
import Profile from "./pages/user/Profile";
import Navbar from "./components/Navbar";
import Users from "./pages/user/Users";

const Router = () => {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/signin" component={Signin}></Route>
        <Route exact path="/user/:userId" component={Profile}></Route>
        <Route exact path="/users" component={Users}></Route>
      </Switch>
    </div>
  );
};

export default Router;
