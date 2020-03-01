import React, { Component } from "react";
import { Card, Avatar, List, Popover, Button } from "antd";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from "@ant-design/icons";
import "antd/dist/antd.css";

const PropertyContext = React.createContext();

class PropertyProvider extends Component {
  state = {
    TenantPropertyList:
      // use fetch to get JSON list
      {
        id: "123",
        address: "1236 Monte Vista Place, San Luis Obispo, 93405",
        description: "yessir",
        isListed: true,
        images: ["s3:554", "s3:r234"]
      }
  };
  render() {
    return (
      <PropertyContext.Provider value={this.state}></PropertyContext.Provider>
    );
  }
}
const { SubMenu } = Menu;

const SAVE_TEXT = "save_text";
const DYNAMO_URL = "http://127.0.0.1:5000/graphql";

const saveText = data => {
  let query = `mutation {
    createWebpage(webpageData: {
      url: "${data.url}",
      html: "${encodeURI(data.html)}"
    }) {
      webpage {
        url
      }
    }
  }`;

  fetch(DYNAMO_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query
    })
  });
};

const data_ = [
  {
    title: "Tenant Group 1"
  },
  {
    title: "Tenant Group 2"
  },
  {
    title: "Tenant Group 3"
  }
];

function TenantProperty() {
  const content = (
    <div>
      <p>
        <List
          itemLayout="horizontal"
          dataSource={data_}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Tenant 1: Score, Tenant 2: Score, Tenant 3: Score"
              />
            </List.Item>
          )}
        />
      </p>
    </div>
  );
  // const menu = (
  //   <Menu>
  //     <SubMenu.Item> Tenant Group 1 (Score: 800)</SubMenu.Item>
  //       <SubMenu.Item> Fake User 1 (Score: 900)</SubMenu.Item>
  //       <Menu.Item> Rental History </Menu.Item>
  //
  //    <SubMenu.Item> Tenant Group 1 (Score: 800)</SubMenu.Item>
  //       <SubMenu.Item> Fake User 1 (Score: 900)</SubMenu.Item>
  //       <Menu.Item> Rental History </Menu.Item>
  //
  //   </Menu>
  // );

  const data = [
    {
      title: "3423 Fake Way, Jupiter, Our Solar System",
      img:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Shack_in_Pigeon_Forge%2C_TN_by_Zachary_Davies.jpg/1200px-Shack_in_Pigeon_Forge%2C_TN_by_Zachary_Davies.jpg",
      description: "$2000/Month,\nCurrent Rent Score: score\n",
      profpic:
        "https://i.pinimg.com/originals/54/ce/4f/54ce4f9a4d20898ebdfcef56e380c9a3.jpg"
    },
    {
      title: "5555 Five Avenue, Mars, Madagascar",
      img:
        "https://cdn.trendir.com/wp-content/uploads/old/house-design/2014/04/01/artsy-3-storey-home-built-31--shipping-containers-1-exterior.jpg",
      description: "$9000/Month,\nCurrent Rent Score: score\n",
      profpic:
        "https://i.pinimg.com/originals/54/ce/4f/54ce4f9a4d20898ebdfcef56e380c9a3.jpg"
    },
    {
      title: "1 Hundred Drive, One, Hundred",
      img:
        "https://cdn.vox-cdn.com/thumbor/v50pGMVrvY7niDThL81g8F69eC8=/0x0:3760x2500/1820x1213/filters:focal(1580x950:2180x1550):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/65135516/shutterstock_349464740.0.jpg",
      description: "$5000/Month,\nCurrent Rent Score: score\n",
      profpic:
        "https://i.pinimg.com/originals/54/ce/4f/54ce4f9a4d20898ebdfcef56e380c9a3.jpg"
    }
  ];

  const { Meta } = Card;

  return (
    <div className="RelevantReferences">
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data} // change to state
        renderItem={item => (
          <List.Item>
            <List.Item.Meta />
            <Card
              style={{ width: 300 }}
              cover={<img alt="example" src={item.img} />}
              // actions={[
              //   <SettingOutlined key="setting" />,
              //   <EditOutlined key="edit" />,
              //   <EllipsisOutlined key="ellipsis" />
              // ]}
              hoverable={true}
            >
              <Meta
                avatar={<Avatar src={item.profpic} size={64} />}
                title={item.title}
                description={item.description}
              />
              {/*<Dropdown overlay={menu}>*/}
              {/*    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>*/}
              {/*    Applicants <DownOutlined />*/}
              {/*    </a>*/}
              {/*</Dropdown>*/}
              <Popover content={content} title="">
                <Button type="primary"> Applicants </Button>
              </Popover>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default TenantProperty;
