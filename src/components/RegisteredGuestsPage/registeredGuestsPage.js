import React from 'react';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';

import { Row, Col, Menu} from 'antd';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import '../../App.css';

import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
// import * as officeActionCreator from '../../store/actions/officeAdmin';

import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';

import RegisteredGuestsTable from './registeredGuestsTable'

class RegisteredGuestsPage extends React.Component {

  state = {
    currentList : 'upcoming'
  }

  upcomingDataSource = [{
    key: '1',
    name: 'Aditya Gunda',
    email: 'adityagunda@uchicago.edu',
    arrived: true,
    expectedVisitDate: 'Febryary 4, 2019',
  }, {
    key: '2',
    name: 'Diego Ibarra',
    email: 'diegoibarra@uchicago.edu',
    arrived: false,
    expectedVisitDate: 'February 2, 2019',
  }];

  pastDataSource = [{
    key: '3',
    name: 'Soheil Ebadat',
    email: 'soheilebadat@uchicago.edu',
    arrived: true,
    expectedVisitDate: 'January 1, 2019',
  }, {
    key: '4',
    name: 'Tim Koenning',
    email: 'timkoenning@uchicago.edu',
    arrived: true,
    expectedVisitDate: 'January 13, 2019',
  }];

  componentDidMount() {
      // Routing stuff
      if (this.props.match.isExact) {

          const selectedOfficeUID = this.props.match.params.officeUID;
          const list = this.props.userAdminOfficeList;
          let officeObj = null;
          for (let key in list) {
              const value = list[key];

              if (value.uid === selectedOfficeUID) {
                  officeObj = value;
              }
          }

          const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, { officeUID: selectedOfficeUID, officeObj: officeObj });
          if (pagePayload) {
              this.props.changePage(pagePayload);
          }
          const secondPagePayload = getPagePayload(pageTitles.registeredGuestsPageOfficeAdmin);
          if (secondPagePayload) {
              this.props.changePage(secondPagePayload);
              this.props.loadRegisteredGuests(selectedOfficeUID);
          }
      }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      const prevOfficeUID = prevProps.currentOfficeUID;
      const currentOfficeUID = this.props.currentOfficeUID;

      if (prevOfficeUID !== currentOfficeUID) {
          this.props.loadConferenceRooms(currentOfficeUID);
      }
  }

  handleClick = (e) => {
      var key = e.key;
      if ((key === 'upcoming') || (key === 'past')) {
          this.setState({ currentList: key });
      }
  }

  render() {
    let dataSource = [];
    if (this.state.currentList === 'past') {
        dataSource = this.pastDataSource;//this.props.pastGuestsList
    } else if (this.state.currentList === 'upcoming') {
        dataSource = this.upcomingDataSource;//this.props.upcomingGuestsList;
    }
    return (
      <div>
        <Row>
            <Col className="wide-table" span={24}>
                <h1>Registered Guests</h1>
                <Menu
                    onClick={(e) => this.handleClick(e)}
                    selectedKeys={[this.state.currentList]}
                    className="page-nav-menu"
                    mode="horizontal"
                  >
                    <IconButton className="inlineDisplay" onClick={() => this.props.loadRegisteredGuests(this.props.currentOfficeUID)}>
                        <RefreshIcon />
                    </IconButton>
                    <Menu.Item key="upcoming">
                      Upcoming
                    </Menu.Item>
                    <Menu.Item key="past" >
                      Past
                    </Menu.Item>
                </Menu>
                <RegisteredGuestsTable dataSource={dataSource}/>
            </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        pastGuestsList: state.officeAdmin.pastGuestsList,
        upcomingGuestsList: state.officeAdmin.upcomingGuestsList,
        isLoadingGuestsData: state.officeAdmin.isLoadingGuestsData,
        currentOfficeUID: state.general.currentOfficeAdminUID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadRegisteredGuests: (officeUID) => dispatch(actionCreator.loadRegisteredGuests(officeUID)),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisteredGuestsPage));
