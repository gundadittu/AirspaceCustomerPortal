import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Modal } from 'antd';
import EditEventForm from './editEventForm.js'
import '../../App.css'
import * as actionCreator from '../../store/actions/officeAdmin';
const moment = require('moment');

const { Meta } = Card;

class EventCard extends React.Component {

  state = {
    showModal: false,
    showInfo: true
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

  handleEditEvent = () => {

    if (this.state.showInfo === true) {
      // show edit form
      this.setState({
        showInfo: false
      });
    } else if (this.state.showInfo === false) {
      // submit edit changes 

      const editEventForm = this.editEventFormRef.props.form;
      editEventForm.validateFields((err, values) => {
        if (err) {
          return;
        }

        const currentOfficeUID = this.props.currentOfficeAdminUID;

        const eventTitle = values.eventName;
        const description = values.description;
        
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
          hideForm: this.handleFinishedEditEventRequest
        }
        this.props.editEvent(payload);
      })
    }
  }

  handleFinishedEditEventRequest = () => {
    this.setState({
      showInfo: false,
      showModal: false,
    });
  }

  handleCancel = (e) => {
    if (this.state.showInfo === true) {
      this.setState({
        showInfo: false,
        showModal: false,
      });
    } else {
      // if currently editing, switch back to info mode 
      this.setState({
        showInfo: true
      });
    }
  }

  handleCardSelection = () => {
    this.setState({
      showModal: true,
      showInfo: true,
    });
  }

  saveEditEventFormRef = (form) => {
    this.editEventFormRef = form
  }

  render() {
    const event = this.props.event;
    const showEditForm = (this.state.showInfo === false) ? true : false;
    return (
      <div>
        <Col span={8}>
          <Modal
            visible={this.state.showModal}
            onOk={this.handleEditEvent}
            okText={(this.state.showInfo) ? "Edit" : "Save"}
            onCancel={this.handleCancel}
            className={"page-nav-menu"}
            bordered={true}
          >
            {(this.state.showInfo === true) ?

              (<Row gutter={16}>
                <Col span={8}>
                  <Card
                    cover={<img alt="Event Photo" src={event.imageURL} />}
                    onClick={this.handleCardSelection}
                    bordered={true}
                  >
                  </Card>
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

              : null
            }

            <EditEventForm
              wrappedComponentRef={(form) => this.saveEditEventFormRef(form)}
              visible={showEditForm}
              event={event}
              confirmLoading={this.props.editEventFormLoading}
            />
          </Modal>

          <Card
            bordered={false}
            hoverable
            cover={<img alt="Event Photo" src={event.imageURL} />}
            onClick={this.handleCardSelection}
          >
            <Meta
              title={event.title}
              description={this.formatDate(event)}
            />
          </Card>
        </Col>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
