import React from "react";
import {
  Card,
  Avatar,
  List,
  Popover,
  Button,
  Menu,
  Dropdown,
  Icon
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DownOutlined,
  DollarCircleOutlined
} from "@ant-design/icons";
import "antd/dist/antd.css";

function CurrentLease() {
  function handleMenuClick(e) {
    console.log("click", e);
  }
  const content = (
    <div>
      <p>Due on March 25 </p>
    </div>
  );

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Dispute a Charge</Menu.Item>
      <Menu.Item key="2">View Payment History</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );

  const { Meta } = Card;
  const photo =
    "https://s3st3.openlistings.com/images/properties/v2/5c3f91c171a6094f5259b2dc/1280/792/5c4df09e71a60974e35b9d5f.jpg";
  const rent = "$900";
  const address = "183 Hathaway Avenue";
  const description = "San Luis Obispo, California";
  const dateDue = new Date();

  let curDate = new Date();
  let date = curDate.getDate();
  let month = curDate.getMonth() + 1;
  let year = curDate.getFullYear();
  // if dayDue > today then make button red

  if (dateDue.getDate <= curDate.getDate) {
    var rentButton = (
      <Button type="primary" danger>
        {" "}
        {<DollarCircleOutlined />} Pay Rent (Overdue)
      </Button>
    );
  } else {
    var rentButton = (
      <Button type="primary"> {<DollarCircleOutlined />}Pay Rent</Button>
    );
  }

  var br = <br />;

  return (
    <div className="Lease">
      <Card
        style={{ width: 300 }}
        cover={<img alt="example" src={photo} />}
        hoverable={true}
      >
        <Meta title={address} description={description} />
        <span> {"                              "} </span>
        <span> {"                              "} </span>
        {br}
        <Popover content={content} title="">
          <Button type="primary" danger>
            {" "}
            {<DollarCircleOutlined />} Pay Rent (Overdue)
          </Button>
          <span> {"   "} </span>
          <Button>Report Issue</Button>
          <Dropdown overlay={menu}>
            <Button>
              Actions <DownOutlined />
            </Button>
          </Dropdown>
        </Popover>
      </Card>
    </div>
  );
}

export default CurrentLease;
