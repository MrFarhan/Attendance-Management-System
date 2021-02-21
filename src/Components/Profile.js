import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "../App.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import firebase from "firebase"
import pic from "./Circle-icons-profile.svg"


export const Profile = () => {
    const userDetails = useSelector((state) => state.userDetails)
    const loading = useSelector((val) => val.loading)
    let history = useHistory()
    const [dp, uploadDp] = useState(userDetails?.dp || pic)

    const formik = useFormik({
        initialValues: {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            cNumber: userDetails.cNumber,
            password: userDetails.password,
            gender: userDetails.gender,
            dateofBirth: userDetails.dateofBirth,

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
                .required('Required')
                .oneOf(['Male', 'Female'], "please select your gender"),
            cNumber: Yup.number()

        }),
        onSubmit: values => {
            // console.log(JSON.stringify(values, null, 2));
            UpdateFunc(values)
        },
    });

    const UpdateFunc = (values) => {
        let UID = firebase.auth().currentUser?.uid

        firebase.database().ref("Users/" + UID).update({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            cNumber: values.cNumber,
            gender: values.gender,
            dateofBirth: values.dateofBirth,
            dp: dp,
            isVerified: false
        }).then().catch((e) => console.log(e, "error"))
        history.push("/")
    }

    const imgUpload = (e) => {
        let UID = firebase.auth()?.currentUser?.uid
        var file = e.target.files[0]
        firebase.storage().ref(`Users/${UID}/profilePic`).put(file).then(() => {
            uploadDp(file)
        }).then(() => {
            firebase.storage().ref(`Users/${UID}/profilePic`).getDownloadURL().then(urlImg => {
                uploadDp(String(urlImg))

            })
        }).catch((e) => console.log(e.message, "error in profile pic put"))
    }

    if (!loading && !userDetails) history.push("/")

    return (
        <div className="profileMain">
            <div >
                <Form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <Form.File >
                            <img src={dp} id="formcheck-api-regular" alt="Profile pic" style={{ marginBottom: "0.7em", borderRadius: "4em" }} />

                            <Form.File.Input onChange={((e) => imgUpload(e))} />

                        </Form.File>
                    </div>


                    <Form.Group>
                        <Form.Label className="labels" htmlFor="firstName">First Name</Form.Label>
                        <Form.Control id="firstName" type="text" placeholder="Enter email" {...formik.getFieldProps('firstName')} autoFocus />
                        <span className="inputerror">  {formik.touched.firstName && formik.errors.firstName ? (
                            <div>{formik.errors.firstName}</div>
                        ) : null}</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="labels" htmlFor="lastName">Last Name</Form.Label>
                        <Form.Control id="lastName" type="text" placeholder="Enter email" {...formik.getFieldProps('lastName')} />
                        <span className="inputerror">  {formik.touched.lastName && formik.errors.lastName ? (
                            <div>{formik.errors.lastName}</div>
                        ) : null}</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="labels" htmlFor="email">Email address</Form.Label>
                        <Form.Control id="email" type="email" placeholder="Enter email" {...formik.getFieldProps('email')} />
                        <span className="inputerror">  {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}</span>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label className="labels" htmlFor="cNumber">Phone Number</Form.Label>
                        <Form.Control id="cNumber" type="number" placeholder="Enter your mobile number" {...formik.getFieldProps('cNumber')} />
                        <span className="inputerror">  {formik.touched.cNumber && formik.errors.cNumber ? (
                            <div>{formik.errors.cNumber}</div>
                        ) : null}</span>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label className="labels" htmlFor="dateofBirth">Select your date of birth</Form.Label>
                        <Form.Control id="dateofBirth" type="date" placeholder="Select your date of birth" {...formik.getFieldProps('dateofBirth')} disabled />
                        <span className="inputerror">  {formik.touched.dateofBirth && formik.errors.dateofBirth ? (
                            <div>{formik.errors.dateofBirth}</div>
                        ) : null}</span>
                    </Form.Group>



                    <Form.Group style={{ display: "flex" }} {...formik.getFieldProps('gender')} >
                        <Form.Label style={{ marginRight: "1rem" }}>
                            Gender
                </Form.Label>
                        {/* <div  > */}
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
                        {/* </div> */}
                        <div>                <br /><div className="inputerror" style={{ marginLeft: "-13em" }}>  {formik.touched.gender && formik.errors.gender ? (
                            <div>{formik.errors.gender}</div>
                        ) : null}</div></div>
                    </Form.Group>
                    <Button variant="primary" type="submit" > Update</Button>
                </Form>

            </div >
        </div >
    )
}
