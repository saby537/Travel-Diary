import React from "react";
import UserItem from "./user-item";
import "./user-list.css";

const UserList = (props) => {
  return (
    <ul className="users-list">
      {props.item.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          image={user.image}
          placeCount={user.placeCount}
        />
      ))}
    </ul>
  );
};

export default UserList;
