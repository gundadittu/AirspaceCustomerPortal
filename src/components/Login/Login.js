import React from 'react';
import { connect } from 'react-redux';
import LoginNavBar from './LoginNavBar';
import LoginForm from './LoginForm';
import { Row, Col } from 'antd';
import './Login.css'

// To-do:
// make sure successful sign in leaves page
// show loading indicator
// show error message

class Login extends React.Component {

  render() {
    return (
      <div>
        <LoginNavBar/>
        <Row type="flex" justify="space-around" align="middle">
           <Col>
           <div>

              <LoginForm/>
           </div>
          </Col>
        </Row>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.general.error,
    isLoading: state.general.isLoading
  }
};

// const mapDispatchToProps = dispatch => {
//   return {
//     signInUser: (email, password) => dispatch(authActionCreators.signInUserAction(email, password))
//   }
// };

export default connect(mapStateToProps, null)(Login);

// import AirspaceLogo from "../../assets/images/airspace_logo.png";
// import Paper from '@material-ui/core/Paper';
// import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import { createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
// import { AccountCircle, Email, Lock} from '@material-ui/icons';

// const theme = createMuiTheme({
//   palette: {
//     secondary: {
//       main: "#F48FB1",
//     },
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

  // return (
    //   <div id="loginForm">
    //     <Paper style={{
    //       padding: 100,
    //       justifyContent: 'center'
    //     }}>
    //       <div className= "margin">
    //         <Grid container spacing={24}
    //           direction="column"
    //           alignItems="center"
    //           justify="center">
    //           <Grid item>
    //             <img src={AirspaceLogo} />
    //           </Grid>
    //           <Grid container spacing={8} alignItems="flex-end">
    //             <Grid item>
    //               <TextField id="input-with-icon-grid" label="Email" />
    //             </Grid>
    //             <Grid item>
    //               <Email />
    //             </Grid>
    //           </Grid>
    //           <Grid container spacing={8} alignItems="flex-end">
    //             <Grid item>
    //               <TextField id="input-with-icon-grid" label="Password" />
    //             </Grid>
    //             <Grid item>
    //               <Lock />
    //             </Grid>
    //           </Grid>
    //           <Grid container spacing={24} alignItems="flex-end">
    //             <Grid item>
    //             <MuiThemeProvider theme={theme}>
    //               <Button onClick={() => this.props.signInUser('adityagunda@uchicago.edu','Airspaceoffice2018')} variant="contained" color="secondary">
    //                 Secondary
    //               </Button>
    //             </MuiThemeProvider>
    //             </Grid>
    //           </Grid>
    //         </Grid>
    //       </div>
    //     </Paper>
    //   </div>
    // )
