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
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevOfficeUID = prevProps.currentOfficeUID;
        const currentOfficeUID = this.props.currentOfficeUID;

        if (prevOfficeUID !== currentOfficeUID) {
            this.props.loadServiceRequests(currentOfficeUID);
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

    handleUpdateEmails = () => {
        console.log(this.updateEmailsFormRef)
        /* const createEventForm = this.createEventFormRef.props.form;
        createEventForm.validateFields((err, values) => {
            if (err) {
                return;
            }

            const currentOfficeUID = this.props.currentOfficeUID;

            const eventTitle = values.eventName;
            const description = values.description;

            const timeRange = values.eventTimeRange;
            if (Object.keys(timeRange).length < 2) {
              // handle error
              return
            }
            const startDate = timeRange[0]._d;
            const endDate = timeRange[1]._d;

            let photoFileObj = null;
            const uploadPhotoDict = values.uploadPhoto || null;
            if (uploadPhotoDict) {
                const value = uploadPhotoDict[0];
                const fileObj = value.originFileObj;
                photoFileObj = fileObj;
            }

            const payload = {
                eventTitle: eventTitle,
                description: description,
                startDate: startDate,
                endDate: endDate,
                photoFileObj: photoFileObj,
                selectedOfficeUID: currentOfficeUID,
                hideForm: this.hideCreateEventFormModal
            }

            this.props.createEvent(payload);
        }) */
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
                        <Modal

                          visible={this.state.showModal}
                          onCancel={() => this.closeEmailModal()}
                          onOk={this.handleUpdateEmails}
                          onCancel={() => this.closeEmailModal()}
                          className={"page-nav-menu"}
                          bordered={true}
                        >
                          <EmailModal
                          wrappedComponentRef={(form) => this.saveUpdateEmailsFormRef(form)}
                            onCancel={() => this.closeEmailModal()}
                            onCreate={this.handleCreateEvent}
                          />
                        </Modal>
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
        currentOfficeUID: state.general.currentOfficeAdminUID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadServiceRequests: (officeUID) => dispatch(actionCreator.loadServiceRequests(officeUID)),
        //updateEmails: (payload) => dispatch(actionCreator.updateEmails(payload)),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceRequestsPage));
