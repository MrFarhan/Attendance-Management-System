import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line 
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line 
import firebase from "firebase"
// import { Attendance } from './Components/Attendance';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import "../App.css"
import { useHistory } from "react-router-dom"
import logo from "./logo.png"


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

export const Sidebar = () => {
    const loading = useSelector((val) => val.loading)
    const classes = useStyles();
    const userDetails = useSelector((state) => state.userDetails)
    let history = useHistory()


    var menu = [{ "Text": "Attendance", "route": "attendance" }, { "Text": "Report", "route": "report" }]

    const HandelClick = (e) => {
        // console.log(e.target.innerText, "e ")
        if (e.target.innerText === "Attendance") {
            history.push("/attendance")
            // console.log("Attendance")
        } else if (e.target.innerText === "Report") {
            history.push("/report")
            console.log("Report")
        }
    }


    if (loading) {
        return <p>...Loading</p>
    }

    const clickHandle = () => {
        history.push("/dashboard")
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            ><img src={logo} className="logo" onClick={clickHandle} />
                <div className={classes.toolbar} />
                <Divider />

                <List>
                    {menu.map((item, index) => (
                        <ListItem button key={index} onClick={(e) => { HandelClick(e) }}>
                            <ListItemText primary={item?.Text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>


    )
}
