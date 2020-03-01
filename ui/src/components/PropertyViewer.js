import React, { useState, useContext } from "react";
import { Button, List, Card, message, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  RightCircleOutlined
} from "@ant-design/icons";
import { AppContext } from "../AppContext";

import "antd/dist/antd.css";

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
        // id: "124",
        propertyManagerId: "321",
        // address: "183 Hathway Avenue",
        // currentLeaseId: "04293",
        // description: "San Luis Obispo, 93405",
        // size: "50 bed,  90 bed",
        // isListed: true,
        // leaseContracts: ["345534", "5432", "53243"],
        // applications: ["4254232", "w5254f", "dja5432"],
        // images: [
        //   "https://media.architecturaldigest.com/photos/58fe517e1732ef7d3c2b9c6c/master/w_1600%2Cc_limit/eebbbf97-82ad-456b-b151-48cb92cac20c.jpg",
        //   "https://i.insider.com/57362ea7910584cc008c2ed5?width=750&format=jpeg&auto=webp",
        //   "https://assets.hamptons-international.com/resized/width-870/height-578/fit-crop/path-assets/picture/v1/BRBISVS2785-_images_original_nightphototwilightdiff.angle.jpg"
        // ],
        // leaseTerms: ["5423f", "fj32k4i2", "jfdsh324"]
      }
    })
  }
)
  .then(response => {
    return response.json();
  })
  .then(response => console.log(response));

//console.log(jon);

function PropertyViewer() {
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
