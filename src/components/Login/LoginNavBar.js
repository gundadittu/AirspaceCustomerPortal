import React from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Icon } from 'antd';
import '../../App.css'

class LoginNavBar extends React.Component {
    state = {
        current: null,
    }

    handleClick = (e) => {
        return 
    }

    render() {
        return (
            <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >

            <Menu.Item key="mail">
                <img className="logo-nav-image" src={ require('../../assets/images/airspace_logo.png') } />
            </Menu.Item>

          </Menu>
        );
    }
}

export default connect(null, null)(LoginNavBar);
