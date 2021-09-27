import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { addServer, setServer } from './redux/actions';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import { db } from './services/userService';
// initialize gun locally

function App ({ addServer }) {
  const servers = db.get('servers');

  useEffect(() => {
    const getAllServers = async () => {
      let output = [];
      await servers.map().once((data) => {
        if (!(output.includes(data.name))) {
          const array = [...output, data.name];
          output = array;
          addServer(output);
        }
      });
    };

    getAllServers();
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
    server: state.server

  };
};

const mapDispatchToProps = (dispatch) => ({
  addServer: (payload) => dispatch(addServer(payload)),
  setServer: (payload) => dispatch(setServer(payload))

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
