import React from 'react';
// import { connect } from 'react-redux';
import {
    Button, Modal, Form, Input, Radio, Upload, Icon, message, Checkbox, Row, Col,
    Tag
} from 'antd';
import ServiceEmails from './serviceEmails.js';


class EmailModal extends React.Component {

    state = {
        emails: ['Unremovable', 'Tag 2', 'Tag 3'],
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
      console.log(emails);
      this.setState({
        emails,
        inputVisible: false,
        inputValue: '',
      });
      console.log("emails2 ", this.state.emails)
    }

    updateEmails = (serviceType, email) => {
      console.log("updateEmails: ", serviceType, " vs. ", email)
    }

    componentDidMount() {
      var dic = {
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

      this.setState({
        emails: dic
      })
    }

    /* handleConfirmCreateDesk = () => {
        const createDeskForm = this.createDeskFormRef.props.form;
        createDeskForm.validateFields((err, values) => {
            if (err) {
                return;
            }
            const deskName = values.deskName;

            let reserveable = false;
            if (values.reserveable.includes('reserveable') === true) {
                reserveable = true;
            }

            let activeStatus = false;
            if (values.activeStatus === 'active') {
                activeStatus = true;
            }

            let photoFileObj = null;
            const uploadPhotoDict = values.uploadPhoto || null;
            if (uploadPhotoDict) {
                const value = uploadPhotoDict[0];
                const fileObj = value.originFileObj;
                photoFileObj = fileObj;
            }

            const currentOfficeUID = this.props.currentOfficeUID;

            const payload = {
                deskName: deskName,
                selectedOfficeUID: currentOfficeUID,
                reserveable: reserveable,
                activeStatus: activeStatus,
                photoFileObj: photoFileObj,
                hideForm: this.hideCreateDeskForm
            }
            this.props.createHotDesk(payload);
        })
    }

    handleCancelCreateDesk = () => {
        this.hideCreateDeskForm();
    }

    hideCreateDeskForm = () => {
        this.setState({
            createDeskFormVisible: false
        });
        const createDeskForm = this.createDeskFormRef.props.form;
        this.createDeskFormRef.setState({ fileList: [] });
        createDeskForm.setFields({
            deskName: {
                value: null
            },
            reserveable: {
                value: ['reserveable']
            },
            activeStatus: {
                value: 'active'
            },
            uploadPhoto: {
                value: []
            }
        })
    } */

    saveInputRef = input => this.input = input

    render() {
      const { emails, inputVisible, inputValue } = this.state;
      var dic = {
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
        <Row >
          <Form>
            <Col align={'left'} span={24}>
              <h1>Auto Routing Emails</h1>
            </Col>
            <Form.Item>
            {Object.keys(dic).map((key) => {
              return <Col span={24}>
                <Col align={'center'}span={8}>
                  <b>{key}</b>
                </Col>
                <Col align={'left'} span={16}>
                  <ServiceEmails emails={dic[key]} key={key} updateEmails={this.updateEmails}/>
                </Col>
                {/*<Tag color={'green'} key={key}>{dic[key]}</Tag>
                <Tag
                  onClick={this.showInput}
                  style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                  <Icon type="plus" /> New Tag
                </Tag> */}
              </Col>
            })}
            </Form.Item>
          </Form>
        </Row>
      );
    }
}

export default Form.create({ name: 'emailsForm' })(EmailModal);
