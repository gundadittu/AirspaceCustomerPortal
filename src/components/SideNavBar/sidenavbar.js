import React from 'react';
import { connect } from 'react-redux';
import { Button, Menu, Icon, Affix, Tag, Drawer, Badge } from 'antd';
import { Link } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import * as actionCreators from '../../store/actions/general';
import '../../App.css';
import './sideNavBar.css';
import getPagePayload from '../../pages/pageRoutingFunctions';
import * as config from "./sideNavBarConfig"; 
import { withRouter } from 'react-router-dom';
const SubMenu = Menu.SubMenu;

class SideNavBar extends React.Component {

  state = {
    showDrawer: false
  }

  // Office Admin Content
  renderOfficeSwitcherForAdminUser() {
    if (this.props.adminOfficeList == null) {
      return null;
    }

    return (
      <SubMenu key={"sub1"} title={<Tag>{this.getSwitchPortalSubMenuTitle()}</Tag>}>
        {this.props.adminOfficeList.map((office) => (
          <Menu.Item key={office.uid} >
            <Link to={'/officeAdmin/' + office.uid}>
              {office.name}
            </Link>
          </Menu.Item>
        ))}
      </SubMenu>
    );
  }

  renderOfficeAppAdminSubMenu() {
    let fontSize = 14;
    let iconSize = 14;
    if (this.props.device == "mobile") {
      fontSize = 35;
      iconSize = 25
    }
    const officeAppSubMenuLinks = config.officeAppSubMenuLinks; 

    return (
      <SubMenu key={"sub2"} title={<span><Icon type="mobile" /><span>Office App</span></span>} style={{ fontSize: iconSize }}>

        {Object.keys(officeAppSubMenuLinks).map((key) => (
          < Menu.Item key={officeAppSubMenuLinks[key].keyVal} >
            <Link to={'/officeAdmin/' + this.props.currentOfficeAdminUID + '/' + officeAppSubMenuLinks[key].pageSubtitle}>
              {<span style={{ fontSize: fontSize }}><Icon type={officeAppSubMenuLinks[key].iconType} style={{ fontSize: iconSize }} /><span>{officeAppSubMenuLinks[key].linkTitle}</span></span>}
            </Link>
          </Menu.Item>
        ))}
      </SubMenu >
    )
  }

  renderSideNavBarOfficeAdminMainContent(currentPages) {
    const currentOfficeAdminUID = this.props.currentOfficeAdminUID
    const menuLinks = config.officeAdminMainLinks; 

    let fontSize = 14;
    let iconSize = 14;
    if (this.props.device == "mobile") {
      fontSize = 35;
      iconSize = 25
    }

    return (
      <div>
        {this.props.device == "mobile" ? <div></div> : this.renderMainLogo()}
        <Menu
          style={{ border: 0 }}
          defaultSelectedKeys={currentPages}
          mode="inline"
          className="airspace-side-nav-bar menu-tab"
          forceSubMenuRender={true}
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

          {this.renderOfficeAppAdminSubMenu()}
          {this.renderOfficeSwitcherForAdminUser()}
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

  // Regular User Content

  renderOfficeSwitcherForRegularUser() {

    if (this.props.adminOfficeList == null) {
      return null;
    }

    const switchOffice = (uid) => {
      if (uid === null) {
        return
      }

      const list = this.props.adminOfficeList;
      let officeObj = null;
      for (let key in list) {
        const value = list[key];

        if (value.uid === uid) {
          officeObj = value;
        }
      }

      const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, { officeUID: uid, officeObj: officeObj });
      if (pagePayload) {
        this.props.changePage(pagePayload);
      }
    }

    return (
      <SubMenu className='sideBarPortalSwitcher' key="sub1" title={<Tag>{this.getSwitchPortalSubMenuTitle()}</Tag>}>
        {this.props.adminOfficeList.map((office) => (
          <a onClick={() => switchOffice(office.uid)}>
            <Menu.Item key={office.uid} >
              <Link to={'/officeAdmin/' + office.uid}>
                {office.name}
              </Link>
            </Menu.Item>
          </a>
        ))}
      </SubMenu>
    );
  }

  renderSideNavBarRegularUserMainContent() {

    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256, height: 100, border: 0 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        className="menu-tab"
      >
        {this.renderMainLogo()}
        {this.renderOfficeSwitcherForRegularUser()}
      </Menu>
    )
  }

  // General

  toggleDrawer = () => {
    const newStatus = this.state.showDrawer
    this.setState({
      showDrawer: !newStatus,
    });
  };

  renderMainLogo() {
    return (
      <img style={{ height: 30, width: 200, paddingLeft: 30 }} className="logo-nav-image" src={require('../../assets/images/nav-logo.png')} />
    );
  };

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

  renderSideNavBar() {
    let currentPages = [this.props.currentPage];

    if (this.props.userType === "regular" && this.props.regularUserPortalMode === "officeAdmin") {
      // user is in office admin mode
      return (
        <Affix className={(this.props.device !== "mobile") ? "airspace-side-nav-bar-group" : ""}>
          {this.renderSideNavBarOfficeAdminMainContent(currentPages)}
        </Affix>
      )
    } else if (this.props.userType === "regular" && this.props.regularUserPortalMode === "regular") {
      // user is not in office admin mode
      return this.renderSideNavBarOfficeAdminMainContent(currentPages)
    } else {
      // user is not a supported type currently
      return null;
    }
  }

  renderMobileView() {
    const styles = () => ({
      drawerPaper: {
        width: 240,
      },
    })

    return (
      <div>
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
          {this.renderSideNavBar()}
        </Drawer>
      </div>
    );
  }

  render() {
    if (this.props.device === "mobile") {
      return this.renderMobileView()
    } else {
      return this.renderSideNavBar()
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
    badgeCount: state.officeAdmin.pendingServicePlanCount,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: (payload) => dispatch(actionCreators.changePage(payload))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideNavBar));
