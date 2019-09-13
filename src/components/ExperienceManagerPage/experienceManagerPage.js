import React from 'react';
import { connect } from 'react-redux';

import { Statistic, Row, Col, Icon, Input, Spin, Avatar, Card, Empty } from 'antd';
// import RefreshIcon from '@material-ui/icons/Refresh';
// import IconButton from '@material-ui/core/IconButton';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import ConstPlanImg from "../../assets/images/em-icons/construction-plan.png";
import ServicePlanImg from "../../assets/images/em-icons/service-plan.png";
import RepairsImg from "../../assets/images/em-icons/repairs.png";
import InventoryImg from "../../assets/images/em-icons/inventory.png";
import VendorsImg from "../../assets/images/em-icons/vendors.png";
import MovingIm from "../../assets/images/em-icons/moving.png";
import MoreImg from "../../assets/images/em-icons/more.png";
import SuppliesImg from "../../assets/images/em-icons/supplies.png";

import '../../App.css';

import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';

import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';
import emptyState from "../../assets/images/empty/empty-1.png";
import { blue } from '@material-ui/core/colors';

const { TextArea } = Input;



class ExperienceManagerPage extends React.Component {

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
      const secondPagePayload = getPagePayload(pageTitles.experienceManagerPageOfficeAdmin);
      if (secondPagePayload) {
        this.props.changePage(secondPagePayload);
      }

      this.props.loadEMInfo({ selectedOfficeUID: selectedOfficeUID });
    }
  }

  getBody() {
    if (this.props.isLoadingEMInfo && this.props.emInfo === null) {
      return (
        <div style={{ textAlign: "center" }} className="example">
          <Spin />
        </div>
      )
    } else if (this.props.emInfo === null) {
      const title = "Nothing to show yet!"
      const description = "We are still in the process of matching you with an Experience Manager."
      return (
        // <Empty
        //   image={emptyState}
        //   imageStyle={{
        //     height: 250,
        //   }}
        //   description={
        //     <span>
        //       {description}
        //     </span>
        //   }
        // >
        // </ Empty>
        <div style={{ textAlign: "center", verticalAlign: "middle" }}>
          <img style={{ maxWidth: 400 }} src={emptyState} />
          <h2 style={{ marginTop: 30, fontWeight: 15 }}>{title} </h2>
          <h3 style={{ marginTop: 30, fontWeight: 10, color: "#C0C0C0" }}>{description} </h3>
        </div>
      )
    } else {

      const info = this.props.emInfo || null;
      if (info === null) {
        return null
      }
      const name = "Hi, I'm " + (info["Name"] || "");
      const bio = info["Bio"] || "";
      const photoDict = info["Photo"][0] || {};
      const imageURL = photoDict.thumbnails.large.url;

      const phone = info["Phone"] || "";
      const phoneHref = "tel:" + phone;
      const email = info["Email"] || "";
      const emailHref = "mailto:" + email;
      const chatURL = info["Drift Link"] || null;

      return (
        <div>
          <Row>
            <Col span={6}>
              {/* <Card style={{ textAlign: "center", width: "80%" }}> */}
              <Row>
                <Col span={24}>
                  <Avatar style={{ width: "80%", height: "80%" }} shape="circle" src={imageURL} />
                </Col>
              </Row>
              {/* </Card> */}
              <br />
            </Col>
            <Col span={13}>
              <div style={{ paddingTop: 20 }}>
                <h1>{name}</h1>
                <h3 style={{ fontSize: 20, fontWeight: 300 }} >{bio}</h3>
              </div>
              <Row style={{ paddingTop: 15, paddingBottom: 15 }}>
                <Col span={6}>
                  <a target="_blank" href={chatURL}><h2 style={{ fontSize: 20 }}
                  > <Icon type="message" /> Live Chat</h2></a>
                  {/* <a target="_blank" href={chatURL}><h2 style={{ color: "#1585FF" }} >Chat Here</h2></a> */}
                </Col>
                <Col span={4}>
                  <a href={phoneHref}><h2 style={{ fontSize: 20 }}> <Icon type="phone" /> Call</h2></a>
                  {/* <a href={phoneHref}><h2 style={{ color: "#1585FF" }} >{phone}</h2></a> */}
                </Col>
                <Col span={6}>
                  <a href={emailHref}><h2 style={{ fontSize: 20 }}> <Icon type="inbox" /> Email</h2></a>
                  {/* <a href={emailHref}><h2 style={{ color: "#1585FF" }} >{email}</h2></a> */}
                </Col>
                <Col span={8}>
                </Col>
              </Row>
              <hr style={{ margin: 10, marginBottom: 10 }} />
              <Row style={{ paddingTop: 15 }}>
                <Col span={24}>
                  <h2>Here are some things I can help with:</h2>
                  <Row style={{ paddingTop: 15 }}>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img style={{ width: "50px" }} src={ServicePlanImg} />
                      <h3>Adjusting Service Plan</h3>
                    </Col>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img style={{ width: "50px" }} src={VendorsImg} />
                      <h3>Vendor Issues</h3>
                    </Col>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img style={{ width: "50px" }} src={SuppliesImg} />
                      <h3>Reordering Supplies</h3>
                    </Col>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img style={{ width: "50px" }} src={RepairsImg} />
                      <h3>Repairs</h3>
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: 15 }}>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img style={{ width: "50px" }} src={ConstPlanImg} />
                      <h3>Space Planning</h3>
                    </Col>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img style={{ width: "50px" }} src={MovingIm} />
                      <h3>Move Planning</h3>
                    </Col>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img style={{ width: "50px" }} src={InventoryImg} />
                      <h3>Taking Inventory</h3>
                    </Col>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img style={{ width: "50px" }} src={MoreImg} />
                      <h3>Much More!</h3>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={5} />
          </Row>
        </div >
      )
    }
  }

  render() {

    return (
      <div>
        <Row>
          <Col className="wide-table" span={24}>
            <h1 style={{ paddingBottom: 50 }}>Experience Manager</h1>
            {this.getBody()}
          </Col>
        </Row>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    userAdminOfficeList: state.auth.adminOfficeList,
    isLoadingEMInfo: state.officeAdmin.isLoadingEMInfo,
    emInfo: state.officeAdmin.emInfo
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
    loadEMInfo: (payload) => dispatch(generalActionCreator.getEMInfo(payload))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExperienceManagerPage));


