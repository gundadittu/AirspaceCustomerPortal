import React from 'react';
import { connect } from 'react-redux';
// import * as pageTitles from '../../pages/pageTitles';
// import getPagePayload from '../../pages/pageRoutingFunctions';
import { Spin, Card, Collapse, Statistic, Icon, Row, Col } from 'antd';
import Grid from '@material-ui/core/Grid';
import * as generalActionCreator from '../../store/actions/general';
import emptyState from "../../assets/images/eastwood-no-comments.png";

class BuildingOfficeHealthReport extends React.Component {

    loadOfficeHealthReport() {
        const selectedBuildingUID = this.props.selectedBuildingUID || null;
        const selectedOfficeUID = this.props.selectedOfficeUID || null;

        const data = {
            selectedBuildingUID: selectedBuildingUID,
            selectedOfficeUID: selectedOfficeUID
        };

        this.props.loadReport(data);
    }
    
    getBody() {
        if (this.props.isLoading) {
            return (
                <Grid container justify="center" alignItems="center" style={{ marginTop: 20 }}>
                    <Spin />
                </Grid>
            );
        }
        const list = this.props.reportData || [];

        const newList = list.filter(x => {
            if (x.uid === this.props.selectedOfficeUID) {
                return true
            }
            return false
        })

        if (newList.length === 0) {
            return (
                <div style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <img style={{ maxWidth: 400 }} src={emptyState} />
                    <h2 style={{ marginTop: 30, fontWeight: 15 }}>{"We are currently generating this office's report"} </h2>
                </div>
            );
        }

        const data = newList[0];
        const spacePerc = data["Space Utilization Percentage"] || 0;
        const buildingUtPerc = data["Building Amenity Utilization Percentage"] || 0;
        const satisfactionScore = data["Satisfaction Score"] || 0;
        const projNeeds = data["Projected Space Need"] || "Not Available Yet";


        return (
            <div>
            <Row>
                <Col span={12}>
                    <Card>
                    <Statistic title="Space Utilization" value={spacePerc} suffix="%" />
                    </Card>
                </Col>
                <Col span={12}>
                <Card>
                    <Statistic title="Building Utilization" value={buildingUtPerc} suffix="%" />
                    </Card>
                </Col>
            </Row>
                <Row>
                <Col span={12}>
                    <Card>
                    <Statistic title="Satisfaction Score" value={satisfactionScore} suffix="/100" />
                    </Card>
                </Col>
                <Col span={12}>
                <Card>
                    <Statistic title="Projected Space Needs" value={projNeeds} />
                    </Card>
                </Col>
            </Row>
            </div>
        )
    }

    state = {
        activeKey: []
    }

    callback = (key) => {
        console.log(key);
        this.loadOfficeHealthReport();
        this.setState({
            activeKey: key,
        });
    }

    render() {

        // REQUIRED: 
        // const selectedBuildingUID = this.props.selectedBuildingUID || null;
        // const selectedOfficeUID = this.props.selectedOfficeUID || null; 
        const selectedOfficeName = this.props.selectedOfficeName || "Office Name";

        // const data = [];

        const customPanelStyle = {
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 15,
            border: 0,
            overflow: 'hidden',
        };
        const Panel = Collapse.Panel;



        return (
            <Collapse
                bordered={false}
                className="collapse-tab"
                // defaultActiveKey={['1']}
                activeKey={this.state.activeKey}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                onChange={this.callback}
            >
                <Panel header={selectedOfficeName} key="1" style={customPanelStyle}>
                    {this.getBody()}
                </Panel>
            </Collapse>
        )
    }
}

const mapStateToProps = state => {
    return {
        // buildingList: state.auth.landlordBuildingList,
        // currentBuilding: state.general.currentBuilding,
        // currentBuildingUID: state.general.currentBuildingUID
        reportData: state.general.buildingOfficeReportData,
        firebase: state.firebase.firebase,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
        loadReport: (payload) => dispatch(generalActionCreator.getBuildingOfficeReport(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildingOfficeHealthReport);

