import React from 'react';
import { connect } from 'react-redux';
import { Row, Col} from 'antd';
import StaticImage from "../../assets/images/home_empty_state.png";
import '../../App.css';
import * as generalActionCreator from '../../store/actions/general';

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
          const officeUID = this.props.match.params.officeUID;
          if (officeUID === null) { 
              return 
          }

          let officeObj = null; 
          const allAdminOffices = this.props.allAdminOffices || null;
          if (allAdminOffices === null) { 
            return
          } 

          for (let key in allAdminOffices) { 
              const value = allAdminOffices[key];
              if (value.uid === officeUID) { 
                  officeObj = value;
                  break;
              }
          }

          if (officeObj === null) { 
              return 
          }

          const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, { officeUID: officeUID, officeObj: officeObj });
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
                        <img style={{width:'70%', height:'70%'}} alt="Request Photo" src={StaticImage} />
                      </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        currentOfficeAdmin: state.general.currentOfficeAdmin, 
        allAdminOffices: state.auth.adminOfficeList
    }
};

const mapDispatchToProps = dispatch => {
    return {
      changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeAdminPage));