{/* <div>
          <Row className="sub-title">
            <Col span={24}>
              <h2>You have a match 😍 !</h2>
            </Col>
          </Row>
          <Row className="manager-info" type="flex" justify="space-around" align="middle">
            <Col className="sub-title" span={8}>
              <img alt="Justin Photo" src={StaticImage} />
            </Col>
            <Col className="sub-title" span={16}>
              <Row type="flex" justify="center">
                <h2>Soheil Ebadat</h2>
              </Row>
              <Row type="flex" justify="space-around">
                <Tag color="#ffa39e">1-800-234-6193</Tag>
                <Tag color="#ffa39e">soheil.ebadat@airspace.co</Tag>
                <Tag color="#ffa39e">Schedule</Tag>
              </Row>
              <br />
              <Row>
                <Col className="sub-title" span={2}>
                </Col>
                <Col className="sub-title" span={20}>
                  <h2>{managerDescription}</h2>
                </Col>
                <Col className="sub-title" span={2}>
                </Col>
              </Row>
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="sub-title" span={12}>
              <Row type="flex" justify="center">
                <h2>Services and Amenities</h2>
              </Row>
              <Row type="flex" justify="space-around">
                <Tag color="#ffa39e">Cleaning</Tag>
                <Tag color="#ffa39e">Coffee</Tag>
                <Tag color="#ffa39e">Food</Tag>
              </Row>
            </Col>
            <Col className="sub-title" span={12}>
              <Row type="flex" justify="center">
                <h2>What we can help you with</h2>
              </Row>
              <Row>
                <Col className="sub-title" span={2}>
                </Col>
                <Col className="sub-title" span={20}>
                  <h2>{helpDescription}</h2>
                </Col>
                <Col className="sub-title" span={2}>
                </Col>
              </Row>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={12}>
              <Row type="flex" justify="center">
                <h2>Feedback</h2>
              </Row>
              <Row type="flex" justify="center">
                <TextArea rows={4} />
              </Row>
              <Row type="flex" justify="end">
                <Button type="primary" >Submit</Button>
              </Row>
            </Col>
            <Col span={12}>
              <Row type="flex" justify="center">
                <Col span={2}>
                </Col>
                <Col span={20}>
                  <Row align="middle">
                    <Col span={12}>
                      <Paper style={{ width: '80%' }} elevation={1}>
                        <Typography variant="subtitle1" align={'center'} component="h3">
                          Issues Spotted
                                      </Typography>
                        <Typography align={'center'} variant="button" component="p">
                          4
                                      </Typography>
                      </Paper>
                    </Col>
                    <Col span={12}>
                      <Paper style={{ width: '80%' }} elevation={1}>
                        <Typography align={'center'} variant="subtitle1" component="h3">
                          Time Saved
                                      </Typography>
                        <Typography align={'center'} variant="button" component="p">
                          2 Hrs
                                      </Typography>
                      </Paper>
                    </Col>
                  </Row>
                </Col>
                <Col span={2}>
                </Col>
              </Row>
            </Col>
          </Row>
        </div> */}
