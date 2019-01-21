import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import UsersTable from './usersTable';
import '../../App.css';
// import UsersSideBar from './usersSideBar';

class UsersPage extends React.Component {
    render() {
        return (
            <Row>
                <Col className="wide-table" span={24}>
                    <div>
                        <h1>Users</h1>
                        <Button className="right-button" type="primary" >Add User</Button>
                    </div>
                    <UsersTable />  
                </Col>
            </Row>
        );
    }
}

export default connect(null, null)(UsersPage);

