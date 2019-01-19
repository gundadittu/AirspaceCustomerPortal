import React from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Row, Button} from 'antd';
import Grid from '@material-ui/core/Grid';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class UserSideBar extends React.Component {
  handleClick = (e) => {
    console.log('click ', e);
  }

  render() {
    return(
      <div>
        <Grid container justify="center" alignItems="center" style={{flexDirection:'column'}}>
          <Button type="primary" >Add User</Button>
          <Button type="primary" >Add Admin</Button>
        </Grid>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
  }
};

export default connect(mapStateToProps, null)(UserSideBar);
