import React from 'react';
import { Avatar, Menu, Dropdown, Icon, Row, Col, List } from 'antd';
import { connect } from 'react-redux';
import * as authActionCreators from '../../store/actions/auth';
import * as genActionCreators from '../../store/actions/general';
import '../../App.css'
import './navbar.css'
import { AirNotificationType } from '../../models/AirNotificationType';


class NavBar extends React.Component {
  state = {
    current: null,
  }

  handleSignOut = (e) => {
    this.props.signOutUser();
  }

  handleProfileClick = (e) => {
    switch (e.key) {
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
    if (e.key == "signout") {
      this.handleSignOut(e);
    } else if (e.key == "notifications") {
      this.props.loadNotifications()
    }
  }

  getAirNotificationIconFor = (type) => { 
    switch (type) { 
        case AirNotificationType.announcement: 
            return '../../assets/images/announcements.png'
        case AirNotificationType.arrivedGuestUpdate: 
            return '../../assets/images/guests.png'
        case AirNotificationType.newEvent: 
            return '../../assets/images/events.png'
        case AirNotificationType.serviceRequestUpdate: 
            return '../../assets/images/serviceReqs.png'
        default:
            return null;
    }
  }

  componentDidMount() { 
    this.props.loadNotifications()
  }

  render() {

    const notData = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
    ];

    const profileMenu = (
      <List
      className='navBarMenu'
      itemLayout="horizontal"
      dataSource={notData}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={<a href="">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
      />
    );

    const notificationMenu = (
      <List
      className='navBarMenu'
      itemLayout="horizontal"
      dataSource={this.props.notifications}
      renderItem={item => { 
        const imagePath = this.getAirNotificationIconFor(item.type);
        console.log(imagePath);
        return (  
          <List.Item>
            <List.Item.Meta
              avatar={<img src={require(imagePath)} />}
              title={item.title+' • 3h ago'}
              description={item.body}
            />
          </List.Item>
        )
      }
      }
    />
    )

    return (
      <Row>
        <Col span={24}>
          <Menu
            onClick={this.handleClick}
            mode="horizontal"
            style={{ textAlign: 'right', border: 0}}
          >
            <Menu.Item key="notifications">
              <Dropdown overlay={notificationMenu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  <Icon type="bell" style={{ fontSize: 18}}/>
                </a>
              </Dropdown>
            </Menu.Item>

            <Menu.Item key="profile">
              <Dropdown overlay={profileMenu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  <Avatar src={this.props.user.profileImageURL} />
                </a>
              </Dropdown>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.auth.user,
    notifications: state.general.notifications
  }
};

const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(authActionCreators.signOutUserAction()), 
    loadNotifications: () => dispatch(genActionCreators.loadNotifications())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
