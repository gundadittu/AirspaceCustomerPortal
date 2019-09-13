import React from 'react';
import {
    Button, Modal, Form, Upload, Icon, message
} from 'antd';


class UploadSpaceInfoFileForm extends React.Component {

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

    spaceInfoFile = (e) => {
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
            visible, onCancel, onCreate, confirmLoading, uploadFormType, form
        } = this.props;
        const { getFieldDecorator } = form;

        let formTypeTitle = "";
        if (uploadFormType === 'onboarding') {
            formTypeTitle = 'Onboarding ';
        } else if (uploadFormType === 'floorplan') {
            formTypeTitle = 'Floor Plan ';
        } else if  (uploadFormType === 'buildingdetails') {
            formTypeTitle = 'Building Details ';
        }
        const formTitle = "Upload "+formTypeTitle+"File"

        let uploadDisabled = false;
        if (this.state.fileList.length >= 1) {
            uploadDisabled = true;
        }

        return (
            <Modal
                visible={visible}
                title={formTitle}
                okText="Upload"
                onCancel={onCancel}
                onOk={onCreate}
                confirmLoading={confirmLoading}
            >
                <Form layout="vertical">
                    <Form.Item
                        {...formItemLayout}
                        label="Upload File"
                    >
                        {getFieldDecorator('uploadFile', {
                            getValueFromEvent: this.spaceInfoFile
                        })(
                            <Upload {...uploadProps} disabled={uploadDisabled || confirmLoading} fileList={this.state.fileList} accept='.pdf' onChange={(info) => this.uploadChange(info)}>
                                <Button>
                                    <Icon type="upload" /> Click to Upload
                             </Button>
                            </Upload>,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}


export default Form.create({ name: 'uploadSpaceInfoFileForm' })(UploadSpaceInfoFileForm);
