// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import IconButton from '@material-ui/core/IconButton';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import { Button } from '@material-ui/core';
// import "../App.css"
// import pic from "./Circle-icons-profile.svg"
// import { useHistory } from "react-router-dom"
// import firebase from "firebase"
// import { userDetailsAction } from '../Redux/Actions';
// import { useDispatch, useSelector } from 'react-redux';
// import "../App.css"
// import { Test } from '../Test';

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//     },
//     appBar: {
//         width: `calc(100% - ${drawerWidth}px)`,
//         marginLeft: drawerWidth,
//     },
//     drawer: {
//         width: drawerWidth,
//         flexShrink: 0,
//     },
//     drawerPaper: {
//         width: drawerWidth,
//     },
//     // necessary for content to be below app bar
//     toolbar: theme.mixins.toolbar,
//     content: {
//         flexGrow: 1,
//         backgroundColor: theme.palette.background.default,
//         padding: theme.spacing(3),
//     },
// }));



// export const Dashboard = () => {
//     const classes = useStyles();
//     const userDetails = useSelector((state) => state.userDetails)
//     let dispatch = useDispatch()
//     const [anchorEl, setAnchorEl] = React.useState(false);
//     const [dp, setDp] = React.useState(userDetails?.dp || pic)
//     const [checkin, setCheckin] = React.useState(true)
//     let history = useHistory()


//     React.useEffect(() => {
//         setCheckin(false)


//     }, [userDetails.checkin])

//     const handleMenu = (event) => {
//         setAnchorEl(event.currentTarget);
//     };


//     const profileFunc = () => {
//         setAnchorEl(null);
//         history.push("/profile")

//     }
//     const LogoutFunc = () => {
//         setAnchorEl(null);
//         firebase.auth().signOut()
//         history.push("/")
//         dispatch(userDetailsAction(false))
//     }

//     const handleClose = () => {
//         setAnchorEl(null);

//     }

//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2, '0');
//     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = today.getFullYear();

//     today = mm + "-" + dd + "-" + yyyy;
//     console.log(today, "today")

//     const Checkin = (e) => {
//         setCheckin(true)
//         const start = Date.now();
//         const started = new Date(start)
//         console.log(started, "started")



//         let UID = firebase.auth().currentUser?.uid
//         firebase.database().ref(`Attendance/${UID}/${today}`).set({
//             checkedin: start
//         })
//     }

//     const Checkout = (e) => {
//         const start = Date.now();
//         const started = new Date(start)
//         console.log(started, "started")


//         let UID = firebase.auth().currentUser?.uid
//         firebase.database().ref(`Attendance/${UID}/${today}`).update({
//             checkedout: start
//         })
//         setCheckin(false)
//     }

//     const Attendance = () => {
//         history.push("attendance")
//         console.log("attendance clicked")
//     }



//     var menu = [{ "Text": "Attendance", "route": "attendance" }, { "Text": "Report", "route": "report" }]

//     const HandelClick = (e) => {
//         // console.log(e.target.innerText, "e ")
//         if (e.target.innerText === "Attendance") {
//             history.push("/attendance")
//             console.log("Attendance")
//         } else if (e.target.innerText === "Report") {
//             console.log("Report")
//         }
//     }

//     return <div className={classes.root}>
//         <CssBaseline />
//         <AppBar position="fixed" className={classes.appBar}>
//             <Toolbar>
//                 <Typography variant="h6" noWrap>
//                     Attendance management system
//             </Typography>
//                 <span className="appbarRightSide" >
//                     {checkin ? <Button variant="contained" onClick={((e) => Checkout(e))}>Check out</Button> : <Button variant="contained" onClick={((e) => Checkin(e))}>Check in</Button>}
//                     <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userDetails?.firstName}</span>

//                     <IconButton
//                         aria-label="account of current user"
//                         aria-controls="menu-appbar"
//                         aria-haspopup="true"
//                         onClick={handleMenu}
//                         color="inherit"
//                         height="2em"
//                     >
//                         <img src={dp} className="dpIcon" alt="profile " />
//                     </IconButton>

//                     <Menu
//                         id="menu-appbar"
//                         anchorEl={anchorEl}
//                         anchorOrigin={{
//                             vertical: 'top',
//                             horizontal: 'right',
//                         }}
//                         keepMounted
//                         transformOrigin={{
//                             vertical: 'top',
//                             horizontal: 'right',
//                         }}
//                         open={Boolean(anchorEl)}
//                         onClose={handleClose}
//                     >
//                         <MenuItem onClick={profileFunc}>Profile setting</MenuItem>
//                         <MenuItem onClick={LogoutFunc}>Log out</MenuItem>
//                     </Menu></span>
//             </Toolbar>
//         </AppBar>
//         <Drawer
//             className={classes.drawer}
//             variant="permanent"
//             classes={{
//                 paper: classes.drawerPaper,
//             }}
//             anchor="left"
//         >
//             <div className={classes.toolbar} />
//             <Divider />

//             <List>
//                 {menu.map((item, index) => (
//                     <ListItem button key={index} onClick={(e) => { HandelClick(e) }}>
//                         {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon onClick={Attendance} /> : <MailIcon />}</ListItemIcon> */}
//                         <ListItemText primary={item?.Text} />
//                     </ListItem>
//                 ))}
//             </List>
//         </Drawer>
//     </div>
// }


// // 



import { Appbar } from '../Components/Appbar';
import { Sidebar } from '../Components/Sidebar';
import "../App.css"


import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



export const Dashboard = () => {
    const userDetails = useSelector((state) => state.userDetails)
    let loading = userDetails?.loading;
    let history = useHistory()
    console.log("userdetails in dashboard", userDetails)

    if (!loading && !userDetails) history.push("/")
    console.log("profile comp redner")
    return (
        <div className="dashboard">
            {/* <Appbar />
            <Sidebar /> */}
            Dashboard here
        </div>
    )
}
