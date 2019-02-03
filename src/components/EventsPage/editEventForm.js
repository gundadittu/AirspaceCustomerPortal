import React from 'react';
import {
    Button, Modal, Form, Input, Radio, Checkbox, Row, Col, Icon, Upload, message, InputNumber, DatePicker
} from 'antd';
import '../ConferenceRoomsPage/createRoomForm.css';

const { RangePicker } = DatePicker;

let id = 0;

class EditEventForm extends React.Component {

  state = {
    fileList: []
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
      this.setState({fileList: e});
      return e;
    }
    this.setState({fileList: (e.fileList || e)});
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

    const formTitle = "Edit Event";
    getFieldDecorator('keys', { initialValue: [] });

    let uploadDisabled = false;
    if (this.state.fileList.length >= 1) {
      uploadDisabled = true;
    }
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    };

    var selectedEvent = this.props.event;
    return (
      <Form layout="vertical">
        <Form.Item label="Event Name">
          {getFieldDecorator('roomName', {
            rules: [{ required: true, whitespace: true, message: 'Please input the room\'s name.' }],
          })(
            <Input disabled={confirmLoading}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Event Date"
        >
          {getFieldDecorator('range-time-picker', rangeConfig)(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            rules: [{ required: true, whitespace: true, message: 'Please input a description.' }],
          })(
            <Input.TextArea/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Upload Image"
        >
          {getFieldDecorator('uploadPhoto', {
            getValueFromEvent: this.eventPhotoFile
          })(
            <Upload {...uploadProps} disabled={uploadDisabled || confirmLoading} fileList={this.state.fileList} accept='.png, jpg, jpeg' onChange={(info) => this.uploadChange(info)}>
              <Button>
                <Icon type="upload" /> Click to add a photo.
            </Button>
            </Upload>,
          )}
        </Form.Item>
      </Form>
    );
  }
}


export default Form.create({ name: 'editEventForm' })(EditEventForm);
