import React, { useState } from "react";
import { Button, List, Card, message, Avatar, Input } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from "@ant-design/icons";

import "antd/dist/antd.css";

function Search() {
  const data = [
    {
      title: "1236 Monte Vista Place, SLO",
      img: "https://spockandchristine.com/wp-content/uploads/2019/02/yolo.jpg",
      description: "Beautiful single family home located in Stockton",
      profpic:
        "https://content-calpoly-edu.s3.amazonaws.com/greeklife/1/images/IMG_2302.jpg"
    },
    {
      title: "IG",
      img: "https://spockandchristine.com/wp-content/uploads/2019/02/yolo.jpg",
      description: "yessir",
      profpic: "https://www.linkedin.com/in/austin-silveria/detail/photo/"
    },
    {
      title: "Lol",
      img: "https://spockandchristine.com/wp-content/uploads/2019/02/yolo.jpg",
      description: "yessir",
      profpic: "https://www.linkedin.com/in/austin-silveria/detail/photo/"
    },
    {
      title: "Hi",
      img: "https://spockandchristine.com/wp-content/uploads/2019/02/yolo.jpg",
      description: "yessir",
      profpic: "https://www.linkedin.com/in/austin-silveria/detail/photo/"
    }
  ];

  const { Search } = Input;

  return (
    <div
      className="Search
    "
    >
      <Search placeholder="input search loading deault" loading />
      <br />
      <br />
      <Search
        placeholder="input search loading with enterButton"
        loading
        enterButton
      />
    </div>
  );
}

export default Search;
