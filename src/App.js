import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line 
import firebaseData from "./firebase" //used for firebase initialization
// eslint-disable-next-line 
import firebase from "firebase"
import { attendanceAction, loadingAction, userDetailsAction, allUserDetailsAction,allUserAttendanceAction } from './Redux/Actions';

// import componenets
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import { Test } from './Test';
import { Profile } from './Components/Profile';
import { Attendance } from './Components/Attendance';
import { Dashboard } from './Components/Dashboard';
import { Report } from './Components/Report';
import { Appbar } from './Components/Appbar';
import { Sidebar } from './Components/Sidebar';


function App() {

  const loading = useSelector((val) => val.loading)
  let dispatch = useDispatch()


  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const useruid = user.uid
        firebase.database().ref(`Users/${useruid}/`).on("value", (res) => {
          dispatch(userDetailsAction(res.val()))
          dispatch(loadingAction(false))
        })
      }
      else {
        dispatch(userDetailsAction(false))
        dispatch(loadingAction(false))
      }

    });
    // eslint-disable-next-line
  }, [])


  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const useruid = user.uid
        firebase.database().ref(`Attendance/${useruid}/`).on("value", (res) => {
          console.log(res?.val(), "firebase value")
          console.log(res?.val()?.role, "firebase value")
          dispatch(attendanceAction(res.val()))
        })
      }
      else {
        dispatch(attendanceAction(false))
      }

    });
    // eslint-disable-next-line
  }, [])


  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase.database().ref(`Users/`).on("value", (res) => {
          dispatch(allUserDetailsAction(res.val()))
          // console.log(res.val(), "all user deta from firebase in app")
        })
      }
    });
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase.database().ref(`Attendance/`).on("value", (res) => {
          dispatch(allUserAttendanceAction(res.val()))
          // console.log(res.val(), "all user deta from firebase in app")
        })
      }
    });
    // eslint-disable-next-line
  }, [])


  if (loading) {
    return <p>...Loading</p>
  }


  return (
    <Router>
      <div className="App">
        <Route path={["/", '/dashboard', "/signup", '/dashboard/profile', '/attendance', '/test', '/report']} render={(() => <Appbar />)} />
        <Route path={['/dashboard', "/signup", '/dashboard/profile', '/attendance', '/test', '/report']} render={(() => <Sidebar />)} />
        <Switch>
          <Route exact path="/"><Login /></Route>
          <Route exact path="/dashboard"><Dashboard /></Route>
          <Route path="/signup"><Signup /></Route>
          <Route exact path="/dashboard/profile"><Profile /></Route>
          <Route path="/attendance"><Attendance /></Route>
          <Route path="/test"><Test /></Route>
          <Route path="/report"><Report /></Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
