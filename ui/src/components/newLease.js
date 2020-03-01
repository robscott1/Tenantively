import React from "react";
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

class DrawerForm extends React.Component {
  state = {visible: false};

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

    render()
    {
      return (
          <div>
            <Button type="primary" onClick={this.showDrawer}>
              <PlusOutlined/> Register Property
            </Button>
            <Drawer
                title="Register a New Property"
                width={720}
                onClose={this.onClose}
                visible={this.state.visible}
                bodyStyle={{paddingBottom: 80}}
                footer={
                  <div
                      style={{
                        textAlign: 'right',
                      }}
                  >
                    <Button
                        onClick={this.onClose}
                        style={{marginRight: 8}}
                    >
                      Cancel
                    </Button>
                    <Button onClick={this.onClose} type="primary">
                      Submit
                    </Button>
                  </div>
                }
            >
              <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Address"
                        rules={[{required: true, message: 'Please enter user name'}]}
                    >
                      <Input placeholder="Please enter the address"/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                        name="maximum occupancy"
                        label="Maximum Occupancy"
                        rules={[{required: true, message: 'Please enter the maximum occupancy'}]}
                    >
                      {/*<Select placeholder="Please choose the approver">*/}
                      {/*  <Option value="jack">Jack Ma</Option>*/}
                      {/*  <Option value="tom">Tom Liu</Option>*/}
                      {/*</Select>*/}
                      <Input
                        style={{width: '100%'}}
                        placeholder="Please enter the maximum occupancy"
                        />

                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    name="url"*/}
                    {/*    label="Url"*/}
                    {/*    rules={[{required: true, message: 'Please enter url'}]}*/}
                    {/*>*/}
                    {/*  <Input*/}
                    {/*      style={{width: '100%'}}*/}
                    {/*      addonBefore="http://"*/}
                    {/*      addonAfter=".com"*/}
                    {/*      placeholder="Please enter url"*/}
                    {/*  />*/}
                    {/*</Form.Item>*/}
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                        name="owner"
                        label="Owner"
                        rules={[{required: true, message: 'Please enter name of owner'}]}
                    >
                      {/*<Select placeholder="Please select an owner">*/}
                      {/*  <Option value="xiao">Xiaoxiao Fu</Option>*/}
                      {/*  <Option value="mao">Maomao Zhou</Option>*/}
                      {/*</Select>*/}
                      <Input
                        style={{width: '100%'}}
                        placeholder="Please enter name of owner"
                        />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[{required: true, message: 'Please choose the type of property'}]}
                    >
                      <Select placeholder="Please choose the type of property">
                        <Option value="House">House</Option>
                        <Option value="Apartment">Apartment</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                        name="monthly rent"
                        label="Monthly Rent"
                        rules={[{required: true, message: 'Please enter the monthly rent'}]}
                    >
                      {/*<Select placeholder="Please choose the approver">*/}
                      {/*  <Option value="jack">Jack Ma</Option>*/}
                      {/*  <Option value="tom">Tom Liu</Option>*/}
                      {/*</Select>*/}
                      <Input
                        style={{width: '100%'}}
                        placeholder="Please enter the monthly rent"
                        />

                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                        name="lease length"
                        label="Lease Length"
                        rules={[{required: true, message: 'Please enter the length of the lease'}]}
                    >
                      <DatePicker.RangePicker
                          style={{width: '100%'}}
                          getPopupContainer={trigger => trigger.parentNode}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter any additional details',
                          },
                        ]}
                    >
                      <Input.TextArea rows={4} placeholder="Please enter any additional details"/>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Drawer>
          </div>
      );
    }
  }

export default DrawerForm;