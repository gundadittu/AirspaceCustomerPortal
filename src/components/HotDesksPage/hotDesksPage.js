import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

import { Row, Col, Button, Menu, Icon} from 'antd';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import '../../App.css';

import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
import * as officeActionCreator from '../../store/actions/officeAdmin';

import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';

import HotDesksTable from './hotDesksTable'
import CreateDeskForm from './createDeskForm'



class HotDesksPage extends React.Component {

  state = {
    current: 'Active',
    createDeskFormVisible: false,
  }

  componentDidMount() {
      // Routing stuff
      if (this.props.match.isExact) {
          const selectedOfficeUID = this.props.match.params.officeUID;
          const pagePayload = getPagePayload(pageTitles.hotDesksPageOfficeAdmin, { officeUID: selectedOfficeUID });
          if (pagePayload) {
              this.props.changePage(pagePayload);
          }
          const secondPagePayload = getPagePayload(pageTitles.hotDesksPageOfficeAdmin);
          if (secondPagePayload) {
              this.props.changePage(pagePayload);
          }
      }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      const prevOfficeUID = prevProps.currentOfficeUID;
      const currentOfficeUID = this.props.currentOfficeUID;
      if (prevOfficeUID !== currentOfficeUID) {
          this.props.loadHotDesks(currentOfficeUID);
      }
      console.log(this.props.desksList)
  }

  showCreateDeskFormModal = () => {
      this.setState({createDeskFormVisible: true });
  }

  handleCancelCreateDesk = () => {
      this.setState({
        createDeskFormVisible: false,
        clearForm: true
      });
  }

  render() {
    return (
      <div>
      <Row>
          <Col className="wide-table" span={24}>
              <h1>Hot Desks</h1>
              <CreateDeskForm
                  visible={this.state.createDeskFormVisible}
                  onCancel={this.handleCancelCreateDesk}
                  formTitle={this.props.currentOfficeName}
              />
              <Menu
                  onClick={this.handleClick}
                  selectedKeys={[this.state.current]}
                  mode="horizontal"
                >
                  <IconButton className="inlineDisplay" onClick={() => this.props.loadHotDesks(this.props.currentOfficeUID)}>
                      <RefreshIcon />
                  </IconButton>
                  <Menu.Item key="Active">
                    Active
                  </Menu.Item>
                  <Menu.Item key="Inactive" >
                    Inactive
                  </Menu.Item>
                  <Button className="inlineDisplay" type="primary rightAlign" onClick={this.showCreateDeskFormModal}>Add Hot Desk</Button>
              </Menu>
              <HotDesksTable />
          </Col>
      </Row>
      </div>
    )
  }
}


const mapStateToProps = state => {
    return {
        desksList: state.officeAdmin.desksList,
        isLoadingHotDesksData : state.officeAdmin.isLoadingUserData,
        currentOfficeUID: state.general.currentOfficeAdminUID,
        user: state.auth.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadHotDesks: (officeUID) => dispatch(actionCreator.loadHotDesks(officeUID)),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HotDesksPage));
