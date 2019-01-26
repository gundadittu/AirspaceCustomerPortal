import React from 'react';
import {
    Button, Modal, Form, Input, Radio, Checkbox, Row, Col
} from 'antd';


class CreateRoomForm extends React.Component {

    render() {

        const {
            visible, onCancel, onCreate, form, confirmLoading
        } = this.props;
        const { getFieldDecorator } = form;

        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
          },
        };
        const formItemLayoutWithOutLabel = {
          wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
          },
        };

        const formTitle = "Add a Conference Room to My Office"; //implement current office+this.props.formTitle;

        return (
            <Modal
                visible={visible}
                title= {formTitle}
                okText="Add"
                onCancel={onCancel}
                onOk={onCreate}
                confirmLoading={confirmLoading}
            >
                <Form layout="vertical">
                    <Form.Item label="Room Name">
                        {getFieldDecorator('roomName', {
                            rules: [{ required: true, whitespace: true, message: 'Please input the room\'s name.' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout}
                      label="Amenities"
                    >
                      {getFieldDecorator("checkbox-group", {})(
                        <Checkbox.Group style={{ width: "100%" }}>
                          <Row>
                            <Col span={8}><Checkbox value="Whiteboard">Whiteboard</Checkbox></Col>
                            <Col span={8}><Checkbox value="conferenceCallPhone">Conference Call Phone</Checkbox></Col>
                            <Col span={8}><Checkbox value="largeMonitor">Large Monitor</Checkbox></Col>
                            <Col span={8}><Checkbox value="screenSharing">Screen Sharing</Checkbox></Col>
                            <Col span={8}><Checkbox value="Video Conferencing">Video Conferencing</Checkbox></Col>
                          </Row>
                        </Checkbox.Group>
                      )}
                    </Form.Item>
                    <Form.Item label="Image URL">
                        {getFieldDecorator('imageURL', {
                            validateTrigger: 'onBlur',
                            rules: [{ required: false}],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item className="collection-create-form_last-form-item">
                        {getFieldDecorator('reserveable', {
                            initialValue: 'regular',
                        })(
                            <Radio.Group>
                                <Radio value="active">Reserveable</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>

                    <Form.Item className="collection-create-form_last-form-item">
                        {getFieldDecorator('activityType', {
                            initialValue: 'regular',
                        })(
                            <Radio.Group>
                                <Radio value="active">Active</Radio>
                                <Radio value="inactive">Inactive</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}


export default Form.create({ name: 'createRoomForm' })(CreateRoomForm);
