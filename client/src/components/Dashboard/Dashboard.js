import React, {useState, useEffect} from 'react';
import './Dashboard.css';
//import { Redirect } from 'react-router-dom'; <Redirect to='/login' />
import ServerList from '../ServerList/ServerList';
import MessageContainer from '../MessageContainer/MessageContainer';
import { user } from '../../services/userService';
import { giphyService } from '../../services/giphyService';


const Dashboard = () => {
  const [alias, setAlias] = useState('');
  const [gif, setGif] = useState('https://media0.giphy.com/media/l4FGsAAOFdtylBeSc/giphy.mp4?cid=92f33f6ae961b1c1e825e3caaf4a3afd5ce0fa719d22da3b&rid=giphy.mp4&ct=g');
  useEffect(() => {
    const getGif = async () => {
      setGif(await giphyService.getRandomGif());
    };
    getGif();
    const getAlias = async () => {
      const alias = await user.get('alias');
      console.log(alias);
      setAlias(alias);
    };
    getAlias();
    setTimeout(() => {
      const elm = document.getElementsByClassName('loading')[0];
      try {
        elm.style.display = 'none';
      } catch (err) {
        console.log(err);
      }
    }, 5000);

  },[]);
  return (
    <div>
      {alias !== '' ? (
        <div>
          <div className="loading">
            <h1>Please wait while I load your messages</h1>
            <video autoPlay muted>
              <source src={gif} type="video/mp4" />
            </video>
          </div>
          <div className='Dashboard'>
            <ServerList/>
            <MessageContainer alias={alias}/>
          </div>
        </div>
      ) : (<b></b>
        
      )}
    </div>
  );
};

export default Dashboard;
