import React from 'react';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { message, Button, Row, Col, Card, Modal, Spin, Comment, Tag, Divider, Icon} from 'antd';
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
            <div>
              <Row type="flex" align="middle">
                <Col span={2}>
                  <Icon type="pushpin" style={{fontSize:20}}/>
                </Col>
                <Col span={11}>
                  <Row>
                    <h3>ID: {request.uid.slice(0,6)}</h3>
                  </Row>
                  <Row>
                    <span>{moment(request.timestamp).format('ddd MMM DD, YYYY')} at {moment(request.timestamp).format('hh:mm a')}</span>
                  </Row>
                </Col>
                <Col span={11}>
                  <Row type="flex" justify="end">
                    {request.status=='open' ? <Tag color={'green'} key={request.status}>Open</Tag> :
                    request.status=='pending' ? <Tag color={'volcano'} key={request.status}>In Progress</Tag> :
                    <Tag color={'red'} key={request.status}>Closed</Tag>}
                  </Row>
                </Col>
              </Row>
              <Divider />
              <Row type="flex" align="middle">
                <Col span={2}>
                </Col>
                <Col span={22}>
                  <Row>
                    <h3>Request Type:</h3>
                    <Tag color="blue" style={{/*fontSize: 20, height:"40%", width:"60%"*/}}>{request.issueType.title.title}</Tag>
                  </Row>
                  <br />
                  <Row>
                    <h2>Note: </h2>
                    <h2>{request.note}</h2>
                  </Row>
                </Col>
              </Row>
              <Divider />
              <Row type="flex" align="middle">
                <Col span={2}>
                </Col>
                <Col span={22}>
                  <Row>
                    <h3>Notified:</h3>
                    <ServiceEmails emails={this.state.emails[key]} rawType={key} updateEmails={this.updateEmails}/>
                  </Row>
                  <Row type="flex" justify="end">
                    <Button type="primary" onClick={() => this.handleResend(key)}>Resend</Button>
                  </Row>
                </Col>
              </Row>
            </div>
            {this.state.openLightbox && (
              <Lightbox
                mainSrc={StaticRequestPhoto}
                onCloseRequest={() => this.setState({ openLightbox: false })}
              />
            )}
          </Modal>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

/*


            <Row>
              <Col span={7}>
                <img alt="Request Photo" style={{
                  maxWidth:"100%",
                  maxHeight:"100%"
                }} src={StaticRequestPhoto} />
              </Col>
              <Col span={1}/>
              <Col span={11} >
                <h3>ID: {request.uid.slice(0,6)}</h3>
                <span>{moment(request.timestamp).format('ddd MMM DD, YYYY')} at {moment(request.timestamp).format('hh:mm a')}</span>
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
              </Col>
              <Col span={8} align="middle">
                <Button type="primary" onClick={() => this.handleResend(key)}>Resend</Button>
              </Col>
            </Row>

*/

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
