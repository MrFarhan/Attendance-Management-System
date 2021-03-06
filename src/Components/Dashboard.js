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
import Layout from './Layout';
import { Form, Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from "moment"

require("datejs")




const useStyles = makeStyles((theme) => ({

    signupFormMain: {
        width: "100%",
        justifyContent: "center",
        [theme.breakpoints.up('xl')]: {
            width: `70%`,
            display: "flex",
            justifyContent: "center",
            marginTop: "5em"

        },

    },
    signupForm: {
        width: `70%`,
        justifyContent: "center",
        [theme.breakpoints.up('xl')]: {
            width: `70%`
        },

    },
    toolbar: theme.mixins.toolbar,
}));



var today = new Date().toLocaleString().split(",")[0].replaceAll("/", "-");
// console.log("tday is ", today)
var currentMonth = new Date().getMonth();
currentMonth = currentMonth + 1

var currentYear = new Date().getFullYear()


export const Dashboard = () => {

    const [ISODate, setISODate] = useState()
    const [pcTimeError, setpcTimeError] = useState()

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    // const [today, setToday] = useState()

    let dispatch = useDispatch()
    const state = useSelector((state) => state)
    const userDetails = state.userDetails
    const allUserDetails = state.allUserDetails
    const [selectedUser, updateSelectedUser] = useState({})
    let attendance = state.attendance
    // eslint-disable-next-line
    const [totalHr, setTotalhr] = useState(0)
    const checkinTimeStamp = attendance && attendance[currentYear] && attendance[currentYear][currentMonth] && attendance[currentYear][currentMonth][today] && attendance[currentYear][currentMonth][today]?.checkedin
    // eslint-disable-next-line
    var checkinTime = checkinTimeStamp ? new Date(checkinTimeStamp).toLocaleTimeString() : false
    const checkoutTimeStamp = attendance && attendance[currentYear] && attendance[currentYear][currentMonth] && attendance[currentYear][currentMonth][today]?.checkedout
    // eslint-disable-next-line
    var checkoutTime = checkoutTimeStamp ? new Date(checkoutTimeStamp).toLocaleTimeString() : false

    useEffect(() => {
        // console.log("responss is ");
        async function isodate() {
            await axios.get('http://worldclockapi.com/api/json/utc/now').then((res) => {
                return setISODate(moment(res.data["currentDateTime"]).format("dddd, MMMM Do YYYY, h:mm"))
                // console.log("responss is ", moment(res.data["currentDateTime"]).format("dddd, MMMM Do YYYY, h:mm"));
            })
        }
        isodate()
    }, [])

    useEffect(() => {
        if (ISODate !== moment(new Date()).format("dddd, MMMM Do YYYY, h:mm") || !ISODate) {
            setpcTimeError(true)
            console.log("check your PC Time")
            // var today = new Date().toLocaleString().split(",")[0].replaceAll("/", "-");
        } else setpcTimeError(false)

    }, [pcTimeError])
    // firebase.database().ref('currentTime/').update({ time: firebase.database.ServerValue.TIMESTAMP })
    //     .then(function (data) {
    //         firebase.database().ref('currentTime/')
    //             .once('value')
    //             .then(function (data) {

    //                 setToday(data.val()['time'])
    //                 // t = t+1000
    //                 console.log('server time: ', moment(today).format("M-DD-YYYY"));

    //             }, function serverTimeErr(err) {
    //                 console.log('coulnd nt reach to the server time !');
    //             });
    //     }, function (err) {
    //         console.log('set time error:', err)
    //     });

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

    const axios = require('axios').default;


    useEffect(() => {
        const checkinTimeStamp = attendance && attendance[currentYear] && attendance[currentYear][currentMonth] && attendance[currentYear][currentMonth][today]?.checkedin
        const checkoutTimeStamp = attendance && attendance[currentYear] && attendance[currentYear][currentMonth] && attendance[currentYear][currentMonth][today]?.checkedout
        // var checkoutTime = new Date(checkoutTimeStamp).toString("hh:mm A")
        var checkoutTime = new Date(checkoutTimeStamp).toLocaleTimeString()
        var totalTime = checkoutTimeStamp - checkinTimeStamp
        var hourWorked = (totalTime / (1000 * 3600)).toFixed(2)
        // var hourWorked = (hourWorkedMinutes / 60).toFixed(15)
        console.log("hourWorked are : ", hourWorked)
        if (hourWorked) {
            setTotalhr(hourWorked)
        }
    }, [attendance, totalHr, checkoutTimeStamp])

    if (!loading && !userDetails) history.push("/")
    // eslint-disable-next-line
    var data = Object.values(allUserDetails)

    const UnBlock = (e) => {
        firebase.database().ref(`Users/${e}`).update({
            role: "Authorized"
        })
        return console.log("e.target.value", e)
    }

    const Block = (e) => {
        firebase.database().ref(`Users/${e}`).update({
            role: "Blocked"
        })
        return console.log("e.target.value", e)
    }


    const Verified = (e) => {
        firebase.database().ref(`Users/${e}`).update({
            isVerified: true
        })
        return console.log("e.target.value", e)
    }

    function EditProfile(e) {
        updateSelectedUser(e)
        return (
            <>{handleShow()}</>
        );
    }
    const dp = selectedUser?.dp

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: selectedUser.firstName,
            lastName: selectedUser.lastName,
            email: selectedUser.email,
            cNumber: selectedUser.cNumber,
            password: selectedUser?.password,
            gender: selectedUser?.gender,
            dateofBirth: selectedUser?.dateofBirth,
            accountCreatedOn: selectedUser?.accountCreatedOn

        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            dateofBirth: Yup.date(),
            gender: Yup.mixed()
                .oneOf(['Male', 'Female'], "please select your gender"),
            cNumber: Yup.number()

        }),
        onSubmit: values => {
            // console.log(JSON.stringify(values, null, 2));
            // UpdateFunc(values)
        },
    });
    { console.log("pc error is ", pcTimeError) }
    // if (!loading && !userDetails) history.push("/")
    return (

        <Layout >
            <div style={{ marginTop: "3em" }} >
                {userDetails && userDetails?.isVerified && userDetails?.role === "Authorized" ?

                    <div>

                        <TableContainer component={Paper}>
                            {/* < span style={{ color: "red" }}> {pcTimeError && pcTimeError.legth ? "CHECK YOUR PC TIME TO ENABLE CHECK-IN BUTTON" : "all good go head and enjoy"}</span> */}
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
                                    <TableCell align="right">{checkinTime && checkoutTimeStamp ? `${totalHr} hours` : "0 Hours"}</TableCell>
                                    <TableCell align="right">12 Hours</TableCell>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    : userDetails?.role === "Admin" ?
                        //modal to be shown on view profile 
                        < div className={classes.table}>
                            <Modal show={show} onHide={handleClose} animation={false} centered style={{ marginTop: "50px" }}>
                                <Modal.Header closeButton>
                                    <Modal.Title>User Profile</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <div className={classes.signupFormMain} >
                                        <Form onSubmit={formik.handleSubmit} className={classes.signupForm}>
                                            <div className="mb-3">
                                                {selectedUser?.dp?.length > 2 ? <img src={dp} className="profilePagePic" alt="Profile pic" /> : <h6>NO DP</h6>}
                                            </div>

                                            <Form.Group>
                                                <Form.Label className="labels" htmlFor="firstName">First Name</Form.Label>
                                                <Form.Control id="firstName" type="text" placeholder="Enter email" {...formik.getFieldProps('firstName')} disabled />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label className="labels" htmlFor="lastName">Last Name</Form.Label>
                                                <Form.Control id="lastName" type="text" placeholder="Enter email" {...formik.getFieldProps('lastName')} disabled />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label className="labels" htmlFor="email">Email address</Form.Label>
                                                <Form.Control id="email" type="email" placeholder="Enter email" {...formik.getFieldProps('email')} disabled />
                                            </Form.Group>


                                            <Form.Group>
                                                <Form.Label className="labels" htmlFor="cNumber">Phone Number</Form.Label>
                                                <Form.Control id="cNumber" type="number" placeholder="Enter your mobile number" {...formik.getFieldProps('cNumber')} disabled />
                                            </Form.Group>

                                            <Form.Group >
                                                <Form.Label className="labels" htmlFor="dateofBirth">Select your date of birth</Form.Label>
                                                <Form.Control id="dateofBirth" type="date" placeholder="Select your date of birth" {...formik.getFieldProps('dateofBirth')} disabled />
                                            </Form.Group>

                                            <Form.Group style={{ display: "flex" }} {...formik.getFieldProps('gender')} >
                                                <Form.Label style={{ marginRight: "1rem" }}>Gender</Form.Label>
                                                <Form.Check style={{ justifyContent: "flex-start" }}
                                                    type="radio"
                                                    label="Male"
                                                    name="gender"
                                                    id="Male"
                                                    value="Male"
                                                    checked={formik?.values?.['gender'] === 'Male'} disabled

                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Female"
                                                    name="gender"
                                                    id="Female"
                                                    value="Female"
                                                    checked={formik?.values?.['gender'] === 'Female'} disabled

                                                />
                                            </Form.Group>

                                            <Form.Group >
                                                <Form.Label className="labels" htmlFor="accountCreatedOn">Account created on :</Form.Label>
                                                <Form.Control id="accountCreatedOn" type="text" {...formik.getFieldProps('accountCreatedOn')} disabled />
                                            </Form.Group>

                                            <Button variant="secondary" onClick={handleClose}>  Close</Button>
                                        </Form>

                                    </div >

                                </Modal.Body>
                            </Modal>


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

                                        {data.filter(item => item.role !== "Admin").map((item, index) => (
                                            <TableRow key={index} >
                                                <TableCell >{item.firstName}</TableCell>
                                                <TableCell ><a href={`mailto:${item.email}`} style={{ textDecoration: "none", color: "black" }}>{item.email}</a></TableCell>
                                                <TableCell >{item.gender}</TableCell>
                                                <TableCell ><a href={`tel:${item.cNumber}`} style={{ textDecoration: "none", color: "black" }}>{item.cNumber}</a></TableCell>
                                                <TableCell >

                                                    {item.role !== "Blocked" ? <Button variant="danger" onClick={() => Block(item.uid)} disabled={!item.isVerified}>Block</Button>
                                                        : <Button variant="danger" onClick={() => UnBlock(item.uid)} disabled={!item.isVerified}>Unblock</Button>}
                                                            &nbsp;
                                                        {item.isVerified ? <Button variant="warning" onClick={() => Verified(item.uid)} disabled={item.isVerified}> Verified</Button> : <Button variant="warning" onClick={() => Verified(item.uid)} disabled={item.isVerified}>Verify</Button>}


                                                </TableCell>
                                                <TableCell ><Button variant="light" onClick={() => EditProfile(item)}>View Profile</Button></TableCell>

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
