import React from 'react';
import { connect } from 'react-redux';
import {
    Modal, Form, Input, InputNumber, Select, Cascader, DatePicker, TimePicker, Upload, Icon, message
} from 'antd';
import * as generalActionCreator from '../../../store/actions/general';
import * as formConfig from './OrderFormConfig';
const { Option, OptGroup } = Select;
const { TextArea } = Input;
const Message = message;
message.config({
    maxCount: 1,
  });
const InputGroup = Input.Group;

class OrderForm extends React.Component {

    state = {
        visible: false,
         urlMapping: {}
    };

    onCreate = () => {
        const orderForm = this.props.form;
        orderForm.validateFields((err, values) => {
            if (err) {
                return;
            }
            const fields = this.getFields(this.props.serviceTitle);

            var arrayLength = fields.length;
            for (var i = 0; i < arrayLength; i++) {
                const item = fields[i];
                const key = item.key;
                let value = values[key] || null;
                if (item["type"] == "fileUpload") { 
                    let split_list_file_names = value.split(",")
                    split_list_file_names = split_list_file_names.map( x => x.trim())
                    split_list_file_names = split_list_file_names.filter( x => x !== "")
                    
                    const newAttachments = split_list_file_names.map( x => { 
                        return { 
                            "url": this.state.urlMapping[x].toString(), 
                            "filename": x
                        }
                    })
                    value = newAttachments
                }
                item["response"] = value;
            }

            const payload = {
                serviceType: this.props.serviceTitle,
                serviceDescription: fields,
                selectedOfficeUID: this.props.currentAdminOfficeUID,
                onlyInterested: false,
                onFinish: this.props.onCancel
            };
            this.props.addRequestForService(payload);
            return
        });
    }

    getFields(serviceTitle) {
        return formConfig.getFieldsForService(serviceTitle)
    }

