import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon, Menu, Table, Tag, message, notification,
   Popconfirm, Row, Col, Card, Avatar, Modal} from 'antd';
// import Highlighter from 'react-highlight-words';
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
    visible: false
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

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
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
    const event = this.props.event
    return (
      <div>
        <Col span={8}>
          <Modal
            title={event.title}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            className={"page-nav-menu"}
          >
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
                Hello
              </Col>
            </Row>
          </Modal>
            <Card
              hoverable
              cover={<img alt="example" src={event.imageURL} />}
              onClick={(e) => this.handleModalClick (e)}
            >
              <Meta
                avatar={<Avatar src="data:image/png;base64,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" />}
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
