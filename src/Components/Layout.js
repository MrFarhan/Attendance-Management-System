import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// eslint-disable-next-line 
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line 
import firebase from "firebase"
import { useHistory } from "react-router-dom"
import { userDetailsAction, loadingAction } from '../Redux/Actions';
import pic from "./Circle-icons-profile.svg"
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button } from '@material-ui/core';
require("datejs")


const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: "inherit"
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    appBarCustom: {
        [theme.breakpoints.up('sm')]: {
            width: `100%`,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    menuButtonCustom: {
        marginRight: theme.spacing(2),
        display: 'none',

    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    drawerPaper: {
        width: drawerWidth,
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    checkBtn: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    main: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
}));

// var today = new Date().toISOString().split("T")[0]
var today = new Date().toLocaleString().split(",")[0].replaceAll("/", "-");

var currentMonth = new Date().getMonth();
currentMonth = currentMonth + 1

var currentYear = new Date().getFullYear()
console.log("today is ", today)

// var today = new Date().toString("ddMMyyyy")
// console.log("today is, ", today)
// console.log("current date in date.now",new Date())

const Layout = ({ children }) => {
    // const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const state = useSelector((state) => state)
    const loading = state.loading
    const userDetails = state.userDetails
    let attendance = state.attendance
    const [anchorEl, setAnchorEl] = useState(false);
    let dp = userDetails?.dp || pic
    // eslint-disable-next-line
    const [checkin, setCheckin] = useState(false)
    let history = useHistory()
    let dispatch = useDispatch();
    // console.log("checkined  is : ", attendance[currentMonth][today])

    // side bar items and click handler
    var menu = [{ "Text": "Dashboard", "route": "dashboard" }, { "Text": "Attendance", "route": "attendance" }, { "Text": "Report", "route": "report" }]
    const HandelClick = (e) => {
        if (e.target.innerText === "Attendance") {
            history.push("/attendance")
        } else if (e.target.innerText === "Report") {
            history.push("/report")
        } else if (e.target.innerText === "Dashboard") {
            history.push("/")
        }
    }

    //drawer handler
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List >
                {menu.map((item, index) => (
                    <ListItem button key={index} onClick={(e) => { HandelClick(e) }}>
                        <ListItemText primary={item?.Text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    // const container = window !== undefined ? () => window().document.body : undefined;

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
        const checkinTimeStamp = attendance && attendance[currentYear] && attendance[currentMonth] && attendance[currentYear][currentMonth][today]?.checkedin
        if (checkinTimeStamp) {
            setCheckin(true)
        }

        const start = Date.now();
        let UID = firebase.auth().currentUser?.uid
        firebase.database().ref(`Attendance/${UID}/${currentYear}/${currentMonth}/${today}`).set({
            checkedin: start,

        })

        firebase.database().ref(`Users/${UID}`).update({
            checkedin: start,

        })
    }

    const Checkout = (e) => {
        const start = Date.now();

        let UID = firebase.auth().currentUser?.uid
        firebase.database().ref(`Attendance/${UID}/${currentYear}/${currentMonth}/${today}`).update({
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
                    dispatch(loadingAction(false))
                })

            }
            else dispatch(loadingAction(false))

        });
        // eslint-disable-next-line
    }, [loading])

    if (loading) {
        return <p>...Loading</p>
    }

    // console.log("user details are ",userDetails)
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={(userDetails.firstName) ? classes.appBar : classes.appBarCustom} >
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={userDetails.firstName ? classes.menuButton : classes.menuButtonCustom}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Attendance Management System &nbsp;&nbsp;&nbsp;</Typography>


                    {userDetails?.firstName ? <span >

                        {userDetails.role !== "Admin" && userDetails.role !== "user" && userDetails.role === "authorized" ?
                            (attendance && attendance[currentYear] && attendance[currentMonth] && attendance[currentYear][currentMonth][today]?.checkedin && !(attendance[currentYear][currentMonth][today].checkedout) ?

                                < Button variant="contained" onClick={((e) => Checkout(e))} className={classes.checkBtn}>Check out</Button> :
                                <Button variant="contained" className={classes.checkBtn} disabled={attendance && attendance[currentYear] && attendance[currentMonth] && attendance[currentYear][currentMonth][today]?.checkedout} onClick={((e) => Checkin(e))} >Check in</Button>
                            )

                            : null}


                        <IconButton className={classes.dp}
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

            {!userDetails.firstName ? <></>
                :

                <div style={{ width: "inherit" }}>
                    <nav className={classes.drawer} aria-label="mailbox folders">
                        <Hidden smUp implementation="css">
                            <Drawer
                                // container={container}
                                variant="temporary"
                                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                ModalProps={{
                                    keepMounted: true,
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <div className={classes.main}>
                            {children}
                        </div>
                    </main>
                </div>
            }
        </div>
    );
}


export default Layout;