import React, {useEffect} from 'react';
import './Dashboard.css';
//import { Redirect } from 'react-router-dom'; <Redirect to='/login' />
import ServerList from '../ServerList/ServerList';
import MessageContainer from '../MessageContainer/MessageContainer';
import { connect } from 'react-redux';
import { user } from '../../services/userService';
import { setAlias } from '../../redux/actions';
import { Link } from 'react-router-dom';


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
    }, 500);

  },[]);
  return (
    <div>
      {alias !== '' ? (
        <div>
          <div className="loading">
            <h1 className="status">Please wait while I load your messages</h1>
          </div>
          <div className='Dashboard'>
            <ServerList/>
            <MessageContainer/>
            
          </div>
        </div>
      ) : (
        <div>
          <div className="loading">
            <h1 className="status">Please wait while I load your messages</h1>
          </div>
          <div className="notLoggedIn">
            <h1 className="status">Sorry it appears you are not logged in, click <Link to="/login">Here</Link> to login!</h1>
          </div>
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

