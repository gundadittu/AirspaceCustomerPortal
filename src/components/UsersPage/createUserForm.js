import React from 'react';
// import { connect } from 'react-redux';
import {
    Button, Modal, Form, Input, Radio,
} from 'antd';


class CreateUserForm extends React.Component {

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
            visible, onCancel, onCreate, form, officeObj, confirmLoading
        } = this.props;
        const { getFieldDecorator } = form;

        const formTitle = "Add a new User to this office.";

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
                    <Form.Item label="First Name">
                        {getFieldDecorator('firstName', {
                            rules: [{ required: true, whitespace: true, message: 'Please input the user\'s first name.' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Last Name">
                        {getFieldDecorator('lastName', {
                            validateTrigger: 'onBlur',
                            rules: [{ required: true, whitespace: true, message: 'Please input the user\'s last name.' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Email Address">
                        {getFieldDecorator('emailAddress', {
                            validateTrigger: 'onBlur',
                            rules: [{ required: true, message: 'Please input the user\'s email address.', whitespace: true, pattern: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/}],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Reenter Email Address">
                        {getFieldDecorator('emailAddress2', {
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

                    <Form.Item className="collection-create-form_last-form-item">
                        {getFieldDecorator('userType', {
                            initialValue: 'regular',
                        })(
                            <Radio.Group>
                                <Radio value="regular">Regular</Radio>
                                <Radio value="officeAdmin">Office Admin</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}


export default Form.create({ name: 'createUserForm' })(CreateUserForm);
