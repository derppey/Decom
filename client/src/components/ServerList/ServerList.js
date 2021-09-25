import React from 'react'
import gunService from '../../services/gunService'
import { connect } from 'react-redux'
import { addServer, setServer } from '../../redux/actions'
import './ServerList.css'

const ServerList = ({ setServer, serverList }) => {
  async function createServer () {
    const res = await fetch('https://random-word-api.herokuapp.com/word?number=1')
    const data = await res.json()
    gunService.createServer(data[0])
    console.log(serverList)
  }
  async function updateDaServer (e) {
    const server = e.target.attributes.getNamedItem('alt').nodeValue
    console.log(server)
    setServer(server)
  }

  return (
    <div className="ServerPanel">
      {
        serverList.map((server) => (
          <div className="ServerContainer" key={server}>
            <img className="Server" onClick={updateDaServer} src={`https://avatars.dicebear.com/api/initials/${server}.svg`} alt={server}/>
            <p className="Highlight">➤</p>
          </div>
        ))
      }
      <div>
        <button onClick={createServer} id="addServer"></button>
      </div>
    </div>
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
)(ServerList)
