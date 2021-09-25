import React, {useState} from 'react'; 
import './Dashboard.css';
import ServerList from '../ServerList/ServerList';
import MessageContainer from '../MessageContainer/MessageContainer';
const Dashboard = ({serverNameArray}) => {
  return (
      <div className='Dashboard'>
        <ServerList/>
        <MessageContainer/>
      </div>
  )
}

export default Dashboard
