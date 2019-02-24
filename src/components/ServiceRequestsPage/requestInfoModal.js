import React from 'react';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { message, Button, Row, Col, Card, Modal, Spin, Comment, Tag} from 'antd';
import '../../App.css'
import StaticRequestPhoto from "../../assets/images/service_request.png";
import ServiceEmails from './serviceEmails.js';
import * as actionCreator from '../../store/actions/officeAdmin';
const moment = require('moment');

const { Meta } = Card;

class ReqestInfoModal extends React.Component {
  state = {
    photoIndex: 0,
    emails: null,
    openLightbox: false
  };

  handleCancel = (e) => {
    this.setState({
      showInfoModal: true
    })
  }

  handleCancel = (e) => {
    this.setState({
      showInfoModal: false,
      emails: this.props.emailsToPass
    })
  }

  handleResend = (key) => {
    var emailsString = 'Thank you for your request.\nWe will notify the following people:\n'
    this.state.emails[key].map(email => {emailsString += (email + '\n')})
    message.warning(emailsString);
  }

  updateEmails = (serviceType, emails) => {
    var updatedEmails = this.state.emails;
    updatedEmails[serviceType] = emails;
    this.setState({
      emails: updatedEmails
    })
  }

  componentDidMount() {
    this.setState({
      emails: this.props.emailsToPass
    })
  }


  render() {
    const request = this.props.selectedRequest
    if (request) {
      const key = request.issueType.title.rawValue
      return (
        <div>
          <Modal
            visible={this.props.showInfoModal}
            footer={null}
            onCancel={this.props.cancelInfoModal}
            className={"page-nav-menu"}
            bordered={true}
          >
            <Row>
              <Col span={7}>
                <Card
                  cover={<img alt="Request Photo" src={StaticRequestPhoto} />}
                  bordered={false}
                  onClick={() => this.setState({openLightbox:true})}
                />
              </Col>
              <Col span={1}/>
              <Col span={11} >
                <h3>ID: {request.uid}</h3>
                <span>Issued: {moment(request.timestamp).format('ddd MMM DD, YYYY')} at {moment(request.timestamp).format('hh:mm a')}</span>
                <h3>Request Type:</h3>
                <Tag color="blue">{request.issueType.title.title}</Tag>
              </Col>
              <Col span={1} />
              <Col span={4}>
                {request.status=='open' ? <Tag color={'green'} key={request.status}>Open</Tag> :
                request.status=='pending' ? <Tag color={'volcano'} key={request.status}>In Progress</Tag> :
                <Tag color={'red'} key={request.status}>Closed</Tag>}
              </Col>
            </Row>
            <Row>
              <Col span={4}>
              </Col>
              <Col span={16} justify="space-around" align="middle">
                <h3>Note: {request.note}</h3>
              </Col>
              <Col span={4}>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <h3>Notified:</h3>
                <ServiceEmails emails={this.state.emails[key]} rawType={key} updateEmails={this.updateEmails}/>
                {/*this.props.emailsToPass[request.issueType.title.rawValue].map((email) => (
                  <Tag key={email} closable={false} color="blue">
                    {email.length > 20 ? `${email.slice(0, 20)}...` : email}
                  </Tag>
                ))*/}
              </Col>
              <Col span={8} align="middle">
                <Button type="primary" onClick={() => this.handleResend(key)}>Resend</Button>
              </Col>
            </Row>

            {this.state.openLightbox && (
              <Lightbox
                mainSrc={StaticRequestPhoto}
                onCloseRequest={() => this.setState({ openLightbox: false })}
              />
            )}
            {/*<Col span={24}>
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
            <Col span={16}>
              <Row>
                <h3>Notified:</h3>
                {this.props.emailsToPass[request.issueType.title.rawValue].map((email) => (
                  <Tag key={email} closable={false} color="blue">
                    {email.length > 20 ? `${email.slice(0, 20)}...` : email}
                  </Tag>
                ))}
              </Row>
            </Col>*/}
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
