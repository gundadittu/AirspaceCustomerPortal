// import React from 'react';
// import { connect } from 'react-redux';
// import * as pageTitles from '../../pages/pageTitles';
// import getPagePayload from '../../pages/pageRoutingFunctions';
// import * as generalActionCreator from '../../store/actions/general';
// import { Row, Col, Card } from 'antd';
// import BuildingOfficeHealthReport from './BuildingOfficeHealthReport';

// const { Meta } = Card;

// class BuildingHealthReport extends React.Component {

//     handleRoute() {
//         if (this.props.match.isExact) {
//             const selectedBuildingUID = this.props.match.params.buildingUID;

//             const list = this.props.buildingList;
//             let buildingObj = null;
//             for (let key in list) {
//                 const value = list[key];

//                 if (value.uid === selectedBuildingUID) {
//                     buildingObj = value;
//                 }
//             }

//             const pagePayload = getPagePayload(pageTitles.homePageLandlord, { buildingUID: selectedBuildingUID, buildingObj: buildingObj });
//             if (pagePayload) {
//                 this.props.changePage(pagePayload);
//             }

//             const secondPagePayload = getPagePayload(pageTitles.buildingHealthLandlord );
//             if (secondPagePayload) {
//                 this.props.changePage(secondPagePayload);
//             }
//         }
//     }

//     render() {
//         this.handleRoute();

//         const dataSource = (this.props.currentBuilding !== null) ? this.props.currentBuilding.offices : [];
//         const selectedBuildingUID = this.props.currentBuildingUID;
//         return (

//             <Row>
//                 <Col className="wide-table" span={24}>
//                     <h1>Health Reports</h1>
//                     <p>For {this.props.currentBuilding.name} at {this.props.currentBuilding.address}</p>
//                     <Row>
//                         <div>
//                             {dataSource.map(x => {
//                                 const selectedOfficeName = x.name; 
//                                 const selectedOfficeUID = x.uid; 
//                                 return (
//                                     <Row>
//                                         <Col style={{ paddingRight: "15%", paddingBottom: "1%" }} span={24}>
//                                             <BuildingOfficeHealthReport selectedBuildingUID={selectedBuildingUID} selectedOfficeUID={selectedOfficeUID} selectedOfficeName={selectedOfficeName+" Health Report"} />
//                                         </Col>
//                                     </Row>
//                                 )
//                             }
//                             )}
//                         </div>
//                     </Row>
//                 </ Col>
//             </Row>
//         );
//     }
// }

// const mapStateToProps = state => {
//     return {
//         buildingList: state.auth.landlordBuildingList,
//         currentBuilding: state.general.currentBuilding,
//         currentBuildingUID: state.general.currentBuildingUID
//     }
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
//     }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(BuildingHealthReport);

