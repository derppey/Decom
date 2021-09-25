import React, { useEffect } from 'react'
import Gun from 'gun'
import { connect } from 'react-redux'
import { addServer, setServer } from './redux/actions'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
// initialize gun locally
const gun = Gun({
  peers: [
    'http://192.168.1.70:3030/gun'
  ]
})
function App ({ addServer }) {
  const servers = gun.get('servers')

  useEffect(() => {
    const getAllServers = async () => {
      let output = []
      await servers.map().once((data, key) => {
        if (!(output.includes(data.name))) {
          const array = [...output, data.name]
          output = array
          addServer(output)
        };
      })
    }

    getAllServers()
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/app">
          <div className="App">
            <Dashboard/>
          </div>
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    serverList: state.serverList,
    server: state.server

  }
}

const mapDispatchToProps = (dispatch) => ({
  addServer: (payload) => dispatch(addServer(payload)),
  setServer: (payload) => dispatch(setServer(payload))

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
