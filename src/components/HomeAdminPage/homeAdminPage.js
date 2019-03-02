import React from 'react';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';

import { Row, Col, Button, Menu, Card} from 'antd';
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

    componentDidMount() {
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
      }

    }

    render() {

        return (
            <div>
                <Row>
                    <Col className="wide-table" span={24}>
                        <h1>Home Page</h1>
                        <Card
                          cover={<img alt="Request Photo" src={StaticImage} />}
                          bordered={false}
                        />
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
      changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeAdminPage));
