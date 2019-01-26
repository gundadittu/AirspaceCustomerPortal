import React from 'react';
import {
    Button, Modal, Form, Input, Radio, Checkbox, Row, Col, Icon
} from 'antd';

let id = 0;

class CreateRoomForm extends React.Component {

  removeAmenity = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

    addAmenity = () => {
       const { form } = this.props;
       // can use data-binding to get
       const keys = form.getFieldValue('keys');
       const nextKeys = keys.concat(++id);
       // can use data-binding to set
       // important! notify form to detect changes
       form.setFieldsValue({
         keys: nextKeys,
       });
    }

    render() {

        const {
            visible, onCancel, onCreate, form, confirmLoading,
        } = this.props;
        const { getFieldDecorator, getFieldValue} = form;

        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');

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


        const formItems = keys.map((k, index) => (
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? 'Amenities' : ''}
            required={false}
            key={k}
          >
            {getFieldDecorator(`names[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: false,
                whitespace: true,
                message: "Please input an amenity or delete this field.",
              }],
            })(
              <Input placeholder="Amenity" style={{ width: '60%', marginRight: 8 }} />
            )}
            {keys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.removeAmenity(k)}
              />
            ) : null}
          </Form.Item>
        ));
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
                      <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={this.addAmenity} style={{ width: '60%' }}>
                          <Icon type="plus" /> Add field
                        </Button>
                      </Form.Item>
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
