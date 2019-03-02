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
      this.setState({
        showModal: false
      })
    }

    reverse_format = (emails) => {
      var emailObj = {}
      if(emails){
        Object.keys(emails).map((key) => {
          if (key == 'infoTech'){
            emailObj.IT = emails[key]
          } else if (key == 'plumbing') {
            emailObj.Plumbing = emails[key]
          } else if (key == 'lighting') {
            emailObj.Lighting = emails[key]
          } else if (key == 'generalMaintenance') {
            emailObj['General Maintenance'] = emails[key]
          } else if (key == 'furniture'){
            emailObj.Furniture = emails[key]
          } else if (key == 'door'){
            emailObj.Door = emails[key]
          } else if (key == 'heatingCooling'){
            emailObj['Heating/Cooling'] = emails[key]
          } else if (key == 'cleaning'){
            emailObj.Cleaning = emails[key]
          } else if (key == 'supplies'){
            emailObj.Supplies = emails[key]
          }
        })
      }

      return emailObj;
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
        } else if (key == 'General Maintenance') {
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
        const updateEmailsFormRef = this.updateEmailsFormRef.props.form;
        const currentOfficeUID = this.props.currentOfficeUID;

        var rawEmails = this.format_email_obj(newEmails);

        const payload = {
            selectedOfficeUID: currentOfficeUID,
            updatedEmails: rawEmails,
            hideForm: () => this.closeEmailModal()
        }

        this.props.editServiceRequestsEmails(payload)
        this.props.loadServiceRequestsEmails(this.props.currentOfficeUID);
    }
    saveUpdateEmailsFormRef = (form) => {
      this.updateEmailsFormRef = form;
    }

    render() {
        var emailsToPass = this.reverse_format(this.props.serviceRequestsEmailsList)
        return (
            <div>
                <Row>
                    <Col className="wide-table" span={24}>
                        <h1>Service Requests</h1>
                        <div>
                            <IconButton onClick={() => this.props.loadServiceRequests(this.props.currentOfficeUID)} className="inlineDisplay">
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
                          dataSource={emailsToPass}
                        />
                        <ServiceRequestsTable emailsToPass={this.props.serviceRequestsEmailsList}/>
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
        serviceRequestsEmailsList: state.officeAdmin.serviceRequestsEmailsList,
        currentOfficeUID: state.general.currentOfficeAdminUID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadServiceRequests: (officeUID) => dispatch(actionCreator.loadServiceRequests(officeUID)),
        loadServiceRequestsEmails: (officeUID) => dispatch(actionCreator.loadServiceRequestsEmails(officeUID)),
        editServiceRequestsEmails: (payload) => dispatch(actionCreator.editServiceRequestEmailsForOfficeAdmin(payload)),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceRequestsPage));
