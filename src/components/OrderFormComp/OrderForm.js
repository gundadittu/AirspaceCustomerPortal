import React from 'react';
import { connect } from 'react-redux';
import {
    Modal, Form, Input, Radio,
} from 'antd';
import * as generalActionCreator from '../../store/actions/general';

class OrderForm extends React.Component {

    state = {
        visible: false
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
                const value = values[key] || null;
                item["response"] = value;
            }

            // dispatch backend saga call 
            const payload = {
                serviceType: this.props.serviceTitle,
                serviceDescription: fields,
                selectedOfficeUID: this.props.currentAdminOfficeUID,
                onlyInterested: false
            };
            console.log("order service payload:");
            console.log(payload);
            this.props.addRequestForService(payload);
            return
        });
    }

    getFields(serviceTitle) {
        if (serviceTitle === null) {
            return [];
        } else if (serviceTitle === "Coffee + Tea") {
            return [
                // { 
                // const type = x.type || null;
                // const key = x.key || null;
                // const question = x.question || null;
                // }
                {
                    type: "text",
                    key: "peopleCount",
                    question: "How many people?",
                    message: "Please tell us how many people you need coffee for.",
                    required: true
                }
            ];
        } else {
            return [];
        }
    }

    render() {

        const { visible, onCancel, serviceTitle, topText, form } = this.props;

        const { getFieldDecorator } = form;
        // --------
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
                    onOk={onCreate}
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
                            if (type === "text") {
                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, whitespace: true, message: message }],
                                        })(
                                            <Input disabled={confirmLoading} />
                                        )}
                                    </Form.Item>
                                );
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
        // confirmLoading:
        currentAdminOfficeUID: state.general.currentOfficeAdminUID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addRequestForService: (payload) => dispatch(generalActionCreator.addRequestForService(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'orderServiceForm' })(OrderForm));

{/* <Form.Item label="First Name">
    {getFieldDecorator('firstName', {
        rules: [{ required: true, whitespace: true, message: 'Please input the user\'s first name.' }],
    })(
        <Input disabled={confirmLoading} />
    )}
</Form.Item>
    <Form.Item label="Last Name">
        {getFieldDecorator('lastName', {
            validateTrigger: 'onBlur',
            rules: [{ required: true, whitespace: true, message: 'Please input the user\'s last name.' }],
        })(
            <Input disabled={confirmLoading} />
        )}
    </Form.Item>
    <Form.Item label="Email Address">
        {getFieldDecorator('emailAddress', {
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: 'Please input the user\'s email address.', whitespace: true, pattern: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/ }],
        })(
            <Input disabled={confirmLoading} />
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
            <Input disabled={confirmLoading} />
        )}
    </Form.Item>

    <Form.Item className="collection-create-form_last-form-item">
        {getFieldDecorator('userType', {
            initialValue: 'regular',
        })(
            <Radio.Group>
                <Radio disabled={confirmLoading} value="regular">Regular</Radio>
                <Radio disabled={confirmLoading} value="officeAdmin">Office Admin</Radio>
            </Radio.Group>
        )}
    </Form.Item>  */}
