import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon, Menu, Table, Tag, message, notification,
   Popconfirm, Row, Col, Card, Avatar, Modal} from 'antd';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import * as actionCreator from '../../../store/actions/officeAdmin';
import EventCard from './eventCard'
const moment = require('moment');

const { Meta } = Card;
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

class AntEventCards extends React.Component {
  state = {
    visible: false
  };

  calcDate(date) {
    const time = moment(date).format("MMM Do YY");
    return time
  }

  formatDescription(event){
    var description = moment(event.startDate).format('ddd MMM DD, YYYY') + ": ";
    description += (moment(event.endDate).format('hh:mm a') + " - " + moment(event.endDate).format('hh:mm a'));
    return description;

  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleModalClick = () => {
    this.setState({
      visible: true,
    });
  }

  render() {
    var selectedEventsList = this.props.upcomingEventsList;
    if (this.props.currentList == 'past'){
      selectedEventsList = this.props.pastEventsList;
    }

    return (
      <div>
      <div style={{ padding: '30px' }}>
        <Row gutter={16}>
          {selectedEventsList ? selectedEventsList.map((event) => (
            <Col key={event.uid} span={8} style={{ padding: '15px' }}>
              <EventCard event={event}/>
            </Col>
          )) : <div></div>}
        </Row>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentOfficeUID: state.general.currentOfficeAdminUID,
    upcomingEventsList: state.officeAdmin.upcomingEventsList,
    pastEventsList: state.officeAdmin.pastEventsList,
    isLoadingEventsData: state.officeAdmin.isLoadingUserData,
  }
};

export default connect(mapStateToProps, null)(AntEventCards);
