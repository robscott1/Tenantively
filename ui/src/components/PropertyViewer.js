import React, { useState } from "react";
import {
  Content,
  Button,
  List,
  Card,
  message,
  Avatar,
  Popover,
  Menu,
  Dropdown
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  RightCircleOutlined
} from "@ant-design/icons";

import "antd/dist/antd.css";

function PropertyViewer() {
  const data = [
    {
      streetNum: "1236 Monte Vista Place",
      img: "https://spockandchristine.com/wp-content/uploads/2019/02/yolo.jpg",
      cityZip: "San Luis Obispo, CA 95630",
      profpic:
        "https://content-calpoly-edu.s3.amazonaws.com/greeklife/1/images/IMG_2302.jpg"
    },
    {
      streetNum: "440 Orange Street",
      img: "https://spockandchristine.com/wp-content/uploads/2019/02/yolo.jpg",
      cityZip: "San Luis Obispo, CA 95630",
      profpic: "https://www.linkedin.com/in/austin-silveria/detail/photo/"
    },
    {
      streetNum: "180 Calendebara Court",
      img: "https://spockandchristine.com/wp-content/uploads/2019/02/yolo.jpg",
      cityZip: "San Luis Obispo, CA 95630",
      profpic: "https://www.linkedin.com/in/austin-silveria/detail/photo/"
    },
    {
      streetNum: "990 Nielsen Drive",
      img: "https://spockandchristine.com/wp-content/uploads/2019/02/yolo.jpg",
      cityZip: "San Luis Obispo, CA 95630",
      profpic: "https://www.linkedin.com/in/austin-silveria/detail/photo/"
    }
  ];

  const { Meta } = Card;

  const content = (
    <div>
      <p>Due on March 25 </p>
    </div>
  );

  var br = <br />;

  return (
    <div
      className="PropertyViewer
    "
    >
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card
              style={{ width: 300 }}
              cover={<img alt="example" src={item.img} />}
            >
              <Meta
                avatar={<Avatar src={item.profpic} size={50} />}
                title={item.streetNum}
                description={item.cityZip}
              />
              {br}
              <Popover content={content} streetNum="">
                <Button type="primary"> {<RightCircleOutlined />} Apply</Button>
                <span> {"   "} </span>
                <Button type="primary">More details</Button>
              </Popover>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default PropertyViewer;
