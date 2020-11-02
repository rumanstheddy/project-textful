import React from "react";

const UserProfile = (props) => {
    let user = props.location.state;
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">UserName</th>
          <th scope="col">FirstName</th>
          <th scope="col">LastName</th>
        </tr>
      </thead>
      <tbody>
        <tr key={user._id}>
          <td>{user.userName}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserProfile;