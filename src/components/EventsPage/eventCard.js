import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon, Menu, Table, Tag, message, notification,
   Popconfirm, Row, Col, Card, Avatar, Modal} from 'antd';
// import Highlighter from 'react-highlight-words';
import EditEventForm from './editEventForm.js'
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import '../../App.css'
import * as actionCreator from '../../store/actions/officeAdmin';
const moment = require('moment');

const { Meta } = Card;
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

class EventCard extends React.Component {
  state = {
    showModal: false,
    showInfo: false,
    showEditForm: false,
  };


  calcDate(date) {
    const time = moment(date).format("MMM Do YY");
    return time
  }

  formatDescription(event){
    var description = moment(event.startDate).format('ddd MMM DD, YYYY') + ": ";
    description += (moment(event.startDate).format('hh:mm a') + " - " + moment(event.endDate).format('hh:mm a'));
    return description;

  }

  handleOk = (e, event) => {
    console.log(event);
    this.setState({
      showInfo: false,
      showEditForm: true
    });
    /*console.log(this.editEventFormRef);
    const editEventForm = this.editEventFormRef.props.form;
    editEventForm.setFields({
      eventName: {
        value: event.title
      }
    });*/
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      showInfo: false,
      showEditForm: false,
      showModal: false,
    });
  }

  handleModalClick = () => {
    this.setState({
      showModal: true,
      showInfo:true,
    });
  }

  saveEditEventFormRef = (form) => {
    this.editEventFormRef = form
    console.log(this.editEventFormRef)
  }

  render() {
    const event = this.props.event
    return (
      <div>
        <Col span={8}>
          <Modal
            visible={this.state.showModal}
            onOk={(e) => this.handleOk(e, event)}
            okText={"Edit"}
            onCancel={this.handleCancel}
            className={"page-nav-menu"}
            bordered={false}
          >
            {this.state.showInfo ? (
              <div>
                <Row gutter={16}>
                  <Col span={8}>
                    <Card
                      cover={<img alt="example" src={event.imageURL} />}
                      onClick={(e) => this.handleModalClick (e)}
                      bordered={false}
                    >
                    </Card>
                  </Col>
                  <Col span={16}>
                    <h2>{event.title}</h2>
                    <span>{this.formatDescription(event)}</span>
                  </Col>
                </Row>
                <span>{event.description}</span>
              </div>
            ) : (
              <div>
                <EditEventForm
                  showEditForm={this.state.showEditForm}
                  wrappedComponentRef={(form) => this.saveEditEventFormRef(form)}
                  event={event}
                />
              </div>
            )}
          </Modal>
            <Card
              bordered={false}
              hoverable
              cover={<img alt="example" src={event.imageURL} />}
              onClick={(e) => this.handleModalClick (e)}
            >
              <Meta
                title={event.title}
                description={this.formatDescription(event)}
              />
            </Card>
        </Col>
      </div>
    )
  }
}

export default connect(null, null)(EventCard);
