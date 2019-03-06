import React from 'react';
import { connect } from 'react-redux';
import { Button, Menu, Icon, Affix, Tag, Drawer} from 'antd';
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


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SideNavBar extends React.Component {

  state = {
    showDrawer : false
  }

  getSwitchPortalSubMenuTitle = () => {
    if (this.props.userType === 'regular') {
      if (this.props.regularUserPortalMode === 'regular') {
        return 'Regular Mode'
      } else {
        const currentOfficeAdmin = this.props.currentOfficeAdmin;
        if (currentOfficeAdmin !== null) {
          return ('Managing ' + currentOfficeAdmin.name)
        } else {
          return 'Office Admin Mode'
        }
      }
    } else {
      return 'Switch Portal Mode'
    }
  }

  toggleDrawer = () => {
    console.log("Here")
    const newStatus = this.state.showDrawer
    this.setState({
      showDrawer: !newStatus,
    });
  };

  renderSubNavInnerContent() {
    let currentPage = [this.props.currentPage];
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
    const switchPortalSubMenu = (
      <SubMenu className='sideBarPortalSwitcher' key="sub1" title={<Tag>{this.getSwitchPortalSubMenuTitle()}</Tag>}>
        <Menu.Item key={pageTitles.homePageRegularUser}>{<span><Icon type="user" /><span>Regular Portal</span></span>}</Menu.Item>
        <MenuItemGroup key="g1" title="Office Admin Portals">
          {officeAdminPortalDiv()}
        </MenuItemGroup>
      </SubMenu>
    );

    var fontSize = 14;
    var iconSize = 14;
    if (this.props.device == "mobile"){
      fontSize = 35;
      iconSize = 25
    }

    const sideMenuLinks = {
      home: {
        keyVal: pageTitles.homePageOfficeAdmin,
        iconType: "home",
        pageSubtitle: "home",
        linkTitle: "Home"
      },
      announcements: {
        keyVal: pageTitles.announcementsPageOfficeAdmin,
        iconType: "notification",
        pageSubtitle: 'announcements',
        linkTitle: "Announcements"
      },
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
        linkTitle: "ConferenceRooms"
      },
      hotDesks: {
        keyVal: pageTitles.hotDesksPageOfficeAdmin,
        iconType: "laptop",
        pageSubtitle: 'hotDesks',
        linkTitle: "Hot Desks"
      },
      serviceRequests: {
        key: pageTitles.serviceRequestsPageOfficeAdmin,
        iconType: "tool",
        pageSubtitle: 'serviceRequests',
        linkTitle: "Service Requests"
      },
      registeredGuests: {
        keyVal: pageTitles.registeredGuestsPageOfficeAdmin,
        iconType: "idcard",
        pageSubtitle: 'registeredGuests',
        linkTitle: "RegisteredGuests"
      },
      eventsPage: {
        keyVal: pageTitles.eventsPageOfficeAdmin,
        iconType: "calendar",
        pageSubtitle: 'events',
        linkTitle: "Events"
      },
      spaceInfo: {
        keyVal: pageTitles.spaceInfoPageOfficeAdmin,
        iconType: "info-circle",
        pageSubtitle: 'spaceInfo',
        linkTitle: "Space Info"
      }
    }

    const currentOfficeAdminUID = this.props.currentOfficeAdminUID
    console.log(currentOfficeAdminUID, '\n')
    return (
      <div>
        {this.props.device == "mobile" ? <div></div> : sideBarLogo}
        <Menu
          style={{ border: 0}}
          defaultSelectedKeys={currentPage}
          mode="inline"
          className="airspace-side-nav-bar"
        >
          <MenuItemGroup key="g2" title="">
            {Object.keys(sideMenuLinks).map((key) => (
              <Menu.Item key={sideMenuLinks[key].keyVal}>
                <Link to={'/officeAdmin/' + currentOfficeAdminUID + '/' + sideMenuLinks[key].pageSubtitle}>
                  {<span style={{fontSize: fontSize}}><Icon type={sideMenuLinks[key].iconType} style={{ fontSize: iconSize }}/><span>{sideMenuLinks[key].linkTitle}</span></span>}
                </Link>
              </Menu.Item>
            ))}
          </MenuItemGroup>
          {switchPortalSubMenu}
        </Menu>
      </div>
    )
  }

  renderSubNavBar() {
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
            <Menu.Item key={pageTitles.homePageRegularUser}>{<span><Icon type="user" /><span>Regular Portal</span></span>}</Menu.Item>
            <MenuItemGroup key="g1" title="Office Admin Portals">
              {officeAdminPortalDiv()}
            </MenuItemGroup>
          </SubMenu>
        );

        let currentPage = [this.props.currentPage];
        if (this.props.userType === "regular") {
          if (this.props.regularUserPortalMode === "officeAdmin") {
            if(this.props.device == "mobile"){
              return (
                <div>
                  {this.renderSubNavInnerContent()}
                </div>
              )
            } else {
              return (
                <Affix className="airspace-side-nav-bar-group" >
                  {this.renderSubNavInnerContent()}
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

    const drawerWidth = 240;

    const styles = theme => ({
      drawerPaper: {
        width: drawerWidth,
      },
    })
    if(this.props.device == "mobile"){
      return <div>
        <Button icon="bars" style={{fontSize: 40, height:80, width:80}} bordered={false} shape="circle" onClick={this.toggleDrawer}>
        </Button>
        <Drawer
            visible={this.state.showDrawer}
            placement='left'
            onClose={this.toggleDrawer}
            classes={styles.drawerPaper}
            width={520}
            closable={false}
          >
              {this.renderSubNavBar()}
          </Drawer>
        </div>
    } else {
      return this.renderSubNavBar()
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
    currentOfficeAdmin: state.general.currentOfficeAdmin
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: (payload) => dispatch(actionCreators.changePage(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);
