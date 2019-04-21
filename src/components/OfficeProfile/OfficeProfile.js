import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';

import RefreshIcon from '@material-ui/icons/Refresh';
import { Row, Col, Menu, Empty, Button, Spin, Card, Upload, Icon } from 'antd';

import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';

class OfficeProfilePage extends React.Component {

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

    getBody() {
        if (this.props.isLoadingOfficeProfile) {
            return (
                <div style={{ textAlign: "center" }} className="example">
                    <Spin />
                </div>
            )
        }

        const profile = this.props.officeProfile || null;

        const fileList = [{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          }, {
            uid: '-2',
            name: 'yyy.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          }];

        const props2 = {
            action: '//jsonplaceholder.typicode.com/posts/',
            listType: 'picture',
            defaultFileList: [...fileList],
            className: 'upload-list-inline',
        };

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

        return (
            <div>
                <Card
                    title={"General"}
                    // extra={<p style={{ textAlign: "right" }}>ID: {identifier}</p>}
                    style={{ width: "100%", paddingTop: 20 }}
                >
                    <Row>
                        <Col span={8}>
                            <h3>Company Name:</h3>
                            <p>{companyName}</p>
                        </Col>
                        <Col span={8}>
                            <h3>Employee Count:</h3>
                            <p>{employeeNo}</p>
                        </Col>
                        <Col span={8}>
                            <h3>Square Feet:</h3>
                            <p>{sqFT}</p>
                        </Col>
                    </Row>
                    <br />
                    <Row >
                        <Col span={8}>
                        </Col>
                        <Col span={8}>
                        </Col>
                        <Col span={8}>
                        </Col>
                    </Row>
                </Card>

                <Card
                    title={"Address"}
                    // extra={<p style={{ textAlign: "right" }}>ID: {identifier}</p>}
                    style={{ width: "100%", marginTop: 50 }}
                >
                    <Row>
                        <Col span={6}>
                            <h3>Street Address 1:</h3>
                            <p>{street}</p>
                        </Col>
                        <Col span={6}>
                            <h3>Street Address 2:</h3>
                            <p>{street2}</p>
                        </Col>
                        <Col span={6}>
                            <h3>City:</h3>
                            <p>{city}</p>
                        </Col>
                        <Col span={6}>
                        </Col>
                    </Row>
                    <br />
                    <Row >
                        <Col span={6}>
                            <h3>State:</h3>
                            <p>{state}</p>
                        </Col>
                        <Col span={6}>
                            <h3>Zip Code:</h3>
                            <p>{zip}</p>
                        </Col>
                        <Col span={6}>
                            <h3>Floor No:</h3>
                            <p>{floorNo}</p>
                        </Col>
                        <Col span={6}>
                            <h3>Suite No:</h3>
                            <p>{suiteNo}</p>
                        </Col>
                    </Row>
                </Card>
                {/* <Card
                    title={"Files"}
                    // extra={<p style={{ textAlign: "right" }}>ID: {identifier}</p>}
                    style={{ width: "100%", marginTop: 50 }}
                >
                    <Upload {...props2}>
                        <Button>
                            <Icon type="upload" /> Upload
                        </Button>
                    </Upload>
                </Card> */}
            </div>
        );
    }

    render() {

        return (
            <Col className="wide-table" span={24}>
                <h1>Office Profile</h1>
                <div>
                    {/* <Row type="flex" style={{ paddingLeft: "1%", paddingRight: "15%" }}>
                        <Col span={12}>
                            <Row type="flex" style={{ height: 87 }} align="middle" justify="start">
                                <IconButton className="inlineDisplay" onClick={() => this.props.loadOfficeProfile(this.props.currentOfficeAdminUID)}>
                                    <RefreshIcon />
                                </IconButton>
                            </Row>
                        </Col>
                    </Row> */}
                    {this.getBody()}
                </div>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
        isLoadingOfficeProfile: state.officeAdmin.isLoadingOfficeProfile,
        officeProfile: state.officeAdmin.officeProfile
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadOfficeProfile: (officeUID) => dispatch(generalActionCreator.loadOfficeProfile({ selectedOfficeUID: officeUID })),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfficeProfilePage));