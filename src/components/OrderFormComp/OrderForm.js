import React from 'react';
import { connect } from 'react-redux';
import {
    Modal, Form, Input, Radio, InputNumber, Select, Cascader
} from 'antd';
import * as generalActionCreator from '../../store/actions/general';
const { Option } = Select;

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
                onlyInterested: false,
                onFinish: this.props.onCancel
            };
            // console.log("order service payload:");
            // console.log(payload);
            this.props.addRequestForService(payload);
            return
        });
    }

    getFields(serviceTitle) {
        if (serviceTitle === null) {
            return [];
        } else if (serviceTitle === "Coffee + Tea") {

            const powerSourceChildren = [
                {
                    value: 'My office does have a 110V or 120V power source.',
                    label: 'My office does have a 110V or 120V power source.',
                },
                {
                    value: 'My office does NOT have a 110V or 120V power source.',
                    label: 'My office does NOT have a 110V or 120V power source.',
                },
                {
                    value: 'I do know whether my office has a 110V or 120V power source.',
                    label: 'I do know whether my office has a 110V or 120V power source.',
                }
            ];

            const waterLineChildren = [
                {
                    value: 'My office does have a water line.',
                    label: 'My office does have a water line.',
                    children: powerSourceChildren,
                },
                {
                    value: 'My office does NOT have a water line.',
                    label: 'My office does NOT have a water line.',
                    children: powerSourceChildren,
                },
                {
                    value: 'I am not sure whether my office has a water line.',
                    label: 'I am not sure whether my office has a water line.',
                    children: powerSourceChildren,
                },
            ];

            return [
                {
                    type: "cascader",
                    key: "coffeeType",
                    question: "Coffee Type?",
                    message: "Please tell us what type of coffee you're interested in.",
                    required: true,
                    data: {
                        options: [
                            {
                                value: 'Fresh Brew',
                                label: 'Fresh Brew',
                                children: [
                                    {
                                        value: 'Include Free Grind Service',
                                        label: 'Include Free Grind Service',
                                    },
                                    {
                                        value: 'Do NOT include Free Grind Service',
                                        label: 'Do NOT include Free Grind Service',
                                    },
                                ],
                            },
                            {
                                value: 'Single Serve',
                                label: 'Single Serve',
                            },
                            {
                                value: 'Bean-to-Cup',
                                label: 'Bean-to-Cup',
                            }, 
                            {
                                value: 'None',
                                label: 'None',
                            }
                        ]
                    }
                },
                {
                    type: "select",
                    key: "coffeePackage",
                    question: "Coffee Package?",
                    message: "Please tell us what package you're interested in.",
                    required: true,
                    data: {
                        options: ["Premium", "Standard", "Budget", "None"]
                    }
                },
                {
                    type: "text",
                    key: "coffeeLocation",
                    question: "Please provide a specific location where the coffee will be served.",
                    message: "Please provide a specific location where the coffee will be served.",
                    required: false
                },
                {
                    type: "cascader",
                    key: "equipmentInstall",
                    question: "Add-on: Do you need to purchase or rent equipment?",
                    message: "Please tell us whether your office needs to purchase or rent equipment.",
                    required: true,
                    data: {
                        options: [
                            {
                                value: "Interested in Purchasing Equipment",
                                label: "Interested in Purchasing Equipment",
                                children: waterLineChildren
                            },
                            {
                                value: "Interested in Renting Equipment",
                                label: "Interested in Renting Equipment",
                                children: waterLineChildren
                            },
                            {
                                value: "Do not need equipment",
                                label: "Do not need equipment",
                                children: waterLineChildren
                            }
                        ]
                    }
                },
                {
                    type: "select",
                    key: "teaType",
                    question: "Tea Type?",
                    message: "Please tell us what type of tea you're interested in.",
                    required: true,
                    data: {
                        options: ["Sachet", "Single Service", "None"]
                    }
                },
                {
                    type: "select",
                    key: "teaPackage",
                    question: "Tea Package?",
                    message: "Please tell us which package you're interested in.",
                    required: true,
                    data: {
                        options: ["Premium", "Standard", "Budget", "None"]
                    }
                },
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
                            } else if (type === "number") {
                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, whitespace: true, message: message }],
                                        })(
                                            <InputNumber min={0} disabled={confirmLoading} />
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === "select") {
                                const options = data.options || [];

                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, whitespace: true, message: message }],
                                        })(

                                            <Select
                                                showSearch
                                                // style={{ width: 200 }}
                                                placeholder={message}
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
                            } else if (type === "cascader") {
                                const options = data.options || [];
                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, message: message }],
                                        })(
                                            <Cascader options={options} placeholder={message} />
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
        confirmLoading: state.officeAdmin.isAddingRequestForService,
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
