import React from 'react'
import './Dashboard.css'
import ServerList from '../ServerList/ServerList'
import MessageContainer from '../MessageContainer/MessageContainer'
const Dashboard = () => {
  return (
      <div className='Dashboard'>
        <ServerList/>
        <MessageContainer/>
      </div>
  )
}

export default Dashboard
