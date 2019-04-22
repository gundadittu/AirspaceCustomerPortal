import React from 'react';
import { Row, Col, Card, Button, Tooltip, List, Collapse, Icon, Modal, Steps, message, notification, Popconfirm } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Help';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ServicePlanPendingAddOn from './ServicePlanPendingAddOn';
import ServicePlanPendingOption from './ServicePlanPendingOption';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as generalActionCreator from '../../store/actions/general';// const moment = require('moment');

class ServicePlanPendingCard extends React.Component {

    state = {
        showSteps: false
    }

    render() {
        const Panel = Collapse.Panel;
        const customPanelStyle = {
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 15,
            border: 0,
            overflow: 'hidden',
        };

        const servicePackage = this.props.pendingPackage || null;
        if (servicePackage === null) {
            return null
        }
        const title = servicePackage["Name"];
        const description = servicePackage["Description"];
        const identifier = servicePackage["Record ID"];
        const options = servicePackage["options"];
        const addOns = servicePackage["addOns"];

        const Step = Steps.Step;

        const hideSteps = () => {
            this.setState({ showSteps: false })
        }

        const showStepsForm = () => {
            this.setState({ showSteps: true })
        }

        const confirmPackage = (record) => {
            if (record === null) {
                return
            }

            let allow = false;
            options.forEach(x => {
                const status = x["Status"] || null;
                if (status === null) {
                    return
                }
                if (status !== "Pending") {
                    allow = true;
                }
            })

            if (allow === false) {
                notification['error']({
                    message: 'Please select an option first.',
                    // description: error.message
                });
                return
            }

            const dict = {
                selectedOfficeUID: this.props.currentOfficeAdminUID,
                recordID: record
            }

            this.props.confirm(dict);
            message.success('Adding to your service plan. It may take some time to show up in your plan...');
        }

        const rejectPackage = (record) => {
            if (record === null) {
                return
            }

            const dict = {
                selectedOfficeUID: this.props.currentOfficeAdminUID,
                recordID: record
            }
            this.props.reject(dict);
            message.error('Rejected service package.');
        }

        const extra = () => (
            <IconButton className="inlineDisplay" onClick={() => showStepsForm()}><InfoIcon /></IconButton>
        );

        // const theme = {
        //     cssRoot: {
        //         color: theme.palette.getContrastText(green[500]),
        //         backgroundColor: green[500],
        //         '&:hover': {
        //             backgroundColor: green[700],
        //         },
        //     },
        // }

        return (
            // <MuiThemeProvider theme={theme}>

            <div>
                <Modal
                    visible={this.state.showSteps}
                    title={"How it Works"}
                    onOk={hideSteps}
                    onCancel={hideSteps}
                    width={1000}
                    footer={[<Button onClick={() => hideSteps()} type="primary">Ok</Button>]}
                >
                    <div style={{ paddingTop: 40, paddingBottom: 40 }}>
                        <Steps progressDot current={3}>
                            <Step title="Select Options" description="Choose the best options and add-ons for your office." />
                            <Step title="Add to Service Plan" description="It may take some time to show up in your plan" />
                            <Step title="Enjoy Services" description="Your Experience Manager will coordinate everything." />
                        </Steps>
                    </div>
                </Modal>
                <Collapse
                    bordered={false}
                    // defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                >
                    <Panel header={title} key="1" style={customPanelStyle} >
                        <Card
                            title={title}
                            // extra={<p style={{ textAlign: "right" }}>ID: {identifier}</p>}
                            extra={extra()}
                            style={{ width: "100%" }}
                            actions={[(<Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => rejectPackage(identifier)}><Button type="secondary">Reject</Button></Popconfirm>), (<Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => confirmPackage(identifier)}><Button type="primary">Add to Service Plan</Button></Popconfirm>)]}
                        >
                            <Row>
                                <Col span={24}>
                                    {/* <h4>Description:</h4> */}
                                    {description}
                                </Col>
                                <Col span={24}>
                                    <p style={{ marginTop: 10 }}>ID: {identifier}</p>
                                </Col>
                            </Row>
                            <br />
                            {(options !== null) ?
                                <br style={{ marginTop: 20, marginBottom: 20 }} />
                                : null}

