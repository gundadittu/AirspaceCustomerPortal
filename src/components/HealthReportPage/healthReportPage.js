// import React from 'react';
// import { connect } from 'react-redux';
// import { Row, Col, Spin, Avatar } from 'antd';
// import StaticImage from "../../assets/images/home_empty_state.png";
// import '../../App.css';
// import * as generalActionCreator from '../../store/actions/general';

// import { withRouter } from 'react-router-dom';
// import * as pageTitles from '../../pages/pageTitles';
// import getPagePayload from '../../pages/pageRoutingFunctions';
// import { PieChart } from 'react-chartkick'
// import 'chart.js'

// class HealthReportPage extends React.Component {

//     componentDidMount() {
//         if (this.props.match.isExact) {
//             const officeUID = this.props.match.params.officeUID;
//             if (officeUID === null) {
//                 return
//             }

//             let officeObj = null;
//             const allAdminOffices = this.props.allAdminOffices || null;
//             if (allAdminOffices === null) {
//                 return
//             }

//             for (let key in allAdminOffices) {
//                 const value = allAdminOffices[key];
//                 if (value.uid === officeUID) {
//                     officeObj = value;
//                     break;
//                 }
//             }

//             if (officeObj === null) {
//                 return
//             }

//             const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, { officeUID: officeUID, officeObj: officeObj });
//             if (pagePayload) {
//                 this.props.changePage(pagePayload);
//             }

//             const secondPagePayload = getPagePayload(pageTitles.healthReportPageOfficeAdmin);
//             if (secondPagePayload) {
//                 this.props.changePage(secondPagePayload);
//             }
//             this.props.getReport({ selectedOfficeUID: officeUID })
//         }
//     }

//     render() {

//         const emptyState = () => {
//             return (
//                 <Row type="flex" justify="space-around" align="middle">
//                     <img style={{ width: '70%', height: '70%' }} alt="Report is being generated..." src={StaticImage} />
//                 </Row>
//             )
//         }

//         const getBody = () => {

//             const report = this.props.report;

//             if (report === null) {
//                 return emptyState()
//             }

//             if (Object.keys(report).length === 0) { 
//                 return emptyState()
//             }

//             const nextVisit = report["Next Visit"] || "";
//             const spendingData = report["Spending Data"] || {};
//             const outstandingIssues = report["Outstanding Issues"] || [];
//             const funFacts = report["Fun Facts"] || [];

//             return (
//                 <div>
//                     <Row>
//                         <Col span={19}>
//                             <div style={{ paddingTop: 40 }}>
//                                 <h2>{nextVisit}</h2>
//                                 {(outstandingIssues.length > 0) ?
//                                     (<p>Here are some outstanding issues they'll work on:</p>)
//                                     : null}
//                                 < ul >
//                                     {
//                                         outstandingIssues.map(x => (
//                                             <li><h3 style={{ fontWeight: "normal" }}>{x}</h3></li>
//                                         ))
//                                     }
//                                 </ul>
//                             </div>
//                         </Col>
//                     </Row>

//                     {((funFacts.length > 0) || (spendingData.length > 0)) ?
//                         (<hr style={{ margin: 10, marginBottom: 10 }} />)
//                         : null}

//                     <Row style={{ paddingTop: 50 }}>
//                         <Col span={12}>
//                             {(spendingData.length > 0) ?
//                                 (<h2>Spending Data:</h2>)
//                                 : null}
//                             <Row style={{ paddingTop: 15 }}>
//                                 <PieChart data={spendingData} />
//                             </Row>
//                         </Col>
//                         <Col span={12}>
//                             {(funFacts.length > 0) ?
//                                 (<h2>Fun Facts:</h2>)
//                                 : null}

//                             <Row style={{ paddingTop: 15 }}>
//                                 < ul >
//                                     {
//                                         funFacts.map(x => (
//                                             <li><h3 style={{ fontWeight: "normal" }}>{x}</h3></li>
//                                         ))
//                                     }
//                                 </ul>
//                             </Row>
//                         </Col>
//                     </Row>
//                 </div >
//             )
//         }

//         return (
//             <div>
//                 <Row>
//                     <Col className="wide-table" span={24}>
//                         <Row>
//                             <h1>Health Report</h1>
//                         </Row>
//                         {(this.props.isLoading === true) ?
//                             (
//                                 <div style={{ textAlign: "center" }} className="example">
//                                     <Spin />
//                                 </div>
//                             )
//                             : getBody()
//                         }
//                     </Col>
//                 </Row>
//             </div >
//         )
//     }
// }


// const mapStateToProps = state => {
//     return {
//         allAdminOffices: state.auth.adminOfficeList,
//         isLoading: state.officeAdmin.isLoadingOfficeReport,
//         report: state.officeAdmin.officeReport
//     }
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
//         getReport: (payload) => dispatch(generalActionCreator.getOfficeReport(payload))
//     }
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HealthReportPage));
