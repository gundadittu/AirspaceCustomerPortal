import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

import { Row, Col, Button, Menu, Icon } from 'antd';
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
        currentList: 'active',
        createRoomFormVisible: false,
        clearForm: false
    }

    handleClick = (e) => {
        var key = e.key;
        if ((key == 'active') || (key == 'inactive')) {
            this.setState({ currentList: key });
        }
    }

    showCreateRoomFormModal = () => {
        this.setState({ createRoomFormVisible: true });
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
            const list = this.props.userAdminOfficeList;
            let officeObj = null;
            for (let key in list) {
                const value = list[key];

                if (value.uid == selectedOfficeUID) {
                    officeObj = value;
                }
            }

            const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, { officeUID: selectedOfficeUID, officeObj: officeObj });
            if (pagePayload) {
                this.props.changePage(pagePayload);
            }
            const secondPagePayload = getPagePayload(pageTitles.conferenceRoomsPageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(pagePayload);
                this.props.loadConferenceRooms(selectedOfficeUID);
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
        let dataSource = [];
        if (this.state.currentList == 'active') {
            dataSource = this.props.activeRoomsList
        } else if (this.state.currentList == 'inactive') {
            dataSource = this.props.inactiveRoomsList;
        }

        return (
            <div style={{ backgroundColor: '#FFFFFF' }}>
                <CreateUserForm
                    visible={this.state.createRoomFormVisible}
                    onCancel={this.handleCancelCreateRoom}
                    formTitle={this.props.currentOfficeName}
                />
                <Row>
                    <Col className="wide-table" span={24}>
                        <h1>Conference Rooms</h1>
                        <div>
                            <Menu
                                className="inlineDisplay"
                                style={{border: 0}}
                                onClick={this.handleClick}
                                defaultSelectedKeys={[this.state.currentList]}
                                mode="horizontal"
                            >
                                <IconButton onClick={() => this.props.loadConferenceRooms(this.props.currentOfficeUID)}>
                                    <RefreshIcon />
                                </IconButton>
                                <Menu.Item key="active">
                                    Active
                            </Menu.Item>
                                <Menu.Item key="inactive" >
                                    Inactive
                            </Menu.Item>
                            </Menu>
                            <Button className='inlineDisplay rightAlign' type="primary" onClick={this.showCreateRoomFormModal}>Add Room</Button>
                        </div>
                        <ConferenceRoomsTable dataSource={dataSource} />
                    </Col>
                </Row>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        activeRoomsList: state.officeAdmin.activeRoomsList,
        inactiveRoomsList: state.officeAdmin.inactiveRoomsList,
        isLoadingRoomsData: state.officeAdmin.isLoadingUserData,
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