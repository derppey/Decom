import React, { useEffect, useState } from 'react';
import './MemberList.css';
import { connect } from 'react-redux';
import { db } from '../../services/userService';
import gunService from '../../services/gunService';

const MemberList = ({ server }) => {
  const [members, setMembers] = useState([]);
  const [serverOwner, setServerOwner] = useState('');
  const servers = db.get('servers');
  useEffect(() => {
    const getMembers = async () => {
      setMembers([]);
      let output = [];
      const details = await gunService.getServer(server);
      servers.get(`${server}`).get('members').map().once((data) => {
        if (data.alias === details.owner) { 
          setServerOwner(data.alias);
        } else {
          console.log(details.owner);
        }
        const array = [...output, data];
        output = array;
        setMembers(output);
      });
    };
    getMembers();
  }, [server]);
  return (
    <div className="MemberList">
      <h1 className="MembersHeader">Members</h1>
      {
        members.map((person) => (
          <div key={person.alias}>
            {
              serverOwner === person.alias ? (<p className="member">{person.alias} [👑]</p>) : (<p className="member">{person.alias}</p>)
            }
            
            
          </div>
        ))
      }
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    server: state.server,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setServer: (payload) => dispatch(setServer(payload)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberList);
