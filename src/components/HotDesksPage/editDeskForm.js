import React from 'react';
import {
    Button, Modal, Form, Input, Radio, Upload, Icon, message, Checkbox, Row, Col
} from 'antd';


class EditDeskForm extends React.Component {

    state = {
        fileList: []
    };

    uploadChange(info) {
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    deskPhotoFile = (e) => {
        if (Array.isArray(e)) {
            this.setState({ fileList: e })
            return e;
        }
        this.setState({ fileList: (e.fileList || e) })
        return e && e.fileList;
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

        const uploadProps = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            }
        }

        const {
            visible, onCancel, onCreate, confirmLoading, form
        } = this.props;
        const { getFieldDecorator } = form;

        const formTitle = "Edit Hot Desk"

        let uploadDisabled = false;
        if (this.state.fileList.length >= 1) {
            uploadDisabled = true;
        }

        return (
            <Modal
                visible={visible}
                title={formTitle}
                okText="Save"
                onCancel={onCancel}
                onOk={onCreate}
                confirmLoading={confirmLoading}
            >
                <Form layout="vertical">
                    <Form.Item label="Desk Name">
                        {getFieldDecorator('deskName', {
                            rules: [{ required: true, whitespace: true, message: 'Please input the room\'s name.' }],
                        })(
                            <Input disabled={confirmLoading} />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Upload Image"
                    >
                        {getFieldDecorator('uploadPhoto', {
                            getValueFromEvent: this.deskPhotoFile
                        })(
                            <Upload {...uploadProps} disabled={uploadDisabled || confirmLoading} fileList={this.state.fileList} accept='.png, jpg, jpeg' onChange={(info) => this.uploadChange(info)}>
                                <Button>
                                    <Icon type="upload" /> Click to Upload
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
                                    <Col span={24}><Checkbox value="reserveable" disabled={confirmLoading}>Reserveable</Checkbox></Col>
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
                                <Radio value="active" disabled={confirmLoading}>Active</Radio>
                                <Radio value="inactive" disabled={confirmLoading}>Inactive</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}


export default Form.create({ name: 'editDeskForm' })(EditDeskForm);
