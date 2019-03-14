import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, List, Card, Button, Spin, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';
import * as generalActionCreator from '../../store/actions/general';
import * as officeAdminActionCreator from '../../store/actions/officeAdmin';
import UploadSpaceInfoFileForm from './uploadSpaceInfoFileForm';
import '../../App.css';

class SpaceInfoPage extends React.Component {

    state = {
        uploadFileFormVisible: false,
        uploadFormType: null,
        uploadFormLoading: false
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
            const secondPagePayload = getPagePayload(pageTitles.spaceInfoPageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(secondPagePayload);
                this.props.loadSpaceInfo({ officeUID: selectedOfficeUID });
            }
        }
    }

    showUploadFormRef = (type) => {
        this.setState({ uploadFileFormVisible: true, uploadFormType: type });
    }

    saveUploadFormRef = (form) => {
        this.uploadFormRef = form;
    }

    handleCreateUploadForm = () => {
        const formType = this.state.uploadFormType;
        const form = this.uploadFormRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            let fileObj = null;
            const uploadFileDict = values.uploadFile || null;
            if (uploadFileDict) {
                const value = uploadFileDict[0];
                fileObj = value.originFileObj;
            }

            const firebase = this.props.firebase;
            const storageRef = firebase.storage.ref();
            if (formType === 'onboarding') {
                const fileRef = storageRef.child('onboardingPDFs/' + this.props.currentOfficeUID + '.pdf');
                this.setState({uploadFormLoading: true});
                return fileRef.put(fileObj)
                .then( () => {
                    this.setState({uploadFormLoading: false});
                    this.hideUploadForm();
                    notification['success']({
                        message: 'Successfully uploaded file.'
                    });
                })
                .catch(error => {
                    console.error(error);
                    this.setState({uploadFormLoading: false});
                    notification['error']({
                        message: 'Unable to upload file.',
                        description: error.message
                    });
                })
            } else if (formType === 'floorplan') {
                const fileRef = storageRef.child('floorplanPDFs/' + this.props.currentOfficeUID + '.pdf');
                this.setState({uploadFormLoading: true});
                return fileRef.put(fileObj)
                .then( () => {
                    this.setState({uploadFormLoading: false});
                    this.hideUploadForm();
                    notification['success']({
                        message: 'Successfully uploaded file.'
                    });
                })
                .catch(error => {
                    console.error(error);
                    this.setState({uploadFormLoading: false});
                    notification['error']({
                        message: 'Unable to upload file.',
                        description: error.message
                    });
                })
            } else if (formType === 'buildingdetails') {
                const fileRef = storageRef.child('buildingDetailPDFs/' + this.props.currentOfficeUID + '.pdf');
                this.setState({uploadFormLoading: true});
                return fileRef.put(fileObj)
                .then( () => {
                    this.setState({uploadFormLoading: false});
                    this.hideUploadForm();
                    notification['success']({
                        message: 'Successfully uploaded file.'
                    });
                })
                .catch(error => {
                    console.error(error);
                    this.setState({uploadFormLoading: false});
                    notification['error']({
                        message: 'Unable to upload file.',
                        description: error.message
                    });
                })
            }
        })
    }

    handleCancelUploadForm = () => {
        this.hideUploadForm();
    }

    hideUploadForm = () => {
        this.setState({ uploadFileFormVisible: false, uploadFormType: null });
        this.uploadFormRef.setState({fileList: [] });
    }

    render() {
        const data = [
            {
                title: 'Onboarding PDF',
                url: this.props.onboardingURL,
                type: 'onboarding'
            },
            {
                title: 'Floor Plan PDF',
                url: this.props.floorplanURL,
                type: 'floorplan'
            },
            {
                title: 'Building Details PDF',
                url: this.props.buildingDetailsURL,
                type: 'buildingdetails'
            }
        ];

        return (
            <div>

                <UploadSpaceInfoFileForm
                    wrappedComponentRef={(form) => this.saveUploadFormRef(form) }
                    visible={this.state.uploadFileFormVisible}
                    onCancel={this.handleCancelUploadForm}
                    onCreate={this.handleCreateUploadForm}
                    confirmLoading={this.state.uploadFormLoading}
                    uploadFormType={this.state.uploadFormType}
                />
                <Row>
                    <Col className="wide-table" span={24}>
                        <h1>Space Info</h1>
                        <p>These files will be available to everyone in your office space.</p>
                        <Row>
                          <List
                              grid={{
                                  gutter: 32, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4,
                              }}
                              dataSource={data}
                              renderItem={item => (
                                <Spin tip="Loading..." spinning={this.props.isLoadingSpaceInfo}>
                                  <List.Item>
                                      <Card title={item.title}>
                                          <div>
                                              {(item.url !== null) ?
                                                <div>
                                                  <Button type="primary" style={{ marginRight: 15 }} onClick={() => window.open(item.url)} size='large'>Open File</Button>
                                                  <br/>
                                                  <br/>
                                                </div> : null}
                                              <Button type="primary" onClick={() => this.showUploadFormRef(item.type)} size='large' ghost>
                                                  {(item.url !== null ? 'Replace File' : 'Upload File')}
                                              </Button>
                                          </div>
                                      </Card>
                                  </List.Item>
                                </Spin>
                              )}
                          />
                        </Row>
                    </Col>
                </Row>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        firebase: state.firebase.firebase,
        isLoadingSpaceInfo: state.officeAdmin.isLoadingSpaceInfo,
        onboardingURL: state.officeAdmin.onboardingURL,
        floorplanURL: state.officeAdmin.floorplanURL,
        buildingDetailsURL: state.officeAdmin.buildingDetailsURL,
        userAdminOfficeList: state.auth.adminOfficeList,
        currentOfficeUID: state.general.currentOfficeAdminUID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadSpaceInfo: (payload) => dispatch(officeAdminActionCreator.getSpaceInfo(payload)),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpaceInfoPage));
