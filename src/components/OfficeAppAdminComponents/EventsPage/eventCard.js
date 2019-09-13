import React from 'react';
import { connect } from 'react-redux';
import { Icon, Row, Col, Card, Modal, Spin, Popconfirm, message} from 'antd';
import Button from '@material-ui/core/Button';
import EditEventForm from './editEventForm'
import '../../../App.css'
import * as actionCreator from '../../../store/actions/officeAdmin';
const moment = require('moment');

const { Meta } = Card;

class EventCard extends React.Component {

  state = {
    showModal: false,
    showInfo: true,
    loadingImage: true,
    loadingModalImage: true,
    showDeleteConfirmation: false,
    condition: false
  };

  calcDate(date) {
    const time = moment(date).format("MMM Do YY");
    return time
  }

  formatDate(event) {
    var description = moment(event.startDate).format('ddd MMM DD, YYYY') + ": ";
    description += (moment(event.startDate).format('hh:mm a') + " - " + moment(event.endDate).format('hh:mm a'));
    return description;
  }

  completeLoad = () => {
    this.setState({
      loadingImage: false
    })
  }
  completeLoadExpanded = () => {
    this.setState({
      loadModalImage: false
    })
  }

  handleEditEvent = () => {

    if (this.state.showInfo === true) {
      // show edit form
      this.props.mixpanel.track('Clicked Edit on Event Card.');
      this.setState({
        showInfo: false
      });
    } else if (this.state.showInfo === false) {
      // submit edit changes
      this.props.mixpanel.track('Confirm Edit on Event Card.');
      const editEventForm = this.editEventFormRef.props.form;
      editEventForm.validateFields((err, values) => {
        if (err) {
          return;
        }

        const currentOfficeUID = this.props.currentOfficeAdminUID;

        const eventTitle = values.eventName;
        const description = values.description;
        const address = values.eventAddress;

        const timeRange = values.eventTimeRange;
        if (Object.keys(timeRange).length < 2) {
          // handle error
          return
        }
        const startDate = timeRange[0]._d;
        const endDate = timeRange[1]._d;
        const canceled = (values.cancelStatus.includes('cancelled') === true) ? true : false;

        let photoFileObj = null;
        const uploadPhotoDict = values.uploadPhoto || null;
        if (uploadPhotoDict) {
          const value = uploadPhotoDict[0];
          const fileObj = value.originFileObj;
          photoFileObj = fileObj;
        }

        const selectedEventUID = this.props.event.uid;
        if (selectedEventUID === null) {
          return
        }

        const payload = {
          selectedEventUID: selectedEventUID,
          eventTitle: eventTitle,
          description: description,
          startDate: startDate,
          endDate: endDate,
          photoFileObj: photoFileObj,
          canceled: canceled,
          selectedOfficeUID: currentOfficeUID,
          hideForm: this.handleFinishedEditEventRequest,
          address: address
        }
        this.props.editEvent(payload);
      })
    }
  }

  handleFinishedEditEventRequest = () => {
    this.setState({
      showInfo: false,
      showModal: false,
      showDeleteConfirmation: false
    });
  }

  handleCancel = (e) => {
    if (this.state.showInfo === true) {
      this.props.mixpanel.track('Closed Event Modal.');
      this.setState({
        showInfo: false,
        showModal: false,
        showDeleteConfirmation: false
      });
    } else {
      // if currently editing, switch back to info mode
      this.setState({
        showInfo: true
      });
    }
  }

  handleCardSelection = () => {
    this.props.mixpanel.track('Clicked on Event Card in events page.');
    this.setState({
      showModal: true,
      showInfo: true,
    });
  }

  saveEditEventFormRef = (form) => {
    this.editEventFormRef = form
  }

  handleVisibleChange = (showDeleteConfirmation) => {
    this.props.mixpanel.track('Showing cancel event confirmation dialog.');
    this.setState({ showDeleteConfirmation: true });
  }

