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
import { userDetailsAction, loadingAction, allUserDetailsAction } from '../Redux/Actions';
import Layout from './Layout';
import { Button } from 'react-bootstrap';
require("datejs")


const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    // table: {
    //     [theme.breakpoints.up('md')]: {
    //         width: `calc(100% - ${drawerWidth}px)`,
    //         marginLeft: `0px`,            
    //     },
    // },
}));


var today = new Date().toString("ddMMyyyy")
// console.log("today is: ", today)


export const Dashboard = () => {

    let dispatch = useDispatch()
    const state = useSelector((state) => state)
    const userDetails = state.userDetails
    const allUserDetails = state.allUserDetails
    let attendance = state.attendance
    // eslint-disable-next-line
    const [totalHr, setTotalhr] = useState(0)
    // const [Block, setBlock] = useState()
    const checkinTimeStamp = attendance && attendance[today]?.checkedin
    // eslint-disable-next-line
    var checkinTime = checkinTimeStamp ? new Date(checkinTimeStamp).toString("hh:mm") : false
    const checkoutTimeStamp = attendance && attendance[today]?.checkedout
    // eslint-disable-next-line
    var checkoutTime = checkoutTimeStamp ? new Date(checkoutTimeStamp).toString("hh:mm") : false


    // eslint-disable-next-line
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
        if (Number(checkoutTime)) {
            setTotalhr(hourWorked)
        }
    }, [attendance])


    if (!loading && !userDetails) history.push("/")
    // eslint-disable-next-line
    var data = Object.values(allUserDetails)

    const UnBlock = (e) => {
        firebase.database().ref(`Users/${e}`).update({
            role: "user"
        })
        return console.log("e.target.value", e)
    }

    const Block = (e) => {
        firebase.database().ref(`Users/${e}`).update({
            role: "Blocked"
        })


        return console.log("e.target.value", e)
    }

    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged(function (user) {
    //         if (user) {
    //             firebase.database().ref(`Users/`).on("value", (res) => {
    //                 dispatch(allUserDetailsAction(res.val()))
    //                 // console.log(res.val(), "all user deta from firebase in app")
    //             })
    //         }
    //     });
    //     // eslint-disable-next-line
    // }, [Block])

    const Verified = (e) => {
        firebase.database().ref(`Users/${e}`).update({
            isVerified: true
        })


        return console.log("e.target.value", e)
    }

    return (

        <Layout >
            <div style={{ marginTop: "3em" }} >
                {userDetails?.role === "authorized" ?
                    <div>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
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
                    : userDetails.role === "Admin" ?
                        < div className={classes.table}>
                            <TableContainer >
                                <Table style={{ overflow: "scroll", minWidth: "45em" }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell >First Name</TableCell>
                                            <TableCell >Email address</TableCell>
                                            <TableCell >Gender</TableCell>
                                            <TableCell >Contact Number</TableCell>
                                            <TableCell >Action</TableCell>
                                            <TableCell >View Profile</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {data.map((item, index) => (
                                            <TableRow key={index} >
                                                <TableCell >{item.firstName}</TableCell>
                                                <TableCell ><a href={`mailto:${item.email}`} style={{ textDecoration: "none", color: "black" }}>{item.email}</a></TableCell>
                                                <TableCell >{item.gender}</TableCell>
                                                <TableCell ><a href={`tel:${item.cNumber}`} style={{ textDecoration: "none", color: "black" }}>{item.cNumber}</a></TableCell>
                                                <TableCell >

                                                    {item.role !== "Blocked" ? <Button variant="danger" onClick={() => Block(item.uid)}>Block</Button>
                                                        : <Button variant="danger" onClick={() => UnBlock(item.uid)}>Unblock</Button>}
                                                            &nbsp;
                                                        {item.isVerified ? <Button variant="warning" onClick={() => Verified(item.uid)} disabled={item.isVerified}> Verified</Button>:<Button variant="warning" onClick={() => Verified(item.uid)} disabled={item.isVerified}>Not Verified</Button>}

                                                    {/* {
                                                        item.isVerified ? <Button variant="warning" onClick={() => Verified(item.uid)}>Verified</Button> :
                                                            <Button variant="warning" onClick={() => Verified(item.uid)}>Not Verified</Button>
                                                    } */}



                                                </TableCell>
                                                <TableCell ><Button variant="light">Edit Profile</Button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </div> : <div><h3>Kindly ask your administrator to authorize your account</h3></div>}
            </div>

        </Layout >

    )
}
