import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch, useHistory, Redirect } from 'react-router-dom';
import './App.css';
import { Dashboard } from './Components/Dashboard';
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import { Test } from './Test';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Profile } from './Components/Profile';
// eslint-disable-next-line 
import firebaseData from "./firebase" //used for firebase initialization
import { Provider, useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line 
import firebase from "firebase"
import { loadingAction, userDetailsAction } from './Redux/Actions';

function App() {
  // var user = firebase.auth().currentUser;
  const history = useHistory()
  // const [loading, setLoading] = useState(false)
  const loading = useSelector((val) => val.loading)
  console.log(loading, "loadingmmmmmmmmm")
  // const [loading, setLoading] = useState(true)
  let dispatch = useDispatch()
  const state = useSelector((state) => state.userDetails)

  // const state = useSelector((val) => val)
  // console.log(state, "stateeeeeeeeeeeee")
  // const [userDetails, setUserDetails] = useState()

  // if (!state) Redirect("/")



  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user, "user");
        const useruid = user.uid
        // dispatch(loadingAction(true))
        // setLoading(true)
        firebase.database().ref(`Users/${useruid}/`).on("value", (res) => {
          console.log(res.val(), "userDetails in dashboard dispatch")
          // setUserDetails(res.val())
          dispatch(userDetailsAction(res.val()))
          dispatch(loadingAction(false))
          // history.push("/dashboard")
          // setLoading(false)
        })
      } else dispatch(loadingAction(false))

    });
  }, [])

  // if (loading) return <Redirect to="/dashboard" />
  if (loading) {
    return <p>...Loading</p>
  }
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/"><Login /></Route>
          <Route path="/dashboard"><Dashboard /></Route>
          <Route path="/signup"><Signup /></Route>
          <Route path="/profile"><Profile /></Route>
          <Route path="/test"><Test /></Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
