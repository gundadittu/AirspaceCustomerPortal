import React from 'react';
import {
  Button, Modal, Form, Input, Icon, Upload, message, DatePicker
} from 'antd';
import '../ConferenceRoomsPage/createRoomForm.css';
const { RangePicker } = DatePicker;

class CreateEventForm extends React.Component {

  state = {
    fileList: []
  };

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

  eventPhotoFile = (e) => {
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

    const formTitle = "Add an Event";

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys') || [];

    let uploadDisabled = false;
    if (this.state.fileList.length >= 1) {
      uploadDisabled = true;
    }
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select data & time!' }],
    };

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
          <Form.Item label="Event Name">
            {getFieldDecorator('eventName', {
              rules: [{ required: true, whitespace: true, message: 'Please input the event\'s name.' }],
            })(
              <Input disabled={confirmLoading}/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Event Timeframe"
          >
            {getFieldDecorator('eventTimeRange', rangeConfig)(
              <RangePicker showTime format="MMMM Do YYYY, h:mm:ss a"  disabled={confirmLoading}/>
            )}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator('description', {
              rules: [{ required: true, whitespace: true, message: 'Please input a description.' }],
            })(
              <Input.TextArea  disabled={confirmLoading}/>
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
      </Modal>
    );
  }
}

export default Form.create({ name: 'createEvent' })(CreateEventForm);
