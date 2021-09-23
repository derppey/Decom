import React from 'react'; 
import './dashboard.css';
import ServerList from '../ServerList/ServerList';
const Dashboard = () => {
  return (
    <div className='Dashboard'>
      <ServerList />
    </div>
  )
}

export default Dashboard
