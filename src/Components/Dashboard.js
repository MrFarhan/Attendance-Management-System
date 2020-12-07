import React, { useEffect, useState } from 'react'
import "../App.css"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import firebase from "firebase"
import { userDetailsAction, loadingAction } from '../Redux/Actions';
require("datejs")


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


var today = new Date().toString("ddMMyyyy")

console.log(today, "today")

export const Dashboard = () => {
    let dispatch = useDispatch()
    const userDetails = useSelector((state) => state.userDetails)
    let attendance = useSelector((state) => state.attendance)
    const [totalHr, setTotalhr] = useState(0)
    const checkinTimeStamp = attendance && attendance[today]?.checkedin
    var checkinTime = checkinTimeStamp ? new Date(checkinTimeStamp).toString("hh:mm") : false

    const checkoutTimeStamp = attendance && attendance[today]?.checkedout
    var checkoutTime = checkoutTimeStamp ? new Date(checkoutTimeStamp).toString("hh:mm") : false


    const classes = useStyles();
    let history = useHistory()
    let loading = userDetails?.loading;
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


    useEffect(() => {

        const checkinTimeStamp = attendance && attendance[today]?.checkedin
        const checkoutTimeStamp = attendance && attendance[today]?.checkedout
        var checkoutTime = new Date(checkoutTimeStamp).toString("hh:mm")
        var totalTime = checkinTimeStamp - checkoutTimeStamp
        var hourWorkedMinutes = Math.floor(Math.abs(totalTime / 60000)).toFixed(2)
        var hourWorked = (hourWorkedMinutes / 60).toFixed(15)
        console.log("total time is ", hourWorked)
        if (Number(checkoutTime)) {
            setTotalhr(hourWorked)
        }
    }, [attendance])


    if (!loading && !userDetails) history.push("/")
    return (
        <div className="dashboard">

            {userDetails.role === "user" ?
                <div>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Check in</TableCell>
                                    <TableCell align="right">Check out</TableCell>
                                    <TableCell align="right">Total Time</TableCell>
                                    <TableCell align="right">Required Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell align="right">{checkinTime ? checkinTime : "Not Checked in"}</TableCell>
                                <TableCell align="right">{checkoutTimeStamp ? checkoutTime : "-"}</TableCell>
                                <TableCell align="right">{totalHr} hours</TableCell>
                                <TableCell align="right">12 Hours</TableCell>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                :
                <div>Admin Dashboard here</div>}
        </div>
    )
}
