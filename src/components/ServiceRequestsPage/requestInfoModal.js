import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Modal, Spin} from 'antd';
import '../../App.css'
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
                Image
              </Col>
              <Col span={8}>
                <Row >
                  {request.uid}
                </Row>
                <Row >
                  Time
                </Row>
                <Row >
                  {request.issueType.title.title}
                </Row>
              </Col>
              <Col span={8}>
                {request.status}
              </Col>
            </Col>
            <Col span={24}>
              {request.note}
            </Col>
            <Col span={24}>
              notified
              resend
            </Col>
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
