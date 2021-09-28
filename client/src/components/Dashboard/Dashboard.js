import React, {useEffect} from 'react';
import './Dashboard.css';
//import { Redirect } from 'react-router-dom'; <Redirect to='/login' />
import ServerList from '../ServerList/ServerList';
import MessageContainer from '../MessageContainer/MessageContainer';
import { connect } from 'react-redux';
import { user } from '../../services/userService';
import { setAlias } from '../../redux/actions';


//import { giphyService } from '../../services/giphyService';

const Dashboard = ({alias, setAlias}) => {
  console.log(alias);
  //const [gif, setGif] = useState('');
  useEffect(() => {
    const aliasGaming = async () => {
      const alias2 = await user.get('alias');
      setAlias(alias2);
      console.log(alias2);
    };
    aliasGaming();
    
    setTimeout(() => {
      const elm = document.getElementsByClassName('loading')[0];
      try {
        elm.style.display = 'none';
      } catch (err) {
        console.log(err);
      }
    }, 2000);

  },[]);
  return (
    <div>
      {alias !== '' ? (
        <div>
          <div className="loading">
            <h1>Please wait while I load your messages</h1>
            <video autoPlay muted>
              <source src='https://giphy.com/embed/gtm6yZur9eRFoo1UvO/video' type="video/mp4" />
            </video>
          </div>
          <div className='Dashboard'>
            <ServerList/>
            <MessageContainer/>
            
          </div>
        </div>
      ) : (<div className="loading">
        <h1>Please wait while I load your messages</h1>
        <video autoPlay muted>
          <source src='https://giphy.com/embed/gtm6yZur9eRFoo1UvO/video' type="video/mp4" />
        </video>
      </div>
        
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alias: state.alias,

  };
};

const mapDispatchToProps = (dispatch) => ({
  setAlias: (payload) => dispatch(setAlias(payload))

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

