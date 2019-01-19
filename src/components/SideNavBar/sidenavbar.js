import React from 'react';
import { connect } from 'react-redux';
import '../../App.css';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SideNavBar extends React.Component {
  handleClick = (e) => {
    console.log('click ', e);
  }

  render() {
    var sideBarMenuItems = null;
    // if regular, {landloard, receptionist, admin}
    // check mode, based on mode, show the options
    // admin show hardcoded, else show blank


    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256, height: 100, border: 0 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <MenuItemGroup key="g2" title="">
            <Menu.Item key="1">{<span><Icon type="home" /><span>Home</span></span>}</Menu.Item>
            <Menu.Item key="2">{<span><Icon type="user" /><span>Users</span></span>}</Menu.Item>
            <Menu.Item key="3">{<span><Icon type="user" /><span>Conference Rooms</span></span>}</Menu.Item>
            <Menu.Item key="4">{<span><Icon type="user" /><span>Hot Desks</span></span>}</Menu.Item>
            <Menu.Item key="5">{<span><Icon type="user" /><span>Service Requests</span></span>}</Menu.Item>
            <Menu.Item key="6">{<span><Icon type="user" /><span>Registered Guests</span></span>}</Menu.Item>
        </MenuItemGroup>
        <Menu.Item key="7">{<span><Icon type="up-square" /><span>My Offices</span></span>}</Menu.Item>
      </Menu>
    );
  }
}

export default connect(null, null)(SideNavBar);
