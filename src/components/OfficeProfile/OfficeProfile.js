import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';

import RefreshIcon from '@material-ui/icons/Refresh';
import { Row, Col, Menu, Empty, Button, Spin, Card, Upload, Icon, Tooltip, Input } from 'antd';

import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

class OfficeProfilePage extends React.Component {

    changes = {};

    addChange = (dict) => {
        const updated = {
            ...this.changes,
            ...dict
        }
        this.changes = updated;
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
            const secondPagePayload = getPagePayload(pageTitles.officeProfilePageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(secondPagePayload);
            }
            this.props.loadOfficeProfile(selectedOfficeUID);
        }
    }

    saveChanges() {
        this.props.updateOfficeProfile(this.props.currentOfficeAdminUID, this.changes);
    }

    uploadAttachments(attachment) {
        this.props.uploadAttachmentOfficeProfile(this.props.currentOfficeAdminUID, attachment);
    }

    getBody() {
        if (this.props.isLoadingOfficeProfile) {
            return (
                <div style={{ textAlign: "center" }} className="example">
                    <Spin />
                </div>
            )
        }

        const profile = this.props.officeProfile || null;

        if (profile === null) {
            return null
        }

        // const companyName = profile["Company Name"] || "";
        // const employeeNo = profile["No. of Employees"] || "";
        // const sqFT = profile["Square Feet"] || "";

        // const street = "Street Address: " + (profile["Street Address - 1"] || "");
        // const street2 = "Street Address 2: " + (profile["Street Address - 2"] || "");
        // const city = "City: " + profile["City"] || "";
        // const state = "State: " + profile["State"] || "";
        // const zip = "Zip Code: " + profile["Zip Code"] || "";
        // const floorNo = "Floor No.: " + profile["Floor No."] || "";
        // const suiteNo = "Suite No.: " + profile["Suite No."] || "";

        const companyName = profile["Company Name"] || "";
        const employeeNo = profile["No. of Employees"] || "";
        const sqFT = profile["Square Feet"] || "";

        const street = profile["Street Address - 1"] || "";
        const street2 = profile["Street Address - 2"] || "";
        const city = profile["City"] || "";
        const state = profile["State"] || "";
        const zip = profile["Zip Code"] || "";
        const floorNo = profile["Floor No."] || "";
        const suiteNo = profile["Suite No."] || "";

        const attachments = profile["Attachments"] || [];
        const mappedAttachments = attachments.map(x => {
            return {
                uid: x.id,
                name: x.filename,
                status: 'done',
                url: x.url,
            }
        });

        const uploadSectionProps = {
            // action: '//jsonplaceholder.typicode.com/posts/',
            defaultFileList: [...mappedAttachments],
            className: 'upload-list-inline',
            onRemove: (file) => false,
            action: (file) => {
                const firebase = this.props.firebase;
                const storageRef = firebase.storage.ref();

                const fileName = file.name;

                // bug with removing files 
                // bug with showing red file name when uploading 

                const fileRef = storageRef.child('officeProfileUploads/' + this.props.currentOfficeAdminUID + "/" + fileName);
                return fileRef.put(file)
                    .then((snapshot) => {
                        return snapshot.ref.getDownloadURL()
                    })
                    .then((downloadURL) => {
                        const newAttachment = { "filename": fileName, "url": downloadURL }
                        this.uploadAttachments(newAttachment);
                        return true
                    })
            }
        };

        return (
            <div>
                <Card
                    title={"General"}
                    // extra={<a>Save Changes</a>}
                    style={{ width: "100%", marginTop: 20 }}
                >
                    <Row>
                        <Col span={8}>
                            <h3>Company Name:</h3>
                            <Input style={{ width: "60%" }} defaultValue={companyName} onChange={(e) => this.addChange({ "Company Name": e.target.value })} />
                        </Col>
                        <Col span={8}>
                            <h3>Employee Count:</h3>
                            <Input style={{ width: "60%" }} defaultValue={employeeNo} onChange={(e) => this.addChange({ "No. of Employees": e.target.value })} />
                        </Col>
                        <Col span={8}>
                            <h3>Square Feet:</h3>
                            <Input style={{ width: "60%" }} defaultValue={sqFT} onChange={(e) => this.addChange({ "Square Feet": e.target.value })} />
                        </Col>
                    </Row>
                    <Button className='inlineDisplay rightAlign' type="primary" onClick={this.saveChanges.bind(this)}>Save Changes</Button>
                    {/* <br /> */}
                    {/* <Row >
                        <Col span={8}>
                        </Col>
                        <Col span={8}>
                        </Col>
                        <Col span={8}>
                        </Col>
                    </Row> */}
                </Card>

                <Card
                    title={"Address"}
                    // extra={<p style={{ textAlign: "right" }}>ID: {identifier}</p>}
                    style={{ width: "100%", marginTop: 50 }}
                >
                    <Row>
                        <Col span={6}>
                            <h3>Street Address 1:</h3>
                            <Input style={{ width: "60%" }} defaultValue={street} onChange={(e) => this.addChange({ "Street Address - 1": e.target.value })} />
                        </Col>
                        <Col span={6}>
                            <h3>Street Address 2:</h3>
                            <Input style={{ width: "60%" }} defaultValue={street2} onChange={(e) => this.addChange({ "Street Address - 2": e.target.value })} />
                        </Col>
                        <Col span={6}>
                            <h3>City:</h3>
                            <Input style={{ width: "60%" }} defaultValue={city} onChange={(e) => this.addChange({ "City": e.target.value })} />
                        </Col>
                        <Col span={6}>
                        </Col>
                    </Row>
                    <br />
                    <Row >
                        <Col span={6}>
                            <h3>State:</h3>
                            <Input style={{ width: "60%" }} defaultValue={state} onChange={(e) => this.addChange({ "State": e.target.value })} />
                        </Col>
                        <Col span={6}>
                            <h3>Zip Code:</h3>
                            <Input style={{ width: "60%" }} defaultValue={zip} onChange={(e) => this.addChange({ "Zip Code": e.target.value })} />
                        </Col>
                        <Col span={6}>
                            <h3>Floor No:</h3>
                            <Input style={{ width: "60%" }} defaultValue={floorNo} onChange={(e) => this.addChange({ "Floor No.": e.target.value })} />
                        </Col>
                        <Col span={6}>
                            <h3>Suite No:</h3>
                            <Input style={{ width: "60%" }} defaultValue={suiteNo} onChange={(e) => this.addChange({ "Suite No.": e.target.value })} />
                        </Col>
                        <Button className='inlineDisplay rightAlign' type="primary" onClick={this.saveChanges.bind(this)}>Save Changes</Button>
                    </Row>
                </Card>
                <Card
                    title={"Files"}
                    // extra={<p style={{ textAlign: "right" }}>ID: {identifier}</p>}
                    style={{ width: "100%", marginTop: 50 }}
                >
                    <Upload {...uploadSectionProps}>
                        <Button>
                            <Icon type="upload" /> Upload
                        </Button>
                    </Upload>
                </Card>
                <br></br>
                <br></br>
                <br></br>

            </div>
        );
    }

    render() {

        return (
            <Col className="wide-table" span={24}>
                <h1>Office Profile
                <Tooltip title="Your office profile allows us to create personalized service terms and prices. If any details have changed, let your Experience Manager know.">
                        <IconButton className="inlineDisplay" style={{ marginBottom: 5 }}>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                </h1>
                <div>
                    {this.getBody()}
                </div>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        userAdminOfficeList: state.auth.adminOfficeList,
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
        isLoadingOfficeProfile: state.officeAdmin.isLoadingOfficeProfile,
        officeProfile: state.officeAdmin.officeProfile,
        firebase: state.firebase.firebase,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadOfficeProfile: (officeUID) => dispatch(generalActionCreator.loadOfficeProfile({ selectedOfficeUID: officeUID })),
        updateOfficeProfile: (officeUID, changes) => dispatch(generalActionCreator.updateOfficeProfile({ selectedOfficeUID: officeUID, changes: changes })),
        uploadAttachmentOfficeProfile: (officeUID, attachment) => dispatch(generalActionCreator.uploadAttachmentOfficeProfile({ selectedOfficeUID: officeUID, newAttachment: attachment})), 
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfficeProfilePage));