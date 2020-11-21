import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../App.css'
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';



export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(5, 'Password must be 5 or more then 5 characters Long ')
                .max(15, 'Must be 15 characters or less')
                .required('Required')
        }),
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
        },
    });

    let history = useHistory()

    const LoginFunc = () => {
       history.push("/dashboard")
    }


    const SignupFunc = () => {
        history.push("/signup")
    }

    return (
        <Form onSubmit={formik.handleSubmit} className="loginform">
            <Form.Group controlId="formBasicEmail">
                <Form.Label className="labels" htmlFor="email">Email address</Form.Label>
                <Form.Control className="inputs" id="email" type="email" placeholder="Enter email" {...formik.getFieldProps('email')} autoFocus />
                <span className="inputerror">  {formik.touched.email && formik.errors.email ? (
                    <div>{ formik.errors.email}</div>
                ) : null}</span>
            </Form.Group>


            <Form.Group controlId="formBasicPassword">
                <Form.Label className="labels">Password</Form.Label>
                <Form.Control className="inputs" id="password" type="password" placeholder="Password" {...formik.getFieldProps('password')} />
                <span className="inputerror">{formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}</span>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox" className="inputcheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={LoginFunc} > <FiLogIn />Login</Button>
            <Button variant="link" onClick={SignupFunc}>Don't have an account</Button>


        </Form>
    );
};