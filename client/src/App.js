import React, {useEffect } from 'react';

import { connect } from 'react-redux';
import { addServer, setServer, setAlias } from './redux/actions';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import MakeServer from './components/MakeServer/MakeServer';
import JoinServer from './components/JoinServer/JoinServer';
import { user } from './services/userService';

// initialize gun locally

function App ({ setAlias }) {
  useEffect(() => {
    const aliasGaming = async () => {
      const alias2 = await user.get('alias');
      setAlias(alias2);
      console.log(alias2);
    };
    aliasGaming();
  }, []);


  return (
    <Router>
      <Switch>
        <Route path="/app">
          <div className="App">
            <Dashboard/>
          </div>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/createServer">
          <MakeServer />
        </Route>
        <Route path="/join/:uuid">
          <JoinServer />
        </Route>
        <Route path="/">
          <Redirect to="/app" />
        </Route>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    serverList: state.serverList,
    server: state.server,
    alias: state.alias,

  };
};

const mapDispatchToProps = (dispatch) => ({
  addServer: (payload) => dispatch(addServer(payload)),
  setServer: (payload) => dispatch(setServer(payload)),
  setAlias: (payload) => dispatch(setAlias(payload))

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
