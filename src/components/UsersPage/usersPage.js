import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import UsersTable from './usersTable';
import '../../App.css';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import * as actionCreator from '../../store/actions/officeAdmin';

class UsersPage extends React.Component {

    render() {
        return (
            <Row>
                <Col className="wide-table" span={24}>
                    <h1>Users</h1>
                    <IconButton className="inlineDisplay" onClick={() => this.props.loadUserList(this.props.currentOfficeUID)}>
                        <RefreshIcon />
                    </IconButton>
                    <Button className="inlineDisplay" type="primary" >Add User</Button>
                    <UsersTable />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentOfficeUID: state.general.currentOfficeAdminUID,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadUserList: (officeUID) => dispatch(actionCreator.loadOfficeUsers(officeUID))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);

