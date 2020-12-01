import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "../../App.css"
import pic from "../Circle-icons-profile.svg"
import { useHistory } from "react-router-dom"
import firebase from "firebase"
import { userDetailsAction } from '../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';

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
    const userDetails = useSelector((state) => state.userDetails)
    let dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(false);
    const [dp, setDp] = React.useState(userDetails?.dp || pic)
    const [checkin, setCheckin] = React.useState(true)
    let history = useHistory()


    React.useEffect(() => {
        setCheckin(false)
        

    }, [userDetails.checkin])

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

    const Checkin = (e) => {
        setCheckin(true)
        const start = Date.now();
        const started = new Date(start)
        console.log(started, "started")


        let UID = firebase.auth().currentUser?.uid
        firebase.database().ref('Users/' + UID).update({
            checkedin: start
        })




    }

    const Checkout = (e) => {
        const start = Date.now();
        const started = new Date(start)
        console.log(started, "started")

        let UID = firebase.auth().currentUser?.uid
        firebase.database().ref('Users/' + UID).update({
            checkedout: start
        })
        setCheckin(false)
    
    }


    // console.log(, "userdetails.checkin")

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Attendance Management System
          </Typography>
                    {checkin ? <Button variant="contained" onClick={((e) => Checkout(e))}>Check out</Button> : <Button variant="contained" onClick={((e) => Checkin(e))}>Check in</Button>}
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userDetails?.firstName}</span>

                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        height="2em"
                    >
                        <img src={dp} className="dpIcon" alt="profile " />
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
