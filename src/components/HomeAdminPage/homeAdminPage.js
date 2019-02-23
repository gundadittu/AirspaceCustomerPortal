import React from 'react';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';

import { Row, Col, Button, Menu } from 'antd';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import StaticImage from "../../assets/images/home_empty_state.png";
import '../../App.css';

import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
// import * as officeActionCreator from '../../store/actions/officeAdmin';

import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';



class HomeAdminPage extends React.Component {

    state = {
        currentList: 'active',
        createDeskFormVisible: false,
    }

    render() {

        return (
            <div>
                <Row>
                    <Col className="wide-table" span={24}>
                        <h1>Home Page</h1>
                        <img alt="example" src={StaticImage}/>
                    </Col>
                </Row>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeAdminPage));
