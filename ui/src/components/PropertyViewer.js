import React, { useState } from "react";
import { Button, List, Card, message, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from "@ant-design/icons";

import "antd/dist/antd.css";

function PropertyViewer() {
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

  const { Meta } = Card;

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
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />
              ]}
            >
              <Meta
                avatar={<Avatar src={item.profpic} size={64} />}
                title={item.title}
                description={item.description}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default PropertyViewer;
