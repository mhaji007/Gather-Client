import React, {useState, useEffect} from 'react'
import axios from "axios"
import { isAuth } from "../../components/helpers/auth";

function EditProfile({ match: { params } }) {
  const [state, setState] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/user/${params.userId}`,
        {
          headers: {
            Authorization: `Bearer ${isAuth().data.token}`,
          },
        }
      );
      setState({
        id: response.data._id,
        name: response.data.name,
        email: response.data.email,
      });
    } catch (error) {
      console.log("error from profile", error);
      // User trying to access this
      // resource is not authenticated
      setState({ redirectToSignin: true });
    }
  };
  // Retrieve user info on component mount
  // and on userId change
  useEffect(() => {
    getUser();
  }, [params.userId]);

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Edit Profile</h2>
    </div>
  );
}

export default EditProfile
