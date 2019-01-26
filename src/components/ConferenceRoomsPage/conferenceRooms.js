import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

import { Row, Col, Button, Menu, Icon} from 'antd';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import '../../App.css';

import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
import * as officeActionCreator from '../../store/actions/officeAdmin';

import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';

import Login from '../Login/Login';
import ConferenceRoomsTable from './conferenceRoomsTable'
import CreateUserForm from './createRoomForm'


class ConferenceRoomsPage extends React.Component {

    state = {
      current: 'Active',
      createRoomFormVisible: false,
      clearForm: false
    }

    handleClick = (e) => {
      console.log('click ', e);
      this.setState({
        current: e.key,
      });
    }

    showCreateRoomFormModal = () => {
        this.setState({createRoomFormVisible: true });
    }

    handleCancelCreateRoom = () => {
        this.setState({
          createRoomFormVisible: false,
          clearForm: true
        });
    }

    componentDidMount() {
        // Routing stuff
        if (this.props.match.isExact) {
            const selectedOfficeUID = this.props.match.params.officeUID;
            const pagePayload = getPagePayload(pageTitles.conferenceRoomsPageOfficeAdmin, { officeUID: selectedOfficeUID });
            if (pagePayload) {
                this.props.changePage(pagePayload);
            }
            const secondPagePayload = getPagePayload(pageTitles.conferenceRoomsPageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(pagePayload);
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

    render() {
      return (
            <div style={{backgroundColor: '#FFFFFF'}}>
            <CreateUserForm
                visible={this.state.createRoomFormVisible}
                onCancel={this.handleCancelCreateRoom}
                formTitle={this.props.currentOfficeName}
            />
                <Row>
                    <Col className="wide-table" span={24}>
                        <h1>Conference Rooms</h1>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                          >
                            <IconButton className="inlineDisplay" onClick={() => this.props.loadConferenceRooms(this.props.currentOfficeUID)}>
                                <RefreshIcon />
                            </IconButton>
                            <Menu.Item key="Active">
                              Active
                            </Menu.Item>
                            <Menu.Item key="Inactive" >
                              Inactive
                            </Menu.Item>
                            <Button className="inlineDisplay" type="primary rightAlign" onClick={this.showCreateRoomFormModal}>Add Room</Button>
                          </Menu>
                        <ConferenceRoomsTable />
                    </Col>
                </Row>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        roomsList: state.officeAdmin.roomsList,
        isLoadingRoomsData : state.officeAdmin.isLoadingUserData,
        currentOfficeUID: state.general.currentOfficeAdminUID,
        user: state.auth.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadConferenceRooms: (officeUID) => dispatch(actionCreator.loadConferenceRooms(officeUID)),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConferenceRoomsPage));
