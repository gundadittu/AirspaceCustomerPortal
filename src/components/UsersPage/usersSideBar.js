import React from 'react';
import { connect } from 'react-redux';
import { Button} from 'antd';
import Grid from '@material-ui/core/Grid';
import '../../App.css';

class UserSideBar extends React.Component {
  handleClick = (e) => {
    console.log('click ', e);
  }

  render() {
    return(
      <div>
        <Grid container justify="center" alignItems="center" style={{flexDirection:'column', paddingTop: 50}}>
          <Button className="wide-button" type="primary" >Add User</Button>
        </Grid>
      </div>
    )
  }

}

export default connect(null, null)(UserSideBar);
