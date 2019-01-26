import React from 'react';
// import { connect } from 'react-redux';
import {
    Button, Modal, Form, Input, Radio, Upload, Icon, message
} from 'antd';


class CreateDeskForm extends React.Component {

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

    render() {

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

        const uploadProps = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
              authorization: 'authorization-text',
          }
        }

        const {
            visible, onCancel, onCreate, form, officeObj, confirmLoading
        } = this.props;
        const { getFieldDecorator } = form;

        const formTitle = "Add a new Hot Desk "//+ officeObj.name;

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
                  <Form.Item label="Desk Name">
                      {getFieldDecorator('roomName', {
                          rules: [{ required: true, whitespace: true, message: 'Please input the room\'s name.' }],
                      })(
                          <Input />
                      )}
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Upload Image"
                  >
                  <Upload {...uploadProps} onChange={(info) => this.uploadChange(info)}>
                    <Button>
                      <Icon type="upload" /> Click to Upload
                    </Button>
                  </Upload>,
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
              </Form>
          </Modal>
        );
    }
}


export default Form.create({ name: 'createUserForm' })(CreateDeskForm);
