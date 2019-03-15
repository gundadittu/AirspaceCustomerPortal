import React from 'react';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';

import { Statistic, Row, Col, Button, Menu, Card, Tag, Mention, Input} from 'antd';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StaticImage from "../../assets/images/soheil.jpeg";
import '../../App.css';

import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
// import * as officeActionCreator from '../../store/actions/officeAdmin';

import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';
const { TextArea } = Input;



class ExperienceManagerPage extends React.Component {

    state = {
        currentList: 'active',
        createDeskFormVisible: false,
    }

    componentDidMount() {
      if (this.props.match.isExact) {

        let officeObj = this.props.currentOfficeAdmin || null;
        if (officeObj === null) { 
            return 
        }
        
        const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, { officeUID: officeObj.uid, officeObj: officeObj });
        if (pagePayload) {
            this.props.changePage(pagePayload);
        }
      }
    }

    render() {
        var managerDescription="My name is Soheil Ebadat and I will be your experience manager\nI have been working for Airspace for 4 months and am excited to be your primary point of contact for these next few months.\nPlease feel free to contact me at any time.";
        var helpDescription="This is where a description of what we can help with would go"
        return (
            <div>
                <Row>
                    <Col className="wide-table" span={24}>
                        <h1>Experience Manager</h1>
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
                            <br/>
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
                        <br/>
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
                        <br/>
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
                                    <Paper style={{width:'80%'}}elevation={1}>
                                      <Typography variant="subtitle1" align={'center'} component="h3">
                                        Issues Spotted
                                      </Typography>
                                      <Typography align={'center'} variant="button" component="p">
                                        4
                                      </Typography>
                                    </Paper>
                                  </Col>
                                  <Col span={12}>
                                    <Paper style={{width:'80%'}}elevation={1}>
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
                    </Col>
                </Row>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
      changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExperienceManagerPage));
