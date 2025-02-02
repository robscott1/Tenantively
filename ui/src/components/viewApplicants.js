import React, { useContext } from "react";
import { Drawer, List, Avatar, Divider, Col, Row, Statistic, Card } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ScissorOutlined
} from "@ant-design/icons";

const pStyle = {
  fontSize: 16,
  lineHeight: "24px",
  display: "block",
  marginBottom: 16
};

const data = [
  {
    nameOnApp: "Jay",
    tenantScore: 9,
    namesOfGroup: ["Jay", "Tito", "Lola"]
  },
  {
    nameOnApp: "Austin",
    tenantScore: 2,
    namesOfGroup: ["Brooke", "Kiley", "Lola"]
  },
  {
    nameOnApp: "Gabe",
    tenantScore: 3.14,
    namesOfGroup: ["Brooke", "Kiley", "Lola"]
  },
  {
    nameOnApp: "Rob",
    tenantScore: -8,
    namesOfGroup: ["Brooke", "Kiley", "Lola"]
  }
];
const DescriptionItem = ({ title, content }) => (
  <div
    className="site-description-item-profile-wrviewApplicants
    er"
    style={{
      fontSize: 14,
      lineHeight: "22px",
      marginBottom: 7
    }}
  >
    <p
      className="site-description-item-profile-p"
      style={{
        marginRight: 8,
        display: "inline-block"
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

class viewApplicants extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <List
          dataSource={data}
          bordered
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <a onClick={this.showDrawer} key={`a-${item.id}`}>
                  View Profile
                </a>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                }
                title={
                  <a href="https://ant.design/index-cn">{item.nameOnApp}</a>
                }
                description={item.tenantScore}
              />
            </List.Item>
          )}
        />
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p
            className="site-description-item-profile-p"
            style={{ ...pStyle, marginBottom: 24 }}
          >
            User Profile
          </p>
          <p className="site-description-item-profile-p" style={pStyle}>
            Personal
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Applicant Names" content="Lily" />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Account"
                content="AntDesign@example.com"
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="City" content="HangZhou" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Country" content="China🇨🇳" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Birthday" content="February 2,1900" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Website" content="-" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Blurb"
                content="Make things as simple as possible but no simpler."
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p" style={pStyle}>
            Scores
          </p>
          <Row>
            <Col span={12}>
              <Row gutter={16}>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="RentScore"
                      value={9.9}
                      precision={2}
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<ArrowUpOutlined />}
                      suffix="%"
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="ExpenseScore"
                      value={5.3}
                      precision={2}
                      valueStyle={{ color: "#cf1322" }}
                      prefix={<ScissorOutlined />}
                    />
                  </Card>
                </Col>
              </Row>

              <DescriptionItem title="Position" content="Programmer" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Responsibilities" content="Coding" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Department" content="XTech" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Skills"
                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p" style={pStyle}>
            Contacts
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Email" content="AntDesign@example.com" />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Phone Number"
                content="+86 181 0000 0000"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Github"
                content={
                  <a href="http://github.com/ant-design/ant-design/">
                    github.com/ant-design/ant-design/
                  </a>
                }
              />
            </Col>
          </Row>
        </Drawer>
      </div>
    );
  }
}
export default viewApplicants;
