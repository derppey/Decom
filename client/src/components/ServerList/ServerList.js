import React from 'react'
import { serverContext } from '../../App'
import './ServerList.css'

const ServerList = () => {
  const data = React.useContext(serverContext);
  return (
    <div className="ServerPanel">
      {
        data.map((server) => (
          <div key={server}>

            <img src={`https://avatars.dicebear.com/api/initials/${server}.svg`} alt={server}/>
          </div>
        ))
      }
    </div>
  )
}

export default ServerList
