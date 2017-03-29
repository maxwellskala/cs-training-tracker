import React from 'react';
import { routeNode } from 'react-router5';
import * as RouteNames from '../constants/RouteNames';

const AimContainer = ({ user, onLogout }) => {
  return (
    <div>
      You are logged in with email {user.email}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

AimContainer.propTypes = {
  user: React.PropTypes.object.isRequired,
  onLogout: React.PropTypes.func.isRequired
};

export default routeNode(RouteNames.AIM)(AimContainer);
