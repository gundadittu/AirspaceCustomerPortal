import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import { AccountCircle, Email, Lock} from '@material-ui/icons';
import AirspaceLogo from "../../assets/images/airspace_logo.png";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#F48FB1",
    },
  },
});

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="loginForm">
        <Paper style={{
          padding: 100,
          justifyContent: 'center'
        }}>
          <div className= "margin">
            <Grid container spacing={24}
              direction="column"
              alignItems="center"
              justify="center">
              <Grid item>
                <img src={AirspaceLogo} />
              </Grid>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <TextField id="input-with-icon-grid" label="Email" />
                </Grid>
                <Grid item>
                  <Email />
                </Grid>
              </Grid>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <TextField id="input-with-icon-grid" label="Password" />
                </Grid>
                <Grid item>
                  <Lock />
                </Grid>
              </Grid>
              <Grid container spacing={24} alignItems="flex-end">
                <Grid item>
                <MuiThemeProvider theme={theme}>
                  <Button variant="contained" color="secondary">
                    Secondary
                  </Button>
                </MuiThemeProvider>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    )
  }
}