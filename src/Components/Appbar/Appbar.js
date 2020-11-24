import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AppbarBody from './AppbarBody';
import { useHistory } from "react-router-dom"
import firebase from "firebase"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(false);
  let history = useHistory()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const profileFunc = () => {
    setAnchorEl(null);
    history.push("/profile")

  }
  const LogoutFunc = () => {
    setAnchorEl(null);
    firebase.auth().signOut()
    history.push("/")
  }

  const handleClose = () => {
    setAnchorEl(null);

  }



  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={profileFunc}>Profile setting</MenuItem>
              <MenuItem onClick={LogoutFunc}>Log out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <AppbarBody />
    </div>
  );
}
