import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

import { Row, Col, Button } from 'antd';
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
import UsersTable from './usersTable';
import CreateUserForm from './createUserForm';

class UsersPage extends React.Component {

    state =  { 
        createUserFormVisible: false 
    }

    showCreateUserFormModal = () => {
        this.setState({ createUserFormVisible: true });
    }

    handleCancelCreateUser = () => {
        this.setState({ createUserFormVisible: false });
    }

    handleCreateUser = () => {
        const createUserForm = this.createUserFormRef.props.form;
        createUserForm.validateFields((err, values) => {
            if (err) {
                return;
            }

            const firstName = values.firstName; 
            const lastName = values.lastName;
            const emailAddress = values.emailAddress; 
            const makeUserOfficeAdmin = (values.userType == 'regular') ? false : true;
            const officeUID = this.props.currentOfficeUID;
            const payload = { firstName: firstName, lastName: lastName, emailAddress: emailAddress, makeUserOfficeAdmin: makeUserOfficeAdmin, officeUID: officeUID, componentRef: this, formRef: createUserForm, }
            this.props.createUserForOfficeAdmin(payload);
        });
    }

    saveCreateUserFormRef = (createUserFormRef) => {
        this.createUserFormRef = createUserFormRef;
    }

    componentDidMount() {
        // Routing stuff 
        if (this.props.match.isExact) {
            const selectedOfficeUID = this.props.match.params.officeUID;
            const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, { officeUID: selectedOfficeUID });
            if (pagePayload) {
                this.props.changePage(pagePayload);
            }
            const secondPagePayload = getPagePayload(pageTitles.userPageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(pagePayload);
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevOfficeUID = prevProps.currentOfficeUID;
        const currentOfficeUID = this.props.currentOfficeUID;

        if (prevOfficeUID !== currentOfficeUID) {
            this.props.loadUserList(currentOfficeUID);
        }
    }

    render() {

        if (this.props.user == null) {
            return (
                <Login />
            );
        }

        return (
            <div style={{backgroundColor: '#FFFFFF'}}>
                <CreateUserForm
                    wrappedComponentRef={(form) => this.saveCreateUserFormRef(form)}
                    visible={this.state.createUserFormVisible}
                    onCancel={this.handleCancelCreateUser}
                    onCreate={this.handleCreateUser}
                    formTitle={this.props.currentOfficeName}
                    confirmLoading={this.props.createUserFormLoading}
                />
                <Row>
                    <Col className="wide-table" span={24}>
                        <h1>Users</h1>
                        <IconButton className="inlineDisplay" onClick={() => this.props.loadUserList(this.props.currentOfficeUID)}>
                            <RefreshIcon />
                        </IconButton>
                        <Button className="inlineDisplay" type="primary rightAlign" onClick={this.showCreateUserFormModal}>Add User</Button>
                        <UsersTable />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userList: state.officeAdmin.userList,
        currentOfficeUID: state.general.currentOfficeAdminUID,
        user: state.auth.user,
        userAdminOfficeList: state.auth.adminOfficeList,
        isLoadingUserData: state.officeAdmin.isLoadingUserData, 
        createUserFormLoading: state.officeAdmin.createUserFormLoading,
        createUserFormVisible: state.officeAdmin.createUserFormVisible
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadUserList: (officeUID) => dispatch(actionCreator.loadOfficeUsers(officeUID)),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
        createUserForOfficeAdmin: (payload) => dispatch(officeActionCreator.createUserForOfficeAdmin(payload)), 
        createUserForOfficeAdminFinished: (payload) => dispatch({type: actionTypes.CREATE_USER_FOR_OFFICEADMIN_FINISHED, payload: { ...payload }})
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersPage));

