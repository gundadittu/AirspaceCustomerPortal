import React from 'react';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';

import { Row, Col, Button, Menu } from 'antd';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import '../../App.css';

import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
// import * as officeActionCreator from '../../store/actions/officeAdmin';

import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';

import HotDesksTable from './hotDesksTable'
import CreateDeskForm from './createDeskForm'



class HotDesksPage extends React.Component {

    state = {
        currentList: 'active',
        createDeskFormVisible: false,
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
            const secondPagePayload = getPagePayload(pageTitles.hotDesksPageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(secondPagePayload);
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevOfficeUID = prevProps.currentOfficeUID;
        const currentOfficeUID = this.props.currentOfficeUID;
        if (prevOfficeUID !== currentOfficeUID) {
            this.props.loadHotDesks(currentOfficeUID);
        }
    }

    showCreateDeskFormModal = () => {
        this.setState({ createDeskFormVisible: true });
    }

    handleConfirmCreateDesk = () => {
        const createDeskForm = this.createDeskFormRef.props.form;
        createDeskForm.validateFields((err, values) => {
            if (err) {
                return;
            }
            const deskName = values.deskName;

            let reserveable = false;
            if (values.reserveable.includes('reserveable') === true) {
                reserveable = true;
            }

            let activeStatus = false;
            if (values.activeStatus === 'active') {
                activeStatus = true;
            }

            let photoFileObj = null;
            const uploadPhotoDict = values.uploadPhoto || null;
            if (uploadPhotoDict) {
                const value = uploadPhotoDict[0];
                const fileObj = value.originFileObj;
                photoFileObj = fileObj;
            }

            const currentOfficeUID = this.props.currentOfficeUID;

            const payload = {
                deskName: deskName,
                selectedOfficeUID: currentOfficeUID,
                reserveable: reserveable,
                activeStatus: activeStatus,
                photoFileObj: photoFileObj,
                hideForm: this.hideCreateDeskForm
            }
            this.props.createHotDesk(payload);
        })
    }

    handleCancelCreateDesk = () => {
        this.hideCreateDeskForm();
    }

    hideCreateDeskForm = () => {
        this.setState({
            createDeskFormVisible: false
        });
        const createDeskForm = this.createDeskFormRef.props.form;
        this.createDeskFormRef.setState({ fileList: [] });
        createDeskForm.setFields({
            deskName: {
                value: null
            },
            reserveable: {
                value: ['reserveable']
            },
            activeStatus: {
                value: 'active'
            },
            uploadPhoto: {
                value: []
            }
        })
    }

    saveCreateDeskFormRef = (form) => {
        this.createDeskFormRef = form;
    }

    handleClick = (e) => {
        var key = e.key;
        if ((key === 'active') || (key === 'inactive')) {
            this.setState({ currentList: key });
        }
    }

    render() {
        let dataSource = [];
        if (this.state.currentList === 'active') {
            dataSource = this.props.activeDesksList
        } else if (this.state.currentList === 'inactive') {
            dataSource = this.props.inactiveDesksList;
        }

        return (
            <div>
                <Row>
                    <Col className="wide-table" span={24}>
                        <h1>Hot Desks</h1>
                        <CreateDeskForm
                            wrappedComponentRef={(form) => this.saveCreateDeskFormRef(form)}
                            visible={this.state.createDeskFormVisible}
                            onCancel={this.handleCancelCreateDesk}
                            onCreate={this.handleConfirmCreateDesk}
                            confirmLoading={this.props.createDeskFormLoading}
                        />
                        <div>
                            <IconButton className="inlineDisplay" onClick={() => this.props.loadHotDesks(this.props.currentOfficeUID)}>
                                <RefreshIcon />
                            </IconButton>
                            <Menu
                                className="inlineDisplay"
                                style={{ border: 0 }}
                                onClick={this.handleClick}
                                selectedKeys={[this.state.currentList]}
                                mode="horizontal"
                            >
                                <Menu.Item key="active">
                                    Active
                            </Menu.Item>
                                <Menu.Item key="inactive" >
                                    Inactive
                            </Menu.Item>
                            </Menu>
                            <Button className="inlineDisplay rightAlign" type="primary" onClick={this.showCreateDeskFormModal}>Add Hot Desk</Button>
                        </div>
                        <HotDesksTable dataSource={dataSource} />
                    </Col>
                </Row>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        createDeskFormLoading: state.officeAdmin.createDeskFormLoading,
        activeDesksList: state.officeAdmin.activeDesksList,
        inactiveDesksList: state.officeAdmin.inactiveDesksList,
        isLoadingHotDesksData: state.officeAdmin.isLoadingUserData,
        currentOfficeUID: state.general.currentOfficeAdminUID,
        user: state.auth.user,
        userAdminOfficeList: state.auth.adminOfficeList,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createHotDesk: (payload) => dispatch(actionCreator.createHotDesk(payload)),
        loadHotDesks: (officeUID) => dispatch(actionCreator.loadHotDesks(officeUID)),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HotDesksPage));
