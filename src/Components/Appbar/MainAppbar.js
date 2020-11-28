import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "../../App.css"

import { useHistory } from "react-router-dom"
import firebase from "firebase"
import { userDetailsAction } from '../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import SideNav from './SideNav';

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

export const MainAppbar = () => {
    const classes = useStyles();
    let dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(false);
    let history = useHistory()
    const state = useSelector((state) => state.userDetails)
  

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
        dispatch(userDetailsAction(false))
    }

    const handleClose = () => {
        setAnchorEl(null);

    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Attendance Management System
          </Typography>
                    <Button variant="contained">Check in</Button>{' '}
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{state?.firstName}</span>

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

                </Toolbar>

            </AppBar>
        </div>
    )
}
