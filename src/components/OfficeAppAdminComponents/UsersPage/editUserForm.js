import React from 'react';
import {
   Modal, Form, Input, Radio,
} from 'antd';


class EditUserForm extends React.Component {

    emailValidator = (rule, value, callback) => {
        const first = this.props.form.getFieldValue('emailAddress');
        const second = this.props.form.getFieldValue('emailAddress2');
        if (first !== second) {
            callback(new Error('The email addresses do not match.'));
            return
        }
        callback();
    }

    render() {
        const {
            visible, onCancel, onCreate, form, confirmLoading
        } = this.props;
        const { getFieldDecorator } = form;
        const formTitle = "Edit User";

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
                            initialValue: null,
                            rules: [{
                                required: true,
                                 whitespace: true,
                                 message: 'Please input the user\'s first name.'
                                }],
                        }
                        )(
                            <Input disabled={confirmLoading} />
                        )}
                    </Form.Item>
                    <Form.Item label="Last Name">
                        {getFieldDecorator('lastName', {
                            initialValue: null,
                            validateTrigger: 'onBlur',
                            rules: [{ required: true, whitespace: true, message: 'Please input the user\'s last name.' }],
                        })(
                            <Input disabled={confirmLoading}/>
                        )}
                    </Form.Item>
                    <Form.Item label="Email Address">
                        {getFieldDecorator('emailAddress', {
                            initialValue: null,
                            validateTrigger: 'onBlur',
                            rules: [{ required: true, whitespace: true, message: 'Please input the user\'s email address.' }],
                        })(
                            <Input disabled={confirmLoading}/>
                        )}
                    </Form.Item>
                    <Form.Item label="Reenter Email Address">
                        {getFieldDecorator('emailAddress2', {
                            initialValue: null,
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
                            <Input disabled={confirmLoading} />
                        )}
                    </Form.Item>
                    <Form.Item label="User Type" className="collection-create-form_last-form-item">
                        {getFieldDecorator('userType', {
                            initialValue: null,
                        })(
                            <Radio.Group>
                                <Radio disabled={confirmLoading} value="regular">User</Radio>
                                <Radio disabled={confirmLoading} value="officeAdmin">Office Admin</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

}

export default Form.create({ name: 'editUserForm' })(EditUserForm);
