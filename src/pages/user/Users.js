import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
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
              top
              width="100%"
              height="300vw"
              objectFit="cover"
              src="./avatar.png"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h5">{user.name}</CardTitle>
              {/* <CardSubtitle tag="h6" className="mb-2 text-muted">
                Card subtitle
              </CardSubtitle> */}
              <CardText>
               {user.email}
              </CardText>
              <btn className="btn btn-sm border border-dark rounded text-dark">
                View Profile
              </btn>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Users;
