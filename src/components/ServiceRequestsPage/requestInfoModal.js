import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Card, Modal, Spin, Comment, Tag} from 'antd';
import '../../App.css'
import StaticRequestPhoto from "../../assets/images/service_request.png";
import * as actionCreator from '../../store/actions/officeAdmin';
const moment = require('moment');

const { Meta } = Card;

class ReqestInfoModal extends React.Component {
  state = {
  };

  handleCancel = (e) => {
    this.setState({
      showInfoModal: true
    })
  }

  handleCancel = (e) => {
    this.setState({
      showInfoModal: false
    })
  }


  render() {
    console.log("This is props ", this.props)
    const request = this.props.selectedRequest
    if (request) {
      return (
        <div>
          <Modal
            visible={this.props.showInfoModal}
            okText={(this.state.showInfo) ? "Edit" : "Save"}
            onCancel={this.props.cancelInfoModal}
            className={"page-nav-menu"}
            bordered={true}
          >
            <Col span={24}>
              <Col span={8}>
                <Card
                  cover={<img alt="Request Photo" src={StaticRequestPhoto} />}
                  bordered={false}
                />
              </Col>
              <Col span={12}>
                <Row >
                  <h3>ID: {request.uid}</h3>
                </Row>
                <Row >
                  Time
                </Row>
                <Row >
                  <Col span={12}>
                    <h3>Request Type:</h3>
                  </Col>
                  <Col span={12}>
                     <Tag color="blue">{request.issueType.title.title}</Tag>
                  </Col>
                </Row>
              </Col>
              <Col span={4} align='right'>
                {request.status=='open' ? <Tag color={'green'} key={request.status}>Open</Tag> :
                request.status=='pending' ? <Tag color={'volcano'} key={request.status}>In Progress</Tag> :
                <Tag color={'red'} key={request.status}>Closed</Tag>}
              </Col>
            </Col>
            <Col span={24}>
              <h3>Note: {request.note}</h3>
            </Col>
            <Col span={24}>
              <h3>Notified:</h3>
              {this.props.emailsToPass[request.issueType.title.rawValue].map((email) => (
                <Tag key={email} closable={false} color="blue">
                  {email.length > 20 ? `${email.slice(0, 20)}...` : email}
                </Tag>
              ))}
              {console.log(this.props.emailsToPass[request.issueType.title.rawValue])}
            </Col>
            <Button type="primary">Resend</Button>
          </Modal>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

const mapStateToProps = state => {
  return {
    currentOfficeAdminUID: state.general.currentOfficeAdminUID,
    editEventFormLoading: state.officeAdmin.editEventFormLoading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editEvent: (payload) => dispatch(actionCreator.editEvent(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReqestInfoModal);
