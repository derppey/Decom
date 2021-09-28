import React, {  useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import gunService from '../../services/gunService';
import { db, user } from '../../services/userService';
import './JoinServer.css';
const JoinServer = () => {
  const { uuid }= useParams();
  const [localAlias, setAlias] = useState('');
  useEffect(() => {
    const getAndSet = async () => {
      const alias = await user.get('alias');
      setAlias(alias);
      console.log('here');
      const server = await gunService.getServer(uuid);
      db.get(alias).get('serverList').set(server);
      console.log(user);
      db.get('servers').get(`${uuid}`).get('members').set(user);
    };
    getAndSet();
  }, []);
  
  return (
    <div>
      {localAlias !== '' ? (
        <p>Wow! {localAlias}, Joined {uuid}!</p>
      ): (
        <div>
          <p>Please login</p>
          

        </div>
      )

      }
      
    </div>
  );
};

export default JoinServer;
