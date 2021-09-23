import React from 'react'; 
import './Dashboard.css';
import ServerList from '../ServerList/ServerList';
import MessageContainer from '../MessageContainer/MessageContainer';
const Dashboard = ({serverNameArray}) => {
  return (
    <div className='Dashboard'>
      <ServerList serverNameArray={serverNameArray}/>
      <MessageContainer/>
    </div>
  )
}

export default Dashboard
