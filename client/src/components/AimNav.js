import React from 'react';
import { BaseLink } from 'react-router5';
import * as RouteNames from '../constants/RouteNames';

const AimNav = ({ route, router }) => {
  return (
    <div className='AimNav'>
      <BaseLink router={router} routeName={RouteNames.AIM_ADD_SESSION}>
        Add Session
      </BaseLink>
      <BaseLink router={router} routeName={RouteNames.AIM_HISTORY}>
        History
      </BaseLink>
      <BaseLink router={router} routeName={RouteNames.AIM_VIEW_CONFIGS}>
        Configs
      </BaseLink>
    </div>
  );
};

AimNav.propTypes = {
  route: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
};

export default AimNav;
