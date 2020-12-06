import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line 
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line 
import firebase from "firebase"
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
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
 flexShrink: 0,
    // },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#3f51b5",
        color:"white"
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

}));

export const Sidebar = () => {
    const loading = useSelector((val) => val.loading)
    const classes = useStyles();
    let history = useHistory()


    var menu = [{ "Text": "Attendance", "route": "attendance" }, { "Text": "Report", "route": "report" }]

    const HandelClick = (e) => {
        if (e.target.innerText === "Attendance") {
            history.push("/attendance")
        } else if (e.target.innerText === "Report") {
            history.push("/report")
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
            <Drawer className="sidebar"
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <img src={logo} className="logo" onClick={clickHandle}  alt="company logo"/>
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
