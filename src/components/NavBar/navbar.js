import React from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import '../../App.css'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class NavBar extends React.Component {
    state = {
        current: null,
    }

    handleClick = (e) => {
        console.log('click ', e);
        // this.setState({
        //   current: e.key,
        // });
      }

    render() { 
        return (
            <Menu
            onClick={this.handleClick}
            // selectedKeys={[this.state.current]}
            mode="horizontal"
            style={{textAlign: 'right', border: 0}}
          >
            <Menu.Item key="notifications">
              <Icon type="bell" />
            </Menu.Item>
            <Menu.Item key="profile">
              <Icon type="smile" />
            </Menu.Item>
          </Menu>
        );
    }
}

export default connect(null, null)(NavBar);