import React from 'react';
import {
  Button, Form, Input, Icon, Upload, message, DatePicker, Checkbox, Row, Col
} from 'antd';
import moment from 'moment';
import '../ConferenceRoomsPage/createRoomForm.css';

const { RangePicker } = DatePicker;

class EditEventForm extends React.Component {

  state = {
    fileList: []
  }

  uploadChange(info) {
    // if (info.file.status !== 'uploading') {
    //   console.log(info.file, info.fileList);
    // }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  roomPhotoFile = (e) => {
    if (Array.isArray(e)) {
      this.setState({ fileList: e });
      return e;
    }
    this.setState({ fileList: (e.fileList || e) });
    return e && e.fileList;
  }

  eventPhotoFile = (e) => {
    if (Array.isArray(e)) {
      this.setState({ fileList: e });
      return e;
    }
    this.setState({ fileList: (e.fileList || e) });
    return e && e.fileList;
  }

  render() {

    const {
      visible, event, confirmLoading, form
    } = this.props;
    const { getFieldDecorator } = form;

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

    let uploadDisabled = false;
    if (this.state.fileList.length >= 1) {
      uploadDisabled = true;
    }
    const rangeConfig = {
      initialValue: [moment(event.startDate || null), moment(event.endDate || null)],
      rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    };

    if (visible === false) {
      return null
    }

    return (
      <Form layout="vertical">
        <Form.Item label="Event Name">
          {getFieldDecorator('eventName', {
            initialValue: event.title || null,
            rules: [{ required: true, whitespace: true, message: 'Please input the event\'s name.' }],
          })(
            <Input disabled={confirmLoading} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Event Timeframe"
        >
          {getFieldDecorator('eventTimeRange', rangeConfig)(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" disabled={confirmLoading} />
          )}
        </Form.Item>
        <Form.Item label="Event Address">
          {getFieldDecorator('eventAddress', {
            rules: [{ required: true, whitespace: true, message: 'Please input the event\'s address.' }],
          })(
            <Input defaultValue="26888888" />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            initialValue: event.description || null,
            rules: [{ required: true, whitespace: true, message: 'Please input a description.' }],
          })(
            <Input.TextArea disabled={confirmLoading} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Upload Image"
        >
          {getFieldDecorator('uploadPhoto', {
            getValueFromEvent: this.eventPhotoFile
          })(
            <Upload {...uploadProps} disabled={uploadDisabled || confirmLoading} fileList={this.state.fileList} accept='.png, .jpg, .jpeg' onChange={(info) => this.uploadChange(info)}>
              <Button>
                <Icon type="upload" /> Click to add a photo.
            </Button>
            </Upload>,
          )}
        </Form.Item>
        <Form.Item className="collection-create-form_last-form-item">
            {getFieldDecorator('cancelStatus', {
              initialValue: (event.canceled === true) ? ['cancelled'] : [],
            })(
              <Checkbox.Group style={{ width: "100%" }}>
                <Row>
                  <Col span={24}><Checkbox disabled={confirmLoading} value="cancelled">Cancel this Event</Checkbox></Col>
                </Row>
              </Checkbox.Group>
            )}
          </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'editEventForm' })(EditEventForm);
