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

function Users() {
  const [users, setUsers] = useState([]);

  const listUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/users`);
      setUsers(response.data);
    } catch (error) {
      console.log("error from users", error);
    }
  };

  useEffect(() => {
    listUsers();
  }, []);



  return (
    <div className="container">
      <div className="row">
        {users.map((user, i) => (
          <Card key={i} className="col-md-4 ml-2">
            <CardImg
              className="img-thumbnail"
              top
              width="100%"
              // height="320vw"
              objectFit="cover"
              src={`${process.env.REACT_APP_API}/user/photo/${
                user._id
              }?${new Date().getTime()}`}
              alt="Card image cap"
              onError={i => (i.target.src = "/avatar.png")}
              style={{height:"420px"}}
            />
            <CardBody>
              <CardTitle tag="h5">{user.name}</CardTitle>
              {/* <CardSubtitle tag="h6" className="mb-2 text-muted">
                Card subtitle
              </CardSubtitle> */}
              <CardText>{user.email}</CardText>
              <Link
                to={`/user/${user._id}`}
                className="btn btn-sm border border-dark rounded text-dark"
              >
                View Profile
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Users;
