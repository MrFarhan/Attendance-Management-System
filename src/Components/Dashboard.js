import React, { useState, useEffect } from 'react'
import MenuAppBar from './Appbar/Appbar'
import "../App.css"
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import firebase from "firebase"
// import { useHistory } from "react-router-dom"
// import { useDispatch, useSelector } from 'react-redux'
// import { userDetailsAction } from '../Redux/Actions'

export const Dashboard = () => {
    const state = useSelector((state) => state.userDetails)
    const loading = useSelector((val) => val.loading)
    // const [loading, setLoading] = useState(false)

    // var user = firebase.auth().currentUser;
    // let history = useHistory()
    // const state = useSelector((userDetails) => userDetails.userDetails)
    // const [loading, setLoading] = useState(true)
    // // console.log(state, "stateeeeeeeeeeeee")
    // // const [userDetails, setUserDetails] = useState()

    // useEffect(() => {
    //     if (!loading && !state) return history.push("/")
    // }, [])


    // let dispatch = useDispatch()

    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged(function (user) {
    //         if (user) {
    //             const useruid = user.uid
    //             setLoading(true)
    //             firebase.database().ref(`Users/${useruid}/`).on("value", (res) => {
    //                 console.log(res.val(), "userDetails in dashboard dispatch")
    //                 // setUserDetails(res.val())
    //                 dispatch(userDetailsAction(res.val()))
    //                 history.push("/dashboard")
    //                 setLoading(false)
    //             })
    //         } else {
    //             history.push("/")
    //         }
    //     });
    // }, [])
    // if (loading) {
    //     return <Redirect to="/dashboard" />
    // }

    useEffect(() => {
        console.log("use effect in dashboard")
    }, [])

    if (!loading && !state) return <Redirect to="/" />

    return (

        <div className="dashboardmain">
            <MenuAppBar />

        </div>
    )
}
