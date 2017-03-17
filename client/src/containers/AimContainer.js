import React from 'react';
import { routeNode } from 'react-router5';

const AimContainer = (props) => {
  return (
    <div>
      You are logged in with email {props.email}
      <button onClick={props.onLogout}>Logout</button>
    </div>
  );
}

AimContainer.propTypes = {
  user: React.PropTypes.object.isRequired,
  onLogout: React.PropTypes.func.isRequired
};

export default routeNode('aim')(AimContainer);
