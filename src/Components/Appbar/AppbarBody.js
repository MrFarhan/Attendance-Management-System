import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux';
import { loadingAction, userDetailsAction } from '../../Redux/Actions';
import "../../App.css";
import { useHistory } from 'react-router-dom';
import date from 'date-and-time';
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
    const state = useSelector((state) => state.userDetails)
    let history = useHistory()
    let dispatch = useDispatch()
    const pattern = date.compile('MMM D YYYY hh:mm:ss A');
    let [cDate, setUdate] = useState()

    useEffect(() => {
        
        setInterval(() => {
            setUdate(date.format(new Date(), pattern))
        }, 1000);

        console.log(cDate, "cDate")
        
    }, [])
    

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


    // date.parse('Mar 22 2019 2:54:21 PM', pattern);
    // date.parse('Jul 27 2019 4:15:24 AM', pattern);
    // date.parse('Dec 25 2019 3:51:11 AM', pattern);



    return (
        <div className={classes.root} className="mainappbarbody">
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Paper className="firstpaper" ><b>Date: </b>{cDate}</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Main Body</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>Sub section (if any)</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>Sub section (if any)</Paper>
                </Grid>
            </Grid>
        </div>
    );
}
