import React from 'react';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';

import { Row, Col, Button, Menu, Modal} from 'antd';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import '../../App.css';

import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
// import * as officeActionCreator from '../../store/actions/officeAdmin';

import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';


import ServiceRequestsTable from './serviceRequestsTable'
import EmailModal from './emailModal.js'


class ServiceRequestsPage extends React.Component {

    state = {
      showModal: false
    }

    componentDidMount() {
        // Routing stuff
        console.log(this.props.user)
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

          const pagePayload = getPagePayload(pageTitles.serviceRequestsPageOfficeAdmin, { officeUID: selectedOfficeUID, officeObj: officeObj });
          console.log("pagePayload ", pagePayload)
          if (pagePayload) {
              this.props.changePage(pagePayload);
          }

            const secondPagePayload = getPagePayload(pageTitles.serviceRequestsPageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(secondPagePayload);
                this.props.loadServiceRequests(selectedOfficeUID);
                this.props.loadServiceRequestsEmails(selectedOfficeUID);
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevOfficeUID = prevProps.currentOfficeUID;
        const currentOfficeUID = this.props.currentOfficeUID;

        if (prevOfficeUID !== currentOfficeUID) {
            this.props.loadServiceRequests(currentOfficeUID);
            this.props.loadServiceRequestsEmails(currentOfficeUID);
        }
    }

    showEmailModal() {
      this.setState({
        showModal: true
      })
    }

    closeEmailModal() {
      console.log(this)
      this.setState({
        showModal: false
      })
    }

    format_email_obj = (emails) => {
      var emailObj = {}

      Object.keys(emails).map((key) => {
        if (key == 'IT'){
          emailObj.infoTech = emails[key]
        } else if (key == 'Plumbing') {
          emailObj.plumbing = emails[key]
        } else if (key == 'Lighting') {
          emailObj.lighting = emails[key]
        } else if (key == 'GeneralMaintenance') {
          emailObj.generalMaintenance = emails[key]
        } else if (key == 'Furniture'){
          emailObj.furniture = emails[key]
        } else if (key == 'Door'){
          emailObj.door = emails[key]
        } else if (key == 'Heating/Cooling'){
          emailObj.heatingCooling = emails[key]
        } else if (key == 'Cleaning'){
          emailObj.cleaning = emails[key]
        } else if (key == 'Supplies'){
          emailObj.supplies = emails[key]
        }
      })

      return emailObj;
    }

    handleUpdateEmails = () => {
        var newEmails = this.updateEmailsFormRef.state.emails
        console.log(newEmails)
        const updateEmailsFormRef = this.updateEmailsFormRef.props.form;
        const currentOfficeUID = this.props.currentOfficeUID;
        console.log(currentOfficeUID)

        var rawEmails = this.format_email_obj(newEmails);
        console.log(rawEmails)

        const payload = {
            selectedOfficeUID: currentOfficeUID,
            updatedEmails: rawEmails
        }

        this.props.editServiceRequestsEmails(payload);
    }
    saveUpdateEmailsFormRef = (form) => {
      this.updateEmailsFormRef = form;
    }

    render() {
        return (
            <div>
                <Row>
                    <Col className="wide-table" span={24}>
                        <h1>Service Requests</h1>
                        <div>
                            <IconButton className="inlineDisplay">
                                <RefreshIcon />
                            </IconButton>
                            <Button className="inlineDisplay rightAlign" type="primary" onClick={() => this.showEmailModal()}>Auto Routing</Button>
                        </div>
                        <EmailModal
                          wrappedComponentRef={(form) => this.saveUpdateEmailsFormRef(form)}
                          onCancel={() => this.closeEmailModal()}
                          onCreate={this.handleCreateEvent}
                          showModal={this.state.showModal}
                          closeEmailModal={() => this.closeEmailModal()}
                          handleUpdateEmails={this.handleUpdateEmails}
                        />
                        <ServiceRequestsTable dataSource={this.props.serviceRequestsList}/>
                    </Col>
                </Row>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        userAdminOfficeList: state.auth.adminOfficeList,
        serviceRequestsList: state.officeAdmin.serviceRequestsList,
        serviceRequestsEmails: state.officeAdmin.serviceRequestsEmails,
        currentOfficeUID: state.general.currentOfficeAdminUID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadServiceRequests: (officeUID) => dispatch(actionCreator.loadServiceRequests(officeUID)),
        loadServiceRequestsEmails: (officeUID) => dispatch(actionCreator.loadServiceRequestsEmails(officeUID)),
        //updateEmails: (payload) => dispatch(actionCreator.updateEmails(payload)),
        editServiceRequestsEmails: (payload) => dispatch(actionCreator.editServiceRequestEmailsForOfficeAdmin(payload)),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceRequestsPage));