    render() {
        const { visible, onCancel, serviceTitle, topText, form } = this.props;
        const { getFieldDecorator } = form;
        const fields = this.getFields(serviceTitle);
        const confirmLoading = this.props.confirmLoading;
        const onCreate = this.onCreate;
        const formTitle = "Request " + serviceTitle;

        return (
            <div>
                <Modal
                    visible={visible}
                    title={formTitle}
                    okText="Request"
                    onCancel={onCancel}
                    onOk={onCreate.bind(this)}
                    confirmLoading={confirmLoading}
                >
                    <p>{topText}</p>
                    <br></br>
                    <Form layout="vertical">
                        {fields === null ? null : fields.map(x => {
                            const type = x.type || null;
                            const key = x.key || null;
                            const question = x.question || null;
                            const required = x.required || false;
                            const message = x.message || "";
                            const data = x.data || null;
                            if (type === formConfig.FIELD_TYPES["TEXT"]) {
                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, whitespace: true, message: message }],
                                        })(
                                            <Input disabled={confirmLoading} />
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === formConfig.FIELD_TYPES["INPUT_GROUP"]) {
                                const groups = data || [];

                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, whitespace: true, message: message }],
                                        })(
                                            <InputGroup compact>
                                                {groups.map(x => {
                                                    const type = x.type || null;
                                                    const placeholder = x.placeholder || "";

                                                    if (type === "regular") {
                                                        const options = x.options || [];
                                                        return (
                                                            <Select placeholder={placeholder}>
                                                                {
                                                                    options.map(op => {
                                                                        const value = op.value || "";
                                                                        return (
                                                                            <Option value={value}>{value}</Option>
                                                                        );
                                                                    })
                                                                }
                                                            </Select>
                                                        );
                                                    } else if (type === "number") {
                                                        return (
                                                            <InputNumber min={0} placeholder={placeholder} disabled={confirmLoading} />
                                                        );
                                                    } else {
                                                        return null
                                                    }
                                                })}
                                            </InputGroup>
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === formConfig.FIELD_TYPES["DATE_TIME"]) {
                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key + "-date", {
                                            rules: [{ required: required, message: message }],
                                        })(
                                            <DatePicker format="DD-MM-YYYY" placeholder="Select Date" />
                                        )}
                                        <br /><br />
                                        {getFieldDecorator(key + "-time", {
                                            rules: [{ required: required, message: message }],
                                        })(
                                            <TimePicker use12Hours format="h:mm a" placeholder="Select Time" />
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === formConfig.FIELD_TYPES["DATE"]) {
                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key + "-date", {
                                            rules: [{ required: required, message: message }],
                                        })(
                                            <DatePicker format="DD-MM-YYYY" placeholder="Select Date" />
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === formConfig.FIELD_TYPES["TITLE"]) {
                                return (
                                    <Form.Item label={question}>
                                    </Form.Item>
                                );
                            } else if (type === formConfig.FIELD_TYPES["NUMBER"]) {
                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, message: message }],
                                        })(
                                            <InputNumber min={0} defaultValue={0} disabled={confirmLoading} />
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === formConfig.FIELD_TYPES["SELECT"]) {
                                const options = data.options || [];

                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, whitespace: true, message: message }],
                                        })(
                                            <Select
                                                showSearch
                                                placeholder={"Select an option..."}
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {options.map(x => (
                                                    <Option value={x}>{x}</Option>
                                                ))}
                                            </Select>
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === formConfig.FIELD_TYPES["SELECT_MULTIPLE"]) {
                                const options = data.options || [];

                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, message: message }],
                                        })(

                                            <Select
                                                showSearch
                                                mode="multiple"
                                                placeholder={"Select all that apply..."}
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {options.map(x => (
                                                    <Option value={x}>{x}</Option>
                                                ))}
                                            </Select>
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === formConfig.FIELD_TYPES["SELECT_MULTIPLE_GROUPED"]) {
                                const groups = data.groups || [];

                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, message: message }],
                                        })(

                                            <Select
                                                showSearch
                                                mode="multiple"
                                                placeholder={"Select all that apply..."}
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {groups.map(x => (
                                                    <OptGroup label={x.title}>
                                                        {x.options.map(opt => (
                                                            <Option value={opt}>{opt}</Option>
                                                        ))}
                                                    </OptGroup>
                                                ))}
                                            </Select>
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === formConfig.FIELD_TYPES["CASCADER"]) {
                                const options = data.options || [];
                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, message: message }],
                                        })(
                                            <Cascader options={options} placeholder={"Select an option..."} />
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === formConfig.FIELD_TYPES["TEXT_AREA"]) {
                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, whitespace: true, message: message }],
                                        })(
                                            <TextArea rows={4} disabled={confirmLoading} />
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === formConfig.FIELD_TYPES["FILE_UPLOAD"]) {
                                // Uploads file into Google Bucket and stores url in a mapping in state
                                let uploadRequestServiceFile = ({onSuccess, onError, file}) => {
                                    const firebase = this.props.firebase;
                                    const storageRef = firebase.storage.ref();                    
                                    const fileRef = storageRef.child('requestServiceFiles/' + this.props.currentAdminOfficeUID + "/" + file.name);

                                    return fileRef.put(file)
                                        .then((snapshot) => {
                                            return snapshot.ref.getDownloadURL()
                                        })
                                        .then((downloadURL) => {
                                            const currMapping = this.state.urlMapping;
                                            let newMapping = { 
                                                ...currMapping, 
                                            } 
                                            newMapping[file.name] = downloadURL.toString()
                                            this.setState({urlMapping: newMapping})
                                            onSuccess(null, file)
                                            return
                                        })
                                        .catch( e => { 
                                            onError(e, null)
                                            return 
                                        })
                                }
                                uploadRequestServiceFile = uploadRequestServiceFile.bind(this)
                                
                                // Recieves Callbacks Triggered in uploadRequestServiceFile and shows alerts 
                                let onUploadStatusChange = (info) => {
                                    const { status } = info.file
                                    if (status === 'done') {
                                        Message.success(`${info.file.name} file uploaded successfully.`);
                                    } else if (status === 'error') {
                                        Message.error(`${info.file.name} file upload failed.`);
                                    } else if (status === 'uploading') { 
                                        Message.loading(`Uploading ${info.file.name}...`)
                                    }
                                }
                                onUploadStatusChange = onUploadStatusChange.bind(this)
                                
                                // Creates the csv string of download URLS that is stored in the field's value
                                // Passed as callback function into form below
                                const getFileNameListStringFromEvent = (info) => { 
                                    const fileList = info.fileList; 
                                    let value = ""
                                    fileList.forEach(f => { 
                                        const filename = f.name
                                        value += filename
                                        value += ", "
                                    })
                                    return value
                                }

                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            getValueFromEvent: getFileNameListStringFromEvent,
                                            rules: [{ required: required, whitespace: true, message: message }]
                                        })(
                                            <Upload.Dragger name="files" disabled={confirmLoading} onChange={onUploadStatusChange} multiple={true} customRequest={uploadRequestServiceFile}>  
                                                <p className="ant-upload-drag-icon">
                                                    <Icon type="inbox" />
                                                </p>
                                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                            </Upload.Dragger>,
                                        )}
                                    </Form.Item>
                                )
                            }
                            return null;
                        }
                        )}
                    </Form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        confirmLoading: state.officeAdmin.isAddingRequestForService,
        currentAdminOfficeUID: state.general.currentOfficeAdminUID, 
        firebase: state.firebase.firebase
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addRequestForService: (payload) => dispatch(generalActionCreator.addRequestForService(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'orderServiceForm' })(OrderForm));