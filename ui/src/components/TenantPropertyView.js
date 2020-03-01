import React from "react";
import {Card, Avatar, List, Popover, Button} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";



function TenantProperty() {

    const content = (
    <div>
        <p>Tenant Group 1 (Mean Score: Num) </p>
        <p>Tenant Group 2 (Mean Score: Num) </p>
    </div>
    );

    const data = [
            {
                title: "Jay's house",
                img:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Shack_in_Pigeon_Forge%2C_TN_by_Zachary_Davies.jpg/1200px-Shack_in_Pigeon_Forge%2C_TN_by_Zachary_Davies.jpg",
                description: "Its Smol",
                profpic: null
            },
            {
                title: "Gabriel's House",
                img: "https://cdn.trendir.com/wp-content/uploads/old/house-design/2014/04/01/artsy-3-storey-home-built-31--shipping-containers-1-exterior.jpg",
                description: "fuckin so lit",
                profpic: null
            },
            {
                title: "Your mom's House",
                img: "https://cdn.vox-cdn.com/thumbor/v50pGMVrvY7niDThL81g8F69eC8=/0x0:3760x2500/1820x1213/filters:focal(1580x950:2180x1550):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/65135516/shutterstock_349464740.0.jpg",
                description: "I've been here",
                profpic: null
            }

        ];

    const { Meta } = Card;


    return (
        <div className="RelevantReferences">
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
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
              hoverable = {true}
            >
              <Meta
                avatar={<Avatar src={item.profpic} size={64} />}
                title={item.title}
                description={item.description}
              />

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