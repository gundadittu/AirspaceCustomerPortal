import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, notification } from 'antd';
import UsersTable from './usersTable';
import '../../App.css';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';
import Login from '../Login/Login';

class UsersPage extends React.Component {

    componentDidMount() {  
        // Routing stuff 
        if (this.props.match.isExact) { 
            const selectedOfficeUID = this.props.match.params.officeUID; 
            const userAdminOfficeList = this.props.userAdminOfficeList;
           if (userAdminOfficeList == null) { 
                notification['error']({
                    message: 'Permission denied.',
                    description: 'Current user is not a admin for this office.'
                });
               return 
           }
           const newArray = userAdminOfficeList.map( x => { 
                return (x.uid == selectedOfficeUID)
           })
           if (newArray.includes(true) == false) { 
                notification['error']({
                    message: 'Permission denied.',
                    description: 'Current user is not a admin for this office.'
                });
                return 
           }

            const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, {officeUID: selectedOfficeUID});
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
                <Login/>
            );
        }

        return (
            <Row>
                <Col className="wide-table" span={24}>
                    <h1>Users</h1>
                    <IconButton className="inlineDisplay" onClick={() => this.props.loadUserList(this.props.currentOfficeUID)}>
                        <RefreshIcon />
                    </IconButton>
                    <Button className="inlineDisplay" type="primary rightAlign" >Add User</Button>
                    <UsersTable />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentOfficeUID: state.general.currentOfficeAdminUID,
        user: state.auth.user,
        userAdminOfficeList: state.auth.adminOfficeList, 
        isLoadingUserData: state.officeAdmin.isLoadingUserData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadUserList: (officeUID) => dispatch(actionCreator.loadOfficeUsers(officeUID)), 
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersPage));

