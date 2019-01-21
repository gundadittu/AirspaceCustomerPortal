import React from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import * as actionCreators from '../../store/actions/general';
import '../../App.css';
import './sideNavBar.css';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SideNavBar extends React.Component {

  render() {
    const sideBarLogo = (
      <img style={{ height: 30, width: 200, paddingLeft: 30 }} className="logo-nav-image" src={require('../../assets/images/nav-logo.png')} />
    );
    const switchPortalSubMenu = (
      <SubMenu key="sub1" title={<span><Icon type="up-square" /><span>Switch Portal</span></span>}>
        <Menu.Item key={pageTitles.homePageRegularUser}>{<span><Icon type="user" /><span>Regular Portal</span></span>}</Menu.Item>
        <MenuItemGroup key="g1" title="Office Admin Portals">
          {this.props.adminOfficeList.map((office) => (
            <Menu.Item key={office.uid}>
              <Link to={'/officeAdmin/' + office.uid + '/users'}>
                {office.name}
              </Link>
            </Menu.Item>
          ))}
        </MenuItemGroup>
      </SubMenu>
    );

    if (this.props.userType == "regular") {
      if (this.props.regularUserPortalMode == "officeAdmin") {
        return (
          <Menu
            style={{ border: 0 }}
            defaultSelectedKeys={[this.props.currentPage]}
            mode="inline"
            className="airspace-side-nav-bar"
          >
            {sideBarLogo}
            <MenuItemGroup key="g2" title="" className="airspace-side-nav-bar-group">
              <Menu.Item key="home">{<span><Icon type="home" /><span>Home</span></span>}</Menu.Item>
              <Menu.Item key={pageTitles.userPageOfficeAdmin} >
                <Link to={'/officeAdmin/' + this.props.currentOfficeAdminUID + '/users'}>
                  {<span><Icon type="user" /><span>Users</span></span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="conferenceRooms">{<span><Icon type="user" /><span>Conference Rooms</span></span>}</Menu.Item>
              <Menu.Item key="hotDesks">{<span><Icon type="user" /><span>Hot Desks</span></span>}</Menu.Item>
              <Menu.Item key="serviceRequests">{<span><Icon type="user" /><span>Service Requests</span></span>}</Menu.Item>
              <Menu.Item key="registeredGuests">{<span><Icon type="user" /><span>Registered Guests</span></span>}</Menu.Item>
              {switchPortalSubMenu}
            </MenuItemGroup>

          </Menu>
        );
      } else if (this.props.regularUserPortalMode == "regular") {
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
    currentOfficeAdminUID: state.general.currentOfficeAdminUID
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: (payload) => dispatch(actionCreators.changePage(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);
