import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase'
import { useDispatch } from 'react-redux';
import { loadingAction, userDetailsAction } from '../../Redux/Actions';
import "../../App.css";
import { useHistory } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
// import date from 'date-and-time';
import SideNav from './SideNav';

require('firebase/auth')



const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


export default function AppbarBody() {
    let history = useHistory()
    let dispatch = useDispatch()
    // const pattern = date.compile('MMM D YYYY hh:mm:ss A');
    // let [cDate, setUdate] = useState()

    // useEffect(() => {
    //     setInterval(() => {
    //         setUdate(date.format(new Date(), pattern))
    //     }, 1000);
    //     console.log(cDate, "cDate")
    // }, [])
    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
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

    useEffect(() => {
        firebase.database().ref(`Users/${firebase.auth().currentUser?.uid}/`).on("value", (res) => {
            dispatch(loadingAction(false))
            dispatch(userDetailsAction(res.val()))
            history.push("/dashboard")
            console.log(res.val(), "user details in appbar body ")
        })
        // eslint-disable-next-line
    }, [])

    const classes = useStyles();

    return (

        // <Drawer
        //     className={classes.drawer}
        //     variant="permanent"
        //     classes={{
        //         paper: classes.drawerPaper,
        //     }}
        //     anchor="left"
        // >
        //     <div className={classes.toolbar} />
        //     <Divider />
        //     <List>
        //         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        //             <ListItem button key={text}>
        //                 <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
        //                 <ListItemText primary={text} />
        //             </ListItem>
        //         ))}
        //     </List>
        //     <Divider />
        //     <List>
        //         {['All mail', 'Trash', 'Spam'].map((text, index) => (
        //             <ListItem button key={text}>
        //                 <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
        //                 <ListItemText primary={text} />
        //             </ListItem>
        //         ))}
        //     </List>
        // </Drawer>

        <div className={classes.root + " mainappbarbody"} >
            {/* <span className="date-time"><b>Date: </b>{cDate}</span> */}

            <SideNav />

        </div>
    );
}
