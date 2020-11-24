// import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import { Dashboard } from './Components/Dashboard';
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import { Test } from './Test';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Profile } from './Components/Profile';
// eslint-disable-next-line 
import firebase from "./firebase" //used for firebase initialization
import { Provider } from 'react-redux';
import { store } from './Redux/Store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/"><Login /></Route>
            <Route path="/Dashboard"><Dashboard /></Route>
            <Route path="/signup"><Signup /></Route>
            <Route path="/profile"><Profile /></Route>
            <Route path="/test"><Test /></Route>
          </Switch>

        </div>
      </Router >
    </Provider >
  );
}

export default App;
