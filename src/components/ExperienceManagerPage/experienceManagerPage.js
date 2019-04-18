import React from 'react';
import { connect } from 'react-redux';

import { Statistic, Row, Col, Icon, Input, Spin, Avatar, Card, Empty } from 'antd';
// import RefreshIcon from '@material-ui/icons/Refresh';
// import IconButton from '@material-ui/core/IconButton';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import ConstPlanImg from "../../assets/images/em-icons/construction-plan.png";
import '../../App.css';

import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';

import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';
import emptyState from "../../assets/images/empty/empty-2.png";

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
    if (this.props.isLoadingEMInfo) {
      return (
        <div style={{ textAlign: "center" }} className="example">
          <Spin />
        </div>
      )
    } else if (this.props.emInfo === null) {
      const description = "Patience is a virtue! We are still matching you with an Airspace Experience Manager."
      return (
        <Empty
          image={emptyState}
          imageStyle={{
            height: 250,
          }}
          description={
            <span>
              {description}
            </span>
          }
        >
        </ Empty>
      )
    } else {

      const info = this.props.emInfo;
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

      return (
        <div>
          <Row>
            <Col span={6}>
              <Card style={{ textAlign: "center", width: "80%" }}>
                <Row>
                  <Col span={24}>
                    <Avatar style={{ width: "100%", height: "100%" }} shape="circle" src={imageURL} />
                  </Col>
                </Row>
              </Card>
              <br />
            </Col>
            <Col span={13}>
              <div style={{ paddingTop: 20 }}>
                <h1>{name}</h1>
                <h2>{bio}</h2>
              </div>
              <Row style={{ paddingTop: 15, paddingBottom: 15 }}>
                <Col span={8}>
                  <h3> <Icon type="phone" /> Call</h3>
                  <a href={phoneHref}><h2>{phone}</h2></a>
                </Col>
                <Col span={8}>
                  <h3> <Icon type="inbox" /> Email</h3>
                  <a href={emailHref}><h2>{email}</h2></a>
                </Col>
                <Col span={8}>
                  <h3> <Icon type="phone" /> Live Chat</h3>
                </Col>
              </Row>
              <hr style={{ margin: 10, marginBottom: 10 }} />
              <Row style={{ paddingTop: 15 }}>
                <Col span={24}>
                  <h2>Here are some things I can help with:</h2>
                  <Row style={{ paddingTop: 15 }}>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img src={ConstPlanImg} />
                      <h3>Space Planning</h3>
                    </Col>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img src={ConstPlanImg} />
                      <h3>Space Planning</h3>
                    </Col>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img src={ConstPlanImg} />
                      <h3>Space Planning</h3>
                    </Col>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img src={ConstPlanImg} />
                      <h3>Space Planning</h3>
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: 15 }}>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img src={ConstPlanImg} />
                      <h3>Space Planning</h3>
                    </Col>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img src={ConstPlanImg} />
                      <h3>Space Planning</h3>
                    </Col>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img src={ConstPlanImg} />
                      <h3>Space Planning</h3>
                    </Col>
                    <Col style={{ textAlign: "center" }} span={6}>
                      <img src={ConstPlanImg} />
                      <h3>Space Planning</h3>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={5} />
          </Row>
        </div>
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
