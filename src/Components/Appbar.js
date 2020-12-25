import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line 
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line 
import firebase from "firebase"
// import { Attendance } from './Components/Attendance';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import "../App.css";
import pic from "./Circle-icons-profile.svg"
import { useHistory } from "react-router-dom"
import { userDetailsAction, loadingAction } from '../Redux/Actions';
import { Button } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        // width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

var today = new Date().toString("ddMMyyyy")
console.log(today, "today")

export const Appbar = () => {
    const loading = useSelector((state) => state.loading)
    const userDetails = useSelector((state) => state.userDetails)
    let attendance = useSelector((state) => state.attendance)
    // const [show, setShow] = useState(false)

    let dispatch = useDispatch();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(false);
    let dp = userDetails?.dp || pic
    const [checkin, setCheckin] = useState(false)

    let history = useHistory()


    // useEffect(() => {

    //     const checkinTimeStamp = attendance && attendance[today]?.checkedin
    //     var checkinTime = new Date(checkinTimeStamp).toString("hh:mm")
    //     const checkoutTimeStamp = attendance && attendance[today]?.checkedout
    //     var checkoutTime = new Date(checkoutTimeStamp).toString("hh:mm")

    // }, [attendance])

    // const showMenu = () => {
    //     if (!(userDetails.role)) {
    //         setShow(false)
    //     } else if (userDetails.firstName) {
    //         setShow(true)
    //     }
    // }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const profileFunc = () => {
        setAnchorEl(null);
        history.push("/dashboard/profile")
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
        const checkinTimeStamp = attendance && attendance[today]?.checkedin
        // var checkinTime = new Date(checkinTimeStamp).toString("hh:mm")
        if (checkinTimeStamp) {
            setCheckin(true)
        }

        const start = Date.now();
        let UID = firebase.auth().currentUser?.uid
        firebase.database().ref(`Attendance/${UID}/${today}`).set({
            checkedin: start,
            checkedout: ""

        })

        firebase.database().ref(`Users/${UID}/}`).set({
            checkedin: start,
            checkedout: ""

        })
    }

    const Checkout = (e) => {
        const start = Date.now();

        let UID = firebase.auth().currentUser?.uid
        firebase.database().ref(`Attendance/${UID}/${today}`).update({
            checkedout: start,
        })
        firebase.database().ref(`Users/${UID}/`).update({
            checkedout: start,
        })
        setCheckin(false)
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const useruid = user.uid
                firebase.database().ref(`Users/${useruid}/`).on("value", (res) => {
                    dispatch(userDetailsAction(res.val()))
                    console.log(res.val(), "res.val")
                    dispatch(loadingAction(false))
                })
                // firebase.database().ref(`Users/${useruid}/`).on("value", (res)=>{

                // })
            }
            else dispatch(loadingAction(false))

        });
        // eslint-disable-next-line
    }, [loading])

    if (loading) {
        return <p>...Loading</p>
    }

    const clickHandle = () => {
        history.push("/dashboard")
    }

    console.log(userDetails?.firstName, "userDetails in appbar ")
    console.log(checkin, "checkin")
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap onClick={clickHandle} className="center">
                        Attendance management system
            </Typography>


                    {/* {(!(userDetails.role)) ?  */}



                    {userDetails?.firstName ? <span className="appbarRightSide" >

                        {userDetails.role !== "Admin" ?
                            (attendance && attendance[today]?.checkedin && !(attendance[today]?.checkedout) ?

                                < Button variant="contained" onClick={((e) => Checkout(e))}>Check out</Button> :
                                <Button variant="contained" disabled={attendance && attendance[today]?.checkedout} onClick={((e) => Checkin(e))}>Check in</Button>
                            )

                            : null}

                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userDetails?.firstName}
                        </span>

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
                    </span> : null}
                </Toolbar>

            </AppBar>

        </div >
    )
}
