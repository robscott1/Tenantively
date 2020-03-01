import React, { useState } from "react";
import { Button, List, Card, message, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from "@ant-design/icons";

import "antd/dist/antd.css";

function RelevantReferences() {
  //   const [data, setData] = useState([
  //     {
  //       webPage: {
  //         url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
  //       },
  //       previewText:
  //         "Ethereum is a **decentralized Web 3.0 platform** for the creation and peer-to-peer publication of smart contracts created in a Turing-complete programming language."
  //     },
  //     {
  //       webPage: { url: "https://openai.com/blog/musenet/" },
  //       previewText:
  //         "MuseNet uses the same general-purpose unsupervised technology as **GPT-2**, a large-scale **transformer model** trained to predict the next token in a **sequence**, whether audio or text."
  //     }
  //   ]);

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

  //   const handleCite = item => {
  //     message.info("Write the DocumentEditor Jay");
  //   };

  //   const handleCloseReference = item => {
  //     console.log(item);
  //     setData(data.filter(entry => entry.webPage.url !== item.webPage.url));
  //   };

  const { Meta } = Card;

  return (
    <div className="RelevantReferences">
      {/* <Row gutter={[16, 16]}>
        <Col span={8}>
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
        </Col>
        <Col span={8} />
        <Col span={8} />
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8} />
        <Col span={8} />
        <Col span={8} />
      </Row> */}
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

export default RelevantReferences;
