import React, { useEffect, useState } from 'react';
import './MemberList.css';
import { connect } from 'react-redux';
import { db } from '../../services/userService';

const MemberList = ({ server }) => {
  const [members, setMembers] = useState([]);
  const servers = db.get('servers');
  useEffect(() => {
    const getMembers = async () => {
      setMembers([]);
      let output = [];
      servers.get(`${server}`).get('members').map().once((data) => {
        const array = [...output, data];
        output = array;
        setMembers(output);
      });
    };
    getMembers();
  }, [server]);
  return (
    <div className="MemberList">
      <h1>Members</h1>
      {
        members.map((person) => (
          <div key={person.alias}><p>{person.alias}</p></div>
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
