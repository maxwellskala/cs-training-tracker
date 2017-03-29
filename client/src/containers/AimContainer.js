import React, { createElement } from 'react';
import { routeNode } from 'react-router5';
import AimNav from '../components/AimNav';
import AddSession from '../components/AddSession';
import History from '../components/History';
import AddConfig from '../components/AddConfig';
import Loading from '../components/Loading';
import * as RouteNames from '../constants/RouteNames';

const COMPONENTS = {
  [RouteNames.AIM]: Loading,
  [RouteNames.AIM_ADD_SESSION]: AddSession,
  [RouteNames.AIM_HISTORY]: History,
  [RouteNames.AIM_ADD_CONFIG]: AddConfig
};

const AimContainer = ({ user, onLogout, route, router }) => {
  const body = COMPONENTS[route.name];
  return (
    <div className='Aim'>
      <aside>
        <AimNav route={route} router={router} />
      </aside>
      <main>
        {createElement(body)}
        <button onClick={onLogout}>Log out</button>
      </main>
    </div>
  );
}

AimContainer.propTypes = {
  user: React.PropTypes.object.isRequired,
  onLogout: React.PropTypes.func.isRequired,
  route: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
};

export default routeNode(RouteNames.AIM)(AimContainer);