  confirmCancelEvent = () => {
    this.props.mixpanel.track('Confirmed Cancel Event from Event Card in events page.');
    this.setState({ showDeleteConfirmation: false });
    const currentOfficeUID = this.props.currentOfficeAdminUID;
    const selectedEventUID = this.props.event.uid;
    if (selectedEventUID === null) {
      return
    }

    const payload = {
      selectedEventUID: selectedEventUID,
      selectedOfficeUID: currentOfficeUID,
      canceled: true,
      hideForm: this.handleFinishedEditEventRequest,
    }
    this.props.editEvent(payload);

  }

  // This function is when the user decides to no longer cancel a event from the confirm dialog 
  cancelEvent = () => {
    this.props.mixpanel.track("Did not cancel Event from Event Card.");
    this.setState({ showDeleteConfirmation: false });
    message.error('Did not cancel event.');
  }

  render() {
    const event = this.props.event;
    const showEditForm = (this.state.showInfo === false) ? true : false;

    return (
      <div>
          <Modal
            visible={this.state.showModal}
            onOk={this.handleEditEvent}
            onCancel={this.handleCancel}
            className={"page-nav-menu"}
            okButtonProps={{loading: this.props.editEventFormLoading}}
            bordered={true}
            footer={[
              <Popconfirm
                key={event.uid}
                title="Are you sure you want to cancel this event?"
                visible={this.state.showDeleteConfirmation}
                onVisibleChange={this.handleVisibleChange}
                onConfirm={this.confirmCancelEvent}
                onCancel={this.cancelEvent}
                placement="topRight"
                okText="Yes"
                cancelText="No"
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              >
                <Button style={{color: "#f5222d"}} type="danger" key="cancel" onClick={this.handleVisibleChange}>Cancel Event</Button>
              </Popconfirm>,
              <Button style={{color: "#0050b3"}} key="edit" type="primary" loading={this.props.editFormLoading} onClick={this.handleEditEvent}>
                {(this.state.showInfo) ? "Edit" : "Save"}
              </Button>,
            ]}
          >
            {(this.state.showInfo === true) ?
              (<Row gutter={16}>
                <Col span={8}>
                <Spin tip="Loading..." spinning={this.state.loadModalImage}>
                  <Card
                      cover={<img alt="No Event Photo Provided" src={event.imageURL}
                      onLoad={this.completeLoadExpanded}
                      onError={this.completeLoadExpanded}
                      />}
                      onClick={this.handleCardSelection}
                      bordered={false}
                    >
                    </Card>
                </Spin>
                </Col>
                <Col span={16}>
                  <div>
                    <h2>{event.title}</h2>
                    <span>{this.formatDate(event)}</span>
                    <br />
                    <br />
                    <span>{event.description}</span>
                  </div>
                </Col>
              </Row>)

              :

                <EditEventForm
                  wrappedComponentRef={(form) => this.saveEditEventFormRef(form)}
                  visible={showEditForm}

                  event={event}
                  confirmLoading={this.props.editEventFormLoading}
                />
            }
          </Modal>
          <Spin tip="Loading..." spinning={this.state.loadingImage}>
            <Card
              bordered={false}
              headStyle={{borderBottom:0}}
              style={{height:250, width:"100%"}}
              hoverable
              cover={
                <div>
                  <Row type="flex" justify="space-around" align="middle">
                    <img
                      alt="No Event Photo Provided" src={event.imageURL}
                      onLoad={this.completeLoad}
                      onError={this.completeLoad}
                      style={{maxWidth:"100%",
                      maxHeight:125}}
                    />
                  </Row>
                </div>
                }
              onClick={this.handleCardSelection}
            >
              <Meta
                style={{height:"50%"}}
                title={event.title}
                description={this.formatDate(event)}
              />
            </Card>
          </Spin>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentOfficeAdminUID: state.general.currentOfficeAdminUID,
    editEventFormLoading: state.officeAdmin.editEventFormLoading, 
    mixpanel: state.firebase.mixpanel
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editEvent: (payload) => dispatch(actionCreator.editEvent(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
