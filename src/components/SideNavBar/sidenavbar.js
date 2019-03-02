import React from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Affix, Tag } from 'antd';
import { Link } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import * as actionCreators from '../../store/actions/general';
import '../../App.css';
import './sideNavBar.css';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SideNavBar extends React.Component {
  /*
  state = {
    showDrawer : false
  } */

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
    const newStatus = this.state.showDrawer
    this.setState({
      showDrawer: !newStatus,
    });
  };

  render() {

    const sideBarLogo = (
      <img style={{ height: 30, width: 200, paddingLeft: 30 }} className="logo-nav-image" src={require('../../assets/images/nav-logo.png')} />
    );

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

    const switchPortalSubMenu = (
      <SubMenu className='sideBarPortalSwitcher' key="sub1" title={<Tag>{this.getSwitchPortalSubMenuTitle()}</Tag>}>
        <Menu.Item key={pageTitles.homePageRegularUser}>{<span><Icon type="user" /><span>Regular Portal</span></span>}</Menu.Item>
        <MenuItemGroup key="g1" title="Office Admin Portals">
          {officeAdminPortalDiv()}
        </MenuItemGroup>
      </SubMenu>
    );

    let currentPage = [this.props.currentPage];


    /*if(this.props.device == "mobile"){
      <div>
        <Button onClick={this.toggleDrawer()}>Open Left</Button>
        <SwipeableDrawer
            open={this.state.left}
            onClose={this.toggleDrawer('left', false)}
            onOpen={this.toggleDrawer('left', true)}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('left', false)}
              onKeyDown={this.toggleDrawer('left', false)}
            >
              {sideList}
            </div>
          </SwipeableDrawer>
        </div>
    } */

    if (this.props.userType === "regular") {
      if (this.props.regularUserPortalMode === "officeAdmin") {
        return (
          <Affix className="airspace-side-nav-bar-group" >
            {sideBarLogo}
            <Menu
              style={{ border: 0 }}
              defaultSelectedKeys={currentPage}
              mode="inline"
              className="airspace-side-nav-bar"
            >
              <MenuItemGroup key="g2" title="">
                <Menu.Item key={pageTitles.homePageOfficeAdmin}>
                  <Link to={'/officeAdmin/' + this.props.currentOfficeAdminUID + '/home'}>
                    {<span><Icon type="home" /><span>Home</span></span>}
                  </Link>
                </Menu.Item>
                <Menu.Item key="announcements">
                  <Link to={'/officeAdmin/' + this.props.currentOfficeAdminUID + '/announcements'}>
                    {<span><Icon type="notification" /><span>Announcements</span></span>}
                  </Link>
                </Menu.Item>
                <Menu.Item key={pageTitles.userPageOfficeAdmin} >
                  <Link to={'/officeAdmin/' + this.props.currentOfficeAdminUID + '/users'}>
                    {<span><Icon type="user" /><span>Users</span></span>}
                  </Link>
                </Menu.Item>
                <Menu.Item key={pageTitles.conferenceRoomsPageOfficeAdmin}>
                  <Link to={'/officeAdmin/' + this.props.currentOfficeAdminUID + '/conferenceRooms'}>
                    {<span><Icon type="schedule" /><span>Conference Rooms</span></span>}
                  </Link>
                </Menu.Item>
                <Menu.Item key={pageTitles.hotDesksPageOfficeAdmin}>
                  <Link to={'/officeAdmin/' + this.props.currentOfficeAdminUID + '/hotDesks'}>
                    {<span><Icon type="laptop" /><span>Hot Desks</span></span>}
                  </Link>
                </Menu.Item>
                <Menu.Item key="serviceRequests">
                  <Link to={'/officeAdmin/' + this.props.currentOfficeAdminUID + '/serviceRequests'}>
                    {<span><Icon type="tool" /><span>Service Requests</span></span>}
                  </Link>
                </Menu.Item>
                <Menu.Item key={pageTitles.registeredGuestsPageOfficeAdmin}>
                  <Link to={'/officeAdmin/' + this.props.currentOfficeAdminUID + '/registeredGuests'}>
                    {<span><Icon type="idcard" /><span>Registered Guests</span></span>}
                  </Link>
                </Menu.Item>
                <Menu.Item key={pageTitles.eventsPageOfficeAdmin}>
                  <Link to={'/officeAdmin/' + this.props.currentOfficeAdminUID + '/events'}>
                    {<span><Icon type="calendar" /><span>Events</span></span>}
                  </Link>
                </Menu.Item>
                <Menu.Item key={pageTitles.spaceInfoPageOfficeAdmin}>
                  <Link to={'/officeAdmin/' + this.props.currentOfficeAdminUID + '/spaceInfo'}>
                    {<span><Icon type="info-circle" /><span>Space Info</span></span>}
                  </Link>
                </Menu.Item>
              </MenuItemGroup>
              {switchPortalSubMenu}
            </Menu>
          </Affix>
        );
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
