import React, { useState, useContext } from "react";
import { Button, List, Card, message, Avatar, Popover } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  RightCircleOutlined
} from "@ant-design/icons";
import { AppContext } from "../AppContext";

import "antd/dist/antd.css";

//console.log(jon);

function PropertyViewer() {
  const [property, setProperty
  ] = useState([
    {
      property: { url: "https://it.wikipedia.org/wiki/Ethereum" },
      previewText:
        "Ethereum is a **decentralized Web 3.0 platform** for the creation and peer-to-peer publication of smart contracts created in a Turing-complete programming language."
    }
  ]);
  let properties = fetch(
    "https://o97j8ka4dd.execute-api.us-west-2.amazonaws.com/Prod/properties",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        requestType: "GET",
        property: {
          // id: "125",
          propertyManagerId: "321"
          // address: "657 Park Avenue",
          // currentLeaseId: "04294",
          // description: "San Luis Obispo, 93405",
          // size: "50 bed,  90 bed",
          // isListed: true,
          // leaseContracts: ["345534", "5432", "53243"],
          // applications: ["4254232", "w5254f", "dja5432"],
          // images: [
          //   "https://images.adsttc.com/media/images/5de3/1ca6/3312/fda8/2a00/00b3/newsletter/001.jpg?1575165037",
          //   "https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg",
          //   "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          // ],
          // leaseTerms: ["54b3f", "fj3yk4i2", "jfdgh324"]
        }
      })
    }
  )
    .then(response => {
      return response.json();
    })
    .then(response => {
      setProperty
      (response);
      console.log(property[0].address);
    });

  const state = useContext(AppContext);

  const data = [
    {
      title: state.lego,
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
        dataSource={property}
        renderItem={item => (
          <List.Item>
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src={
                    "https://spockandchristine.com/wp-content/uploads/2019/02/yolo.jpg"
                  }
                />
              }
            >
              <Meta title={item.address} description={item.description} />
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
