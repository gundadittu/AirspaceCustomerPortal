import React from 'react';
import { connect } from 'react-redux';
import {
    Modal, Form, Input, Radio, InputNumber
} from 'antd';
import * as generalActionCreator from '../../store/actions/general';

class GetHelpForm extends React.Component {

    onCreate = () => {
        const helpForm = this.props.form;
        helpForm.validateFields((err, values) => {
            if (err) {
                return;
            }

            const payload = {
                selectedOfficeUID: this.props.currentAdminOfficeUID,
                onFinish: this.onCancel.bind(this),
                details: values.details, 
            };

            this.props.submitSupportTicket(payload);
            return
        });
    }

    onCancel() { 
        this.props.form.resetFields()
        this.props.onCancel();
    }

    render() {

        const { visible, onCancel, form } = this.props;

        const { getFieldDecorator } = form;
        // --------

        const confirmLoading = this.props.confirmLoading;

        const onCreate = this.onCreate.bind(this);
        const { TextArea } = Input;

        return (
            <div>
                <Modal
                    visible={visible}
                    title={"Get Help"}
                    okText="Submit"
                    onCancel={this.onCancel.bind(this)}
                    onOk={onCreate.bind(this)}
                    confirmLoading={confirmLoading}
                >
                    <Form layout="vertical">
                        <Form.Item label={"What do you need help with?"}>
                            {getFieldDecorator("details", {
                                rules: [{ required: true, whitespace: true, message: "Please tell us a little bit about what you need help with." }],
                            })(
                                <TextArea disabled={confirmLoading} autosize={{ minRows: 2, maxRows: 6 }} />
                            )}
                        </Form.Item>
                    </ Form>
                </ Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        confirmLoading: state.officeAdmin.isSubmittingSupportTicket,
        currentAdminOfficeUID: state.general.currentOfficeAdminUID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        submitSupportTicket: (payload) => dispatch(generalActionCreator.submitSupportTicket(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'getHelpForm' })(GetHelpForm));
