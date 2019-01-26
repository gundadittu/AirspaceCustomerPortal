import React from 'react';
// import { connect } from 'react-redux';
import {
    Button, Modal, Form, Input, Radio,
} from 'antd';


class EditUserForm extends React.Component {

    emailValidator = (rule, value, callback) => { 
        const first = this.props.form.getFieldValue('emailAddress'); 
        const second = this.props.form.getFieldValue('emailAddress2');
        if (first != second) { 
            callback(new Error('The email addresses do not match.'));
            return 
        }
        callback();
    }

    render() {
        const {
            visible, onCancel, onCreate, form, confirmLoading, selectedUser, selectedOffice
        } = this.props;
        const { getFieldDecorator } = form;
        const formTitle = "Edit User";
        const userObj = selectedUser || {};
        const officeObj = selectedOffice || "";
        const userAdminOffices = userObj.officeAdmins; 
        let initialUserTypeValue = 'regular'

        for (let key in userAdminOffices) { 
            const value = userAdminOffices[key];
            const officeUID = value.uid;

            if (officeUID == officeObj) { 
                initialUserTypeValue = 'officeAdmin'
                break
            }
        }

        return (

            <Modal
                visible={visible}
                title= {formTitle}
                okText="Save"
                onCancel={onCancel}
                onOk={onCreate}
                confirmLoading={confirmLoading}
            >
                <Form layout="vertical">
                    <Form.Item label="First Name">
                        {getFieldDecorator('firstName', {
                            initialValue: userObj.firstName || "",
                            rules: [{ 
                                required: true,
                                 whitespace: true, 
                                 message: 'Please input the user\'s first name.' 
                                }],
                        }
                        )(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Last Name">
                        {getFieldDecorator('lastName', {
                            initialValue: userObj.lastName || "",
                            validateTrigger: 'onBlur',
                            rules: [{ required: true, whitespace: true, message: 'Please input the user\'s last name.' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Email Address">
                        {getFieldDecorator('emailAddress', {
                            initialValue: userObj.email || "",
                            validateTrigger: 'onBlur',
                            rules: [{ required: true, whitespace: true, message: 'Please input the user\'s email address.' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Reenter Email Address">
                        {getFieldDecorator('emailAddress2', {
                            initialValue: userObj.email || "",
                            validateTrigger: 'onBlur',
                            rules: [{ 
                                required: true,
                                whitespace: true, 
                                message: 'Please input the user\'s email address.'
                             }, 
                            { 
                                validator: this.emailValidator.bind(this)
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="User Type" className="collection-create-form_last-form-item">
                        {getFieldDecorator('userType', {
                            initialValue: initialUserTypeValue,
                        })(
                            <Radio.Group>
                                <Radio value="regular">User</Radio>
                                <Radio value="officeAdmin">Office Admin</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

}

export default Form.create({ name: 'editUserForm' })(EditUserForm); 