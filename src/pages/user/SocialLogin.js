import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router-dom";
import { socialLogin, authenticate } from "../../components/helpers/auth";

const SocialLogin = () => {
  const [state, setState] = useState({ redirectToReferrer: false });
  const { redirectToReferrer } = state;

  const responseGoogle = (response) => {
    console.log(response);
    const { googleId, name, email, imageUrl } = response.profileObj;
    const user = {
      password: googleId,
      name: name,
      email: email,
      imageUrl: imageUrl,
    };
    // console.log("user obj to social login: ", user);
    socialLogin(user).then((data) => {
      console.log("signin data: ", data);
      if (data.error) {
        console.log("Error Login. Please try again..");
      } else {
        console.log("signin success - setting jwt: ", data);
        authenticate(data, () => {
          setState({ redirectToReferrer: true });
        });
      }
    });
  };

  {
   // redirect
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    } else
      return (
        <div className="container">
          <GoogleLogin
            // clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
            clientId="1029995428854-splhi6hqhgqbekdm1cu4au4ro5s49g75.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </div>
      );
  }
};

export default SocialLogin;

// import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
// import GoogleLogin from "react-google-login";
// import { socialLogin, authenticate } from "../auth";

// class SocialLogin extends Component {
//   constructor() {
//     super();
//     this.state = {
//       redirectToReferrer: false,
//     };
//   }

//   responseGoogle = (response) => {
//     console.log(response);
//     const { googleId, name, email, imageUrl } = response.profileObj;
//     const user = {
//       password: googleId,
//       name: name,
//       email: email,
//       imageUrl: imageUrl,
//     };
//     // console.log("user obj to social login: ", user);
//     socialLogin(user).then((data) => {
//       console.log("signin data: ", data);
//       if (data.error) {
//         console.log("Error Login. Please try again..");
//       } else {
//         console.log("signin success - setting jwt: ", data);
//         authenticate(data, () => {
//           this.setState({ redirectToReferrer: true });
//         });
//       }
//     });
//   };

//   render() {
//     // redirect
//     const { redirectToReferrer } = this.state;
//     if (redirectToReferrer) {
//       return <Redirect to="/" />;
//     }

//     return (
//       <GoogleLogin
//         clientId="679380407525-2cvoah9gpsjjffc5k1p6atahhf2vqfl4.apps.googleusercontent.com"
//         buttonText="Login with Google"
//         onSuccess={this.responseGoogle}
//         onFailure={this.responseGoogle}
//       />
//     );
//   }
// }

// export default SocialLogin;
