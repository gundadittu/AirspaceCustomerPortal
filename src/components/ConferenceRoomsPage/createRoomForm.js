import React from 'react';
import {
  Button, Modal, Form, Input, Radio, Checkbox, Row, Col, Icon, Upload, message, InputNumber
} from 'antd';
import './createRoomForm.css';

class CreateRoomForm extends React.Component {

  state = { 
    fileList: []
  };

  removeAmenity = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  id = 0;

  addAmenity = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(++this.id);
    form.setFieldsValue({
      keys: nextKeys
    });
  }

  uploadChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  roomPhotoFile = (e) => {
    if (Array.isArray(e)) {
      this.state.fileList = e; 
      return e;
    }
    this.state.fileList = e.fileList || e; 
    return e && e.fileList;
  }

  render() {

    const {
      visible, onCancel, onCreate, form, confirmLoading,
    } = this.props;
    const { getFieldDecorator, getFieldValue } = form;

    const uploadProps = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      }
    }

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
        sm: { span: 20, offset: 0 },
      },
    };

    const formTitle = "Add a Conference Room";

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys') || [];
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        required={false}
        key={k}
      >
        {getFieldDecorator(`customAmenities[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: false,
            whitespace: true,
            message: "Please input an amenity or delete this field.",
          }],
        })(
          <Input placeholder="Amenity" value={this.state.customAmenities[k]} style={{ width: '60%', marginRight: 8 }} />
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
        
    let uploadDisabled = false; 
    if (this.state.fileList.length >= 1) { 
      uploadDisabled = true;
    }

    return (
      <Modal
        visible={visible}
        title={formTitle}
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
          <Form.Item label="Capacity">
            {getFieldDecorator('capacity', {})(
              <InputNumber min={0} />
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Amenities"
          >
            {getFieldDecorator("standardAmenities", {})(
              <Checkbox.Group style={{ width: "100%" }}>
                <Row>
                  <Col span={24}><Checkbox value="whiteBoard">Whiteboard</Checkbox></Col>
                  <Col span={24}><Checkbox value="screenSharing">Screen Sharing</Checkbox></Col>
                  <Col span={24}><Checkbox value="videoConferencing">Video Conferencing</Checkbox></Col>
                </Row>
              </Checkbox.Group>
            )}
            <Form.Item {...formItemLayoutWithOutLabel}>
              {formItems}
              <Button type="dashed" onClick={this.addAmenity} style={{ width: '60%' }}>
                <Icon type="plus" /> Add Amenity
                        </Button>
            </Form.Item>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Upload Image"
          >
            {getFieldDecorator('uploadPhoto', {
              getValueFromEvent: this.roomPhotoFile
            })(
              <Upload {...uploadProps} disabled={uploadDisabled} fileList={this.state.fileList} accept='.png, jpg, jpeg' onChange={(info) => this.uploadChange(info)}>
                <Button>
                  <Icon type="upload" /> Click to add a photo.
              </Button>
              </Upload>,
            )}
          </Form.Item>

          <Form.Item className="collection-create-form_last-form-item">
            {getFieldDecorator('reserveable', {
              initialValue: ['reserveable'],
            })(
              <Checkbox.Group style={{ width: "100%" }}>
                <Row>
                  <Col span={24}><Checkbox value="reserveable">Reserveable</Checkbox></Col>
                </Row>
              </Checkbox.Group>
            )}
          </Form.Item>


          <Form.Item className="collection-create-form_last-form-item">
            {getFieldDecorator('activeStatus', {
              rules: [{ required: true, whitespace: true, message: 'Please choose an active status for this room.' }],
              initialValue: 'active',
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
