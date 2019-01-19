import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';
import * as authActionCreators from '../../store/actions/auth';
import '../../App.css'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class NavBar extends React.Component {
    state = {
        current: null,
    }

    handleSignOut = (e) => {
      this.props.signOutUser();
    }

    handleProfileClick = (e) => {
      switch(e.key){
        case 'Edit Profile':
          console.log("Implement Edit Profile")
          break;
        case 'SignOut':
          console.log("Made it here");
          break
      }
    }

    handleClick = (e) => {
        console.log('click ', e);
        if (e.key == "signout"){
          this.handleSignOut(e);
        }
        if (e.key == "notifications"){
          console.log("Implement Notifications");
        }
      }

    render() {
      const profileMenu = (
        <Menu onClick={this.handleClick}>
          <Menu.Item key="Edit Profile">
            <a>Edit Profile</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="signout">
            <a>Sign Out</a>
          </Menu.Item>
        </Menu>
      );

        return (
            <Menu
            onClick={this.handleClick}
            mode="horizontal"
            style={{textAlign: 'right', border: 0}}
          >
            <Menu.Item key="notifications">
              <Icon type="bell" />
            </Menu.Item>

            <Menu.Item key="profile">
              <Dropdown overlay={profileMenu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  <Icon type="smile" />
                </a>
              </Dropdown>
            </Menu.Item>
          </Menu>
        );
    }
}

const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(authActionCreators.signOutUserAction())
  }
};

export default connect(null, mapDispatchToProps)(NavBar);
