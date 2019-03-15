import React from 'react';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';

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

    state = {
        createUserFormVisible: false
    }

    showCreateUserFormModal = () => {
        this.setState({ createUserFormVisible: true });
    }

    handleCancelCreateUser = () => {
        this.hideCreateUserForm();
    }

    hideCreateUserForm = () => {
        this.createUserFormRef.props.form.setFields({
            firstName: {
                value: '',
                error: null
            },
            lastName: {
                value: '',
                error: null
            },
            emailAddress: {
                value: '',
                error: null
            },
            emailAddress2: {
                value: '',
                error: null
            },
            userType: {
                value: '',
                error: null
            }
        });

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
            const makeUserOfficeAdmin = (values.userType === 'regular') ? false : true;
            const officeUID = this.props.currentOfficeUID;
            const payload = { firstName: firstName, lastName: lastName, emailAddress: emailAddress, makeUserOfficeAdmin: makeUserOfficeAdmin, officeUID: officeUID, hideFormRef: this.hideCreateUserForm }
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
            const secondPagePayload = getPagePayload(pageTitles.userPageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(secondPagePayload);
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
            <div style={{ backgroundColor: '#FFFFFF' }}>
                <CreateUserForm
                    wrappedComponentRef={(form) => this.saveCreateUserFormRef(form)}
                    visible={this.state.createUserFormVisible}
                    onCancel={this.handleCancelCreateUser}
                    onCreate={this.handleCreateUser}
                    officeObj={this.props.currentOffice}
                    confirmLoading={this.props.createUserFormLoading}
                />
                <Row>
                    <Col className="wide-table" span={24}>
                        <h1>Users</h1>
                        <Row type="flex">
                            <Col span={12}>
                              <Row type="flex" style={{height:87}} align="middle" justify="start">
                                <IconButton className="inlineDisplay" onClick={() => this.props.loadUserList(this.props.currentOfficeUID)}>
                                    <RefreshIcon />
                                </IconButton>
                              </Row>
                            </Col>
                            <Col span={12}>
                              <Row type="flex" align="middle" justify="end">
                                <Button className="inlineDisplay rightAlign" type="primary" onClick={this.showCreateUserFormModal}>Add User</Button>
                              </Row>
                            </Col>
                        </Row>
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
        currentOffice: state.general.currentOfficeAdmin,
        user: state.auth.user,
        userAdminOfficeList: state.auth.adminOfficeList,
        isLoadingUserData: state.officeAdmin.isLoadingUserData,
        createUserFormLoading: state.officeAdmin.createUserFormLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadUserList: (officeUID) => dispatch(actionCreator.loadOfficeUsers(officeUID)),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
        createUserForOfficeAdmin: (payload) => dispatch(officeActionCreator.createUserForOfficeAdmin(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersPage));
