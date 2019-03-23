import React from 'react';
import { Modal, Form, Row, Col } from 'antd';
import ServiceEmails from './serviceEmails.js';
import { connect } from 'react-redux';

class EmailModal extends React.Component {

    state = {
        emails: {},
        inputVisible: [],
        inputValue: ""
    };

    showInput = () => {
      this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputConfirm = () => {
      const state = this.state;
      const inputValue = state.inputValue;
      let emails = state.emails;
      if (inputValue && emails.indexOf(inputValue) === -1) {
        emails = [...emails, inputValue];
      }

      this.setState({
        emails,
        inputVisible: false,
        inputValue: '',
      });
    }

    updateEmails = (serviceType, emails) => {
      this.props.mixpanel.track('Did update auto-routing emails for service requests.');
      var updatedEmails = this.state.emails;
      updatedEmails[serviceType] = emails;
      this.setState({
        emails: updatedEmails
      })
    }

    componentDidMount() {
      this.setState({
        emails: this.props.dataSource
      })
    }

    cancelModal() {
      this.props.closeEmailModal();

      this.setState({
        emails: this.props.dataSource
      })
    }

    saveInputRef = input => this.input = input
    render() {
      const { emails, inputVisible, inputValue } = this.state;
      let dic = {
        'IT': ['polsky_IT@gmail.com'],
        'Plumbing': ['polsky_Plumb@gmail.com'],
        'Lighting': ['polsky_Light@gmail.com'],
        'General Maintenance': ['polsky_GM@gmail.com'],
        'Furniture': ['polsky_Fur@gmail.com'],
        'Door': ['polsky_Door@gmail.com'],
        'Heating/Cooling': ['polsky_Temp@gmail.com'],
        'Cleaning': ['polsky_Clean@gmail.com'],
        'Supplies': ['polsky_Sup@gmail.com'],
        'Other': ['polsky_Other@gmail.com'],
      }
  
      return (
        <Modal
          visible={this.props.showModal}
          onCancel={() => this.cancelModal()}
          onOk={this.props.handleUpdateEmails}
          className={"page-nav-menu"}
          bordered={true}
        >
          <Row >
            <Form>
              <Col align={'left'} span={24}>
                <h1>Auto Routing Emails</h1>
              </Col>
              <Form.Item>
              {Object.keys(dic).map((key) => {
                return (
                  <Col key={key} span={24}>
                    <Col align={'start'}span={8}>
                      <b>{key}</b>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col align={'left'} span={15}>
                      <ServiceEmails emails={emails[key]} rawType={key} updateEmails={this.updateEmails}/>
                    </Col>
                  </Col>
                )
              })}
              </Form.Item>
            </Form>
          </Row>
        </Modal>
      );
    }
}

const mapStateToProps = state => {
  return {
      mixpanel: state.firebase.mixpanel
  }
};

export default Form.create({ name: 'emailsForm' })(connect(mapStateToProps, null)(EmailModal));
