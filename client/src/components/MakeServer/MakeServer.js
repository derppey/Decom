import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { cloudinaryService } from '../../services/cloudinaryService';
import gunService from '../../services/gunService';
import './MakeServer.css';


const MakeServer = ({alias}) => {
  const [server, setServer] = useState('');
  const [imageSelect, setImageSelect] = useState('');
  const history = useHistory();
  const updateImage = (e) => {
    if (e.target.files[0]) {
      document.getElementById('blah').src = URL.createObjectURL(e.target.files[0]);
    }
    setImageSelect(e.target.files[0]);
  };
  const uploadImage = async () => {
    const result = await cloudinaryService.uploadPfp(imageSelect);
    if (result !== 'Failed') {
      return result;
    } else {
      return `https://avatars.dicebear.com/api/initials/${server}.svg`;
    }
    
  };
  const submit = async () => {
    const url = await uploadImage();
    await gunService.createServer(alias, server, url);
    history.push('/app');

  };

  return (
    <div className="ServerCreation">
      <img className="serverImage" id="blah" src="#" alt="Your icon" />
      <h1>Create your server!</h1>
      <div>
        <label htmlFor="sname">Server Name: </label>
        <input className="loginInput" type="text" placeholder="Server Name" name="sname" value={server} onChange={(e) => setServer(e.target.value)} required/>
      </div>
      <div>
        <label htmlFor="uname">Server Icon: </label>
        <input className="loginInput" accept="image/*" type='file' id="imgInp" onChange={updateImage}/>
      </div>
      <button className="buttons" onClick={submit}>Submit</button>
      
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alias: state.alias,

  };
};

const mapDispatchToProps = (dispatch) => ({
  addServer: (payload) => dispatch(addServer(payload)),


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MakeServer);

