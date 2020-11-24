import React, { useEffect } from 'react'
import MenuAppBar from './Appbar/Appbar'
import "../App.css"
import firebase from "firebase"
import { useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { userDetailsAction } from '../Redux/Actions'

export const Dashboard = () => {
    var user = firebase.auth().currentUser;
    let history = useHistory()
    // const [userDetails, setUserDetails] = useState()

    useEffect(() => {
        if (user) return history.push("/dashboard")
        else return history.push("/")
    }, [user, history])


    let dispatch = useDispatch()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const useruid = user.uid
                firebase.database().ref(`Users/${useruid}/`).on("value", (res) => {
                    console.log(res.val(), "userDetails in dashboard dispatch")
                    // setUserDetails(res.val())
                    dispatch(userDetailsAction(res.val()))
                    history.push("/dashboard")

                })
            } else {
                history.push("/")
            }
        });
    }, [])

    return (
        <div className="dashboardmain">
            <MenuAppBar />

        </div>
    )
}
