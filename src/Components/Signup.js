import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../App.css'
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import firebase from "firebase"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({

    appBarCustom: {
        [theme.breakpoints.up('sm')]: {
            width: `100%`,

        },
    },
    menuButtonCustom: {
        marginRight: theme.spacing(2),
        display: 'none',

    },
    signupFormMain: {
        marginTop: "5em",
        [theme.breakpoints.up('md')]: {
            width: `40%`,
            display: "flex",
            justifyContent: "center",
            marginTop: "5em"

        },

    },
    signupForm: {
        [theme.breakpoints.up('md')]: {
            width: `140%`,
        },

    },
    toolbar: theme.mixins.toolbar,
}));


export const Signup = () => {

    let history = useHistory()
    const legalAge = new Date.parse("-18year");
    const [signuperror, setSignuperror] = React.useState()
    // console.log("18 years back date is: ",legalAge)
    const phoneReg = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/




    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            cNumber: "",
            password: "",
            confirmPassword: "",
            gender: "",
            dateofBirth: "",
            acceptedTerms: false,

        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, 'Name should be 15 characters or less')
                .required('First Name is required'),
            lastName: Yup.string()
                .max(20, 'Last Name should be 20 characters or less')
                .required('Last Name is Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is Required'),
            password: Yup.string()
                .min(5, 'Password Must be 5 or more then 5 characters Long ')
                .max(15, 'Password Must be 15 characters or less')
                .required('Password is Required'),
            confirmPassword: Yup.string()
                .max(20, 'Confirm pasword Must also be 20 characters or less')
                .required('Required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            dateofBirth: Yup.date()
                .required('Date of brith is Required')
                .max(legalAge, "you must be eighteen years old"),
            gender: Yup.mixed()
                .required('Gender is Required')
                .oneOf(['Male', 'Female']),
            cNumber: Yup.string()
                .matches(phoneReg, 'Invalid format - Number must be at least 11 ')
                .required("Phone number is required")
                .max(11, "Phone number must be 11 charactors long"),
            acceptedTerms: Yup.boolean()
                .required("Kindly accept our terms and conditions to proceed with signup ")
                .oneOf([true], "Terms and condition acceptance is mandatory")
        }),
        onSubmit: values => {
            SignupFunc(values)
        },

    });
    var today = new Date().toISOString()

    const SignupFunc = (values) => {

        firebase.auth().createUserWithEmailAndPassword(values.email, values.password).then((res) => {
            let UID = firebase.auth().currentUser?.uid
            firebase.database().ref('Users/' + UID).set({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                cNumber: values.cNumber,
                gender: values.gender,
                dateofBirth: values.dateofBirth,
                isVerified: false,
                uid: UID,
                role: "Authorized",
                accountCreatedOn: today
            })
            history.push("/")

        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            setSignuperror(errorMessage)

            console.log(errorCode, "error code" + errorMessage, "error message")
            // ...
        });
    }


    const LoginFunc = () => {
        history.push("/")
    }
    const classes = useStyles();

    return (
        <div className={classes.signupFormMain} >

            <AppBar position="fixed" className={classes.appBarCustom} >
                <Toolbar>

                    <Typography variant="h6" noWrap>
                        Attendance Management System &nbsp;&nbsp;&nbsp;</Typography>
                </Toolbar>
            </AppBar>
            <Form onSubmit={formik.handleSubmit} className={classes.signupForm}>
                <Form.Group>
                    <Form.Label className="labels" htmlFor="firstName">First Name</Form.Label>
                    <Form.Control id="firstName" type="text" placeholder="Enter First Name" {...formik.getFieldProps('firstName')} autoFocus />
                    <span className="inputerror">  {formik.touched.firstName && formik.errors.firstName ? (
                        <div>{formik.errors.firstName}</div>
                    ) : null}</span>
                </Form.Group>

                <Form.Group>
                    <Form.Label className="labels" htmlFor="lastName">Last Name</Form.Label>
                    <Form.Control id="lastName" type="text" placeholder="Enter Last Name" {...formik.getFieldProps('lastName')} />
                    <span className="inputerror">  {formik.touched.lastName && formik.errors.lastName ? (
                        <div>{formik.errors.lastName}</div>
                    ) : null}</span>
                </Form.Group>

                <Form.Group>
                    <Form.Label className="labels" htmlFor="email">Email address</Form.Label>
                    <Form.Control id="email" type="email" placeholder="Enter Email Address" {...formik.getFieldProps('email')} {...formik.handleChange}
                        onFocus={() => {
                            setSignuperror("");
                        }}
                    />
                    <span className="inputerror">  {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}</span>

                    <span className="inputerror">  {formik.touched.email && signuperror && signuperror.length ? (
                        <div>{signuperror}</div>
                    ) : null}</span>

                </Form.Group>

                <Form.Group>
                    <Form.Label className="labels" htmlFor="cNumber">Phone Number</Form.Label>
                    <Form.Control id="cNumber" type="number" placeholder="Enter your mobile number" {...formik.getFieldProps('cNumber')} />
                    <span className="inputerror">  {formik.touched.cNumber && formik.errors.cNumber ? (
                        <div>{formik.errors.cNumber}</div>
                    ) : null}</span>
                </Form.Group>

                <Form.Group {...formik.getFieldProps('dateofBirth')}>
                    <Form.Label className="labels" htmlFor="dateofBirth">Select your date of birth</Form.Label>
                    <Form.Control id="dateofBirth" type="date" placeholder="Select your date of birth" />
                    <span className="inputerror">  {formik.touched.dateofBirth && formik.errors.dateofBirth ? (
                        <div>{formik.errors.dateofBirth}</div>
                    ) : null}</span>
                </Form.Group>


                <Form.Group style={{ display: "flex" }} {...formik.getFieldProps('gender')} >
                    <Form.Label style={{ marginRight: "1rem" }}>
                        Gender
                </Form.Label>
                    <Form.Check style={{ justifyContent: "flex-start" }}
                        type="radio"
                        label="Male"
                        name="gender"
                        id="Male"
                        value="Male"
                    />
                    <Form.Check
                        type="radio"
                        label="Female"
                        name="gender"
                        id="Female"
                        value="Female"
                    />
                    <div>                <br /><div className="inputerror" style={{ marginLeft: "-13em" }}>  {formik.touched.gender && formik.errors.gender ? (
                        <div>{formik.errors.gender}</div>
                    ) : null}</div></div>
                </Form.Group>

                <Form.Group>
                    <Form.Label className="labels">Password</Form.Label>
                    <Form.Control id="password" type="password" placeholder="Password" {...formik.getFieldProps('password')} />
                    <span className="inputerror">{formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}</span>
                </Form.Group>

                <Form.Group>
                    <Form.Label className="labels">Confirm Password</Form.Label>
                    <Form.Control id="confirmPassword" type="password" placeholder="confirm Password" {...formik.getFieldProps('confirmPassword')} />
                    <span className="inputerror">{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div>{formik.errors.confirmPassword}</div>
                    ) : null}</span>
                </Form.Group>

                <Form.Group>
                    <div>
                        <Form.Check style={{ display: "flex", marginTop: "0.199rem" }} type="checkbox" label="I hereby agree all terms of services " {...formik.getFieldProps('acceptedTerms')} />
                        <span className="inputerror">{formik.touched.acceptedTerms && formik.errors.acceptedTerms ? (
                            <div>{formik.errors.acceptedTerms}</div>
                        ) : null}</span></div>
                </Form.Group>

                <Button variant="primary" type="submit" > Sign up</Button>
                <Button variant="link" type="button" onClick={LoginFunc}>Already have an account</Button>
            </Form>
        </div>
    );
};