                            {options !== null ?
                                <Row>
                                    <ServicePlanPendingOption options={options} />
                                </Row>
                                : null}

                            {(options !== null && addOns !== null) ?
                                <br style={{ marginTop: 20, marginBottom: 20 }} />
                                : null}

                            {addOns !== null ?
                                <Row>
                                    <ServicePlanPendingAddOn options={addOns} />
                                </Row>
                                : null}
                            {/* <Tooltip title="Want to change some details? Something went wrong with the service? We can help you here.">
                <Button className="inlineDisplay rightAlign" type="primary" onClick={() => openURL()}>Get Help</Button>
            </Tooltip> */}
                        </Card>
                    </ Panel>
                </Collapse>
            </div>
            // </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentOfficeAdminUID: state.general.currentOfficeAdminUID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        confirm: (payload) => dispatch(generalActionCreator.confirmPendingPackage(payload)),
        reject: (payload) => dispatch(generalActionCreator.rejectPendingPackage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServicePlanPendingCard));

// export default ServicePlanPendingCard;

// const servicePlanPendingCard = (props) => {
//     const Panel = Collapse.Panel;
//     const customPanelStyle = {
//         background: '#f7f7f7',
//         borderRadius: 4,
//         marginBottom: 10,
//         border: 0,
//         overflow: 'hidden',
//     };

//     const servicePackage = props.pendingPackage || null;
//     if (servicePackage === null) {
//         return null
//     }
//     const title = servicePackage["Name"];
//     const description = servicePackage["Description"];
//     const identifier = servicePackage["Record ID"];
//     const options = servicePackage["options"];
//     const addOns = servicePackage["addOns"];

//     const Step = Steps.Step;

//     const hideSteps = () => {
//         showSteps = false;
//     }

//     const showStepsForm = () => {
//         showSteps = true;
//     }

//     const extra = () => (
//         <IconButton className="inlineDisplay" onClick={() => showStepsForm()}><InfoIcon /></IconButton>
//     );

//     return (
//         <div>
//             <Modal
//                 visible={showSteps}
//                 title={"How it Works"}
//                 onOk={hideSteps}
//                 onCancel={hideSteps}
//                 width={1000}
//                 footer={[<Button onClick={() => hideSteps()} type="primary">Ok</Button>]}
//             >
//                 <div style={{ paddingTop: 40, paddingBottom: 40 }}>
//                     <Steps progressDot>
//                         <Step title="Select Options" description="Choose the best options and add-ons for your office." />
//                         <Step title="Add to Service Plan" description="Your Experience Manager will add your selections to your service plan." />
//                         <Step title="Enjoy Services" description="Your Experience Manager will coordinate everything." />
//                     </Steps>
//                 </div>
//             </Modal>
//             <Collapse
//                 bordered={false}
//                 // defaultActiveKey={['1']}
//                 expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
//             >
//                 <Panel header={title} key="1" style={customPanelStyle} >
//                     <Card
//                         title={title}
//                         // extra={<p style={{ textAlign: "right" }}>ID: {identifier}</p>}
//                         extra={extra()}
//                         style={{ width: "100%" }}
//                     >
//                         <Row>
//                             <Col span={24}>
//                                 {/* <h4>Description:</h4> */}
//                                 {description}
//                             </Col>
//                         </Row>
//                         <br />
//                         {(options !== null) ?
//                             <br style={{ marginTop: 20, marginBottom: 20 }} />
//                             : null}

//                         {options !== null ?
//                             <Row>
//                                 <ServicePlanPendingOption options={options} />
//                             </Row>
//                             : null}

//                         {(options !== null && addOns !== null) ?
//                             <br style={{ marginTop: 20, marginBottom: 20 }} />
//                             : null}

//                         {addOns !== null ?
//                             <Row>
//                                 <ServicePlanPendingAddOn options={addOns} />
//                             </Row>
//                             : null}
//                         {/* <Tooltip title="Want to change some details? Something went wrong with the service? We can help you here.">
//                 <Button className="inlineDisplay rightAlign" type="primary" onClick={() => openURL()}>Get Help</Button>
//             </Tooltip> */}
//                     </Card>
//                 </ Panel>
//             </Collapse>
//         </div>
//     );
// }

// export default servicePlanPendingCard; 