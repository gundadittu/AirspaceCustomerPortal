import React from 'react';
import { connect } from 'react-redux';
import { Button, Menu, Icon, Affix, Tag, Drawer, Badge } from 'antd';
//import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import { Link } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import * as actionCreators from '../../store/actions/general';
import '../../App.css';
import './sideNavBar.css';
import { grey } from '@material-ui/core/colors';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SideNavBar extends React.Component {

  state = {
    showDrawer: false
  }

  getSwitchPortalSubMenuTitle = () => {
    if (this.props.userType === 'regular') {
      if (this.props.regularUserPortalMode === 'regular') {
        return 'Regular Mode'
      } else {
        const currentOfficeAdmin = this.props.currentOfficeAdmin;
        if (currentOfficeAdmin !== null) {
          return (currentOfficeAdmin.name)
        } else {
          return 'Office Admin Mode'
        }
      }
    } else {
      return 'Switch Portal Mode'
    }
  }

  toggleDrawer = () => {
    const newStatus = this.state.showDrawer
    this.setState({
      showDrawer: !newStatus,
    });
  };


  renderSubNavInnerContent(currentPages) {
    const officeAdminPortalDiv = () => {

      if (this.props.adminOfficeList == null) {
        return null;
      }

      return (
        this.props.adminOfficeList.map((office) => (
          <Menu.Item key={office.uid} >
            <Link to={'/officeAdmin/' + office.uid}>
              {office.name}
            </Link>
          </Menu.Item>
        ))
      );
    }

    const sideBarLogo = (
      <img style={{ height: 30, width: 200, paddingLeft: 30 }} className="logo-nav-image" src={require('../../assets/images/nav-logo.png')} />
    );

    // office switching portal 
    const switchPortalSubMenu = (
      <SubMenu key={"sub1"} title={<Tag>{this.getSwitchPortalSubMenuTitle()}</Tag>}>
        {officeAdminPortalDiv()}
      </SubMenu>
    );

    const officeAppSubMenuLinks = {
      // home: {
      //   keyVal: pageTitles.homePageOfficeAdmin,
      //   iconType: "home",
      //   pageSubtitle: "home",
      //   linkTitle: "Home"
      // },
      users: {
        keyVal: pageTitles.userPageOfficeAdmin,
        iconType: "user",
        pageSubtitle: 'users',
        linkTitle: "Users"
      },
      conferenceRooms: {
        keyVal: pageTitles.conferenceRoomsPageOfficeAdmin,
        iconType: "schedule",
        pageSubtitle: 'conferenceRooms',
        linkTitle: "Conference Rooms"
      },
      hotDesks: {
        keyVal: pageTitles.hotDesksPageOfficeAdmin,
        iconType: "laptop",
        pageSubtitle: 'hotDesks',
        linkTitle: "Hot Desks"
      },
      serviceRequests: {
        keyVal: pageTitles.serviceRequestsPageOfficeAdmin,
        iconType: "tool",
        pageSubtitle: 'serviceRequests',
        linkTitle: "Service Requests"
      },
      registeredGuests: {
        keyVal: pageTitles.registeredGuestsPageOfficeAdmin,
        iconType: "idcard",
        pageSubtitle: 'registeredGuests',
        linkTitle: "Registered Guests"
      },
      eventsPage: {
        keyVal: pageTitles.eventsPageOfficeAdmin,
        iconType: "calendar",
        pageSubtitle: 'events',
        linkTitle: "Events"
      },
      announcements: {
        keyVal: pageTitles.announcementsPageOfficeAdmin,
        iconType: "notification",
        pageSubtitle: 'announcements',
        linkTitle: "Announcements"
      },
      spaceInfo: {
        keyVal: pageTitles.spaceInfoPageOfficeAdmin,
        iconType: "info-circle",
        pageSubtitle: 'spaceInfo',
        linkTitle: "Space Info"
      }
    }
    const currentOfficeAdminUID = this.props.currentOfficeAdminUID

    const officeAppSubMenuContent = () => (
      Object.keys(officeAppSubMenuLinks).map((key) => (
        < Menu.Item key={officeAppSubMenuLinks[key].keyVal} >
          <Link to={'/officeAdmin/' + this.props.currentOfficeAdminUID + '/' + officeAppSubMenuLinks[key].pageSubtitle}>
            {<span style={{ fontSize: fontSize }}><Icon type={officeAppSubMenuLinks[key].iconType} style={{ fontSize: iconSize }} /><span>{officeAppSubMenuLinks[key].linkTitle}</span></span>}
          </Link>
        </Menu.Item>
      ))
    );

    const officeAppSubMenu = (
      <SubMenu key={"sub2"} title={<span><Icon type="mobile" /><span>Office App</span></span>} style={{ fontSize: iconSize }}>
        {officeAppSubMenuContent()}
      </SubMenu >
    );

    var fontSize = 14;
    var iconSize = 14;
    if (this.props.device == "mobile") {
      fontSize = 35;
      iconSize = 25
    }

    const menuLinks = {
      findServices: {
        keyVal: pageTitles.findServicesPageOfficeAdmin,
        iconType: "search",
        pageSubtitle: "find-services",
        linkTitle: "Find Services"
      },
      experienceManager: {
        keyVal: pageTitles.experienceManagerPageOfficeAdmin,
        iconType: "user",
        pageSubtitle: "experience-manager",
        linkTitle: "Experience Manager"
      },
      servicePlan: {
        keyVal: pageTitles.servicePlanPageOfficeAdmin,
        iconType: "bars",
        pageSubtitle: "service-plan",
        linkTitle: "Service Plan"
      },
      // officeProfile: {
      //   keyVal: pageTitles.officeProfilePageOfficeAdmin,
      //   iconType: "layout",
      //   pageSubtitle: "office-profile",
      //   linkTitle: "Office Profile"
      // },
      billing: {
        keyVal: pageTitles.billingPageOfficeAdmin,
        iconType: "dollar",
        pageSubtitle: "billing",
        linkTitle: "Billing"
      },
      // support: {
      //   keyVal: pageTitles.supportPageOfficeAdmin,
      //   iconType: "solution",
      //   pageSubtitle: "support",
      //   linkTitle: "Support"
      // }
    };

    return (
      <div>
        {this.props.device == "mobile" ? <div></div> : sideBarLogo}
        <Menu
          style={{ border: 0 }}
          defaultSelectedKeys={currentPages}
          mode="inline"
          className="airspace-side-nav-bar"
          forceSubMenuRender={true}
          // multiple={true}
        >
          {Object.keys(menuLinks).map((key) => {

            if (key === "servicePlan") {
              return (
                < Menu.Item key={menuLinks[key].keyVal} >
                  <Link to={'/officeAdmin/' + currentOfficeAdminUID + '/' + menuLinks[key].pageSubtitle}>
                    {<span style={{ fontSize: fontSize }}><Icon type={menuLinks[key].iconType} style={{ fontSize: iconSize }} /><span>{menuLinks[key].linkTitle} <Badge dot offset={[0, 5]} count={this.props.badgeCount} /></span></span>}
                  </Link>
                </Menu.Item>
              )
            }

            return (
              < Menu.Item key={menuLinks[key].keyVal} >
                <Link to={'/officeAdmin/' + currentOfficeAdminUID + '/' + menuLinks[key].pageSubtitle}>
                  {<span style={{ fontSize: fontSize }}><Icon type={menuLinks[key].iconType} style={{ fontSize: iconSize }} /><span>{menuLinks[key].linkTitle}</span></span>}
                </Link>
              </Menu.Item>
            );
          })}

          {/* {officeAppSubMenu} */}
          {switchPortalSubMenu}
          <Affix active={"true"} style={{ position: 'absolute', left: 20, bottom: 100 }}>
            <a style={{ color: "#C0C0C0" }} target="_blank" href="https://www.airspaceoffice.co/terms.html">Terms</a>
          </Affix>
          <Affix active={"true"} style={{ position: 'absolute', left: 80, bottom: 100 }}>
            <a style={{ color: "#C0C0C0" }} target="_blank" href="https://www.airspaceoffice.co/privacy.html">Privacy</a>
          </Affix>
        </Menu >
      </div >
    )
  }

  renderSubNavBar(currentPages) {
    const officeAdminPortalDiv = () => {

      if (this.props.adminOfficeList == null) {
        return null;
      }


      return (
        this.props.adminOfficeList.map((office) => (
          <Menu.Item key={office.uid}>
            <Link to={'/officeAdmin/' + office.uid}>
              {office.name}
            </Link>
          </Menu.Item>
        ))
      );
    }

    const sideBarLogo = (
      <img style={{ height: 30, width: 200, paddingLeft: 30 }} className="logo-nav-image" src={require('../../assets/images/nav-logo.png')} />
    );
    const switchPortalSubMenu = (
      <SubMenu className='sideBarPortalSwitcher' key="sub1" title={<Tag>{this.getSwitchPortalSubMenuTitle()}</Tag>}>
        {officeAdminPortalDiv()}
      </SubMenu>
    );

    if (this.props.userType === "regular") {
      if (this.props.regularUserPortalMode === "officeAdmin") {
        if (this.props.device == "mobile") {
          return (
            <div>
              {this.renderSubNavInnerContent(currentPages)}
            </div>
          )
        } else {
          return (
            <Affix className="airspace-side-nav-bar-group" >
              {this.renderSubNavInnerContent(currentPages)}
            </Affix>
          )
        }
      } else if (this.props.regularUserPortalMode === "regular") {
        return (
          <Menu
            onClick={this.handleClick}
            style={{ width: 256, height: 100, border: 0 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            {sideBarLogo}
            {switchPortalSubMenu}
          </Menu>
        )
      }
    } else {
      // if not a regular user
      return null;
    }
  }

  render() {
    let currentPages = [this.props.currentPage, this.props.currentOfficeAdminUID];

    const drawerWidth = 240;

    const styles = () => ({
      drawerPaper: {
        width: drawerWidth,
      },
    })

    if (this.props.device == "mobile") {
      return <div>
        <Button icon="bars" style={{ fontSize: 40, height: 80, width: 80 }} bordered={false} shape="circle" onClick={this.toggleDrawer}>
        </Button>
        <Drawer
          visible={this.state.showDrawer}
          placement='left'
          onClose={this.toggleDrawer}
          classes={styles.drawerPaper}
          width={520}
          closable={false}
        >
          {this.renderSubNavBar(currentPages)}
        </Drawer>
      </div>
    } else {
      return this.renderSubNavBar(currentPages)
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    userType: state.auth.type,
    adminOfficeList: state.auth.adminOfficeList,
    regularUserPortalMode: state.general.regularUserPortalMode,
    currentPage: state.general.currentPage,
    currentOfficeAdminUID: state.general.currentOfficeAdminUID,
    currentOfficeAdmin: state.general.currentOfficeAdmin,
    badgeCount: state.officeAdmin.pendingServicePlanCount
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: (payload) => dispatch(actionCreators.changePage(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);
