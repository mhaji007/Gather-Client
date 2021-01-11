import React, { useState, useEffect } from "react";
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
      <h2 className="mt-5 mb-5">
        {users.map((user, i) => (
          <div key={i}>
            <p>{user.name}</p>
          </div>
        ))}
      </h2>
    </div>
  );
}

export default Users;
