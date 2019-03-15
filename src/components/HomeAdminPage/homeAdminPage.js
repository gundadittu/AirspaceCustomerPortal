import React from 'react';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';

import { Row, Col} from 'antd';
// import RefreshIcon from '@material-ui/icons/Refresh';
// import IconButton from '@material-ui/core/IconButton';
import StaticImage from "../../assets/images/home_empty_state.png";
import '../../App.css';

// import * as actionCreator from '../../store/actions/officeAdmin';
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
          let officeObj = this.props.currentOfficeAdmin;
          console.log("home officeObj:"+officeObj);
          if (officeObj === null) { 
              return 
          }
          
          const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, { officeUID: officeObj.uid, officeObj: officeObj });
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
                      <Row>
                        <h1>Home</h1>
                      </Row>
                      <Row  type="flex" justify="space-around" align="middle">
                        <img style={{width:'70%', height:'70%'}}alt="Request Photo" src={StaticImage} />
                      </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        currentOfficeAdmin: state.general.currentOfficeAdmin 
    }
};

const mapDispatchToProps = dispatch => {
    return {
      changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeAdminPage));
