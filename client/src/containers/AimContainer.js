import React from 'react';
import { routeNode } from 'react-router5';
import * as RouteNames from '../constants/RouteNames';

const AimContainer = (props) => {
  return (
    <div>
      You are logged in with email {props.user.email}
      <button onClick={props.onLogout}>Logout</button>
    </div>
  );
}

AimContainer.propTypes = {
  user: React.PropTypes.object.isRequired,
  onLogout: React.PropTypes.func.isRequired
};

export default routeNode(RouteNames.AIM)(AimContainer);
