import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import UsersTable from './usersTable';
import UsersSideBar from './usersSideBar';

class UsersPage extends React.Component {
    render() {
        return (
            <Row>
                <Col span={20}>
                    <UsersTable />
                </Col>
                <Col span={4}>
                    <UsersSideBar />
                </Col>
            </Row>
        );
    }
}

export default connect(null, null)(UsersPage);

