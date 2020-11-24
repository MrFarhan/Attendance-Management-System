import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase'
import { useDispatch} from 'react-redux';
import { userDetailsAction } from '../../Redux/Actions';
require('firebase/auth')

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function AppbarBody() {
    const [userDetails, setUserDetails] = useState(false)
    let dispatch = useDispatch()

    useEffect(() => {
        firebase.database().ref(`Users/${firebase.auth().currentUser?.uid}/`).on("value", (res) => {
            setUserDetails(res.val())
            dispatch(userDetailsAction(res.val()))
            console.log(res.val(), "user details in appbar body ")
        })

    }, [])

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>Logedin as: {userDetails?.firstName} </Paper>

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
                {/* <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid> */}
            </Grid>
        </div>
    );
}
