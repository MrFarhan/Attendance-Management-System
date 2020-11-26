import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import { Dashboard } from './Components/Dashboard';
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import { Test } from './Test';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Profile } from './Components/Profile';
// eslint-disable-next-line 
import firebaseData from "./firebase" //used for firebase initialization
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line 
import firebase from "firebase"
import { loadingAction, userDetailsAction } from './Redux/Actions';

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
      } else dispatch(loadingAction(false))

    });
    // eslint-disable-next-line
  }, [])

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
