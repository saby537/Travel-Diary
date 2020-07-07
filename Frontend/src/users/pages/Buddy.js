import React from "react";
import UserList from "../components/user-list";
import "./Buddy.css";

const background = require("../../Images/andrew-neel-1-29wyvvLJA-unsplash.jpg");
const Buddy = () => {
  const Users = [
    {
      id: 1,
      name: "Jacob",
      image:
        "https://image.freepik.com/free-vector/gamer-mascot-geek-boy-esports-logo-avatar-with-headphones-glasses-cartoon-character_8169-228.jpg",
      placeCount: 1,
    },
    {
      id: 2,
      name: "Philip",
      image:
        "https://i.pinimg.com/236x/90/a6/51/90a6518ff47beceb458e81c5767509b6.jpg",
      placeCount: 4,
    },
    {
      id: 3,
      name: "Stefan",
      image:
        "https://png.pngtree.com/png-vector/20190511/ourmid/pngtree-blue-assassin-esports-logo-for-gaming-mascot-png-image_1038929.jpg",
      placeCount: 2,
    },
    {
      id: 4,
      name: "Scott",
      image:
        "https://image.freepik.com/free-vector/pro-gamer-avatar-logo_71220-49.jpg",
      placeCount: 1,
    },
  ];
  const Styles = {
    backgroundImage: `url(${background})`,
  };
  return (
    <React.Fragment>
      <div className="parallax" style={Styles} />
      <div className="list">
        <UserList item={Users} />
      </div>
    </React.Fragment>
  );
};

export default Buddy;
