import React from 'react';
import { wrap } from './utils';
import { AimContainer } from '../containers/AimContainer';
import AddSession from '../components/AddSession';
import History from '../components/History';
import AddConfig from '../components/AddConfig';
import AimNav from '../components/AimNav';
import * as RouteNames from '../constants/RouteNames';

const DEFAULT_PROPS = {
  user: {},
  onLogout: () => {},
  fetchConfigs: () => {},
  configs: [],
  route: { name: RouteNames.AIM_ADD_SESSION },
  router: {}
};

const SUBROUTES = {
  [RouteNames.AIM]: AddSession,
  [RouteNames.AIM_ADD_SESSION]: AddSession,
  [RouteNames.AIM_HISTORY]: History,
  [RouteNames.AIM_ADD_CONFIG]: AddConfig
};

describe('<AimContainer />', () => {
  it('renders AimNav no matter the route', () => {
    for (const subroute of Object.keys(SUBROUTES)) {
      const route = { name: subroute };
      const props = { ...DEFAULT_PROPS, route };
      const wrapped = wrap(<AimContainer {...props} />);
      expect(wrapped.find(AimNav).length).toBe(1);
    }
  });

  it('renders the proper components for each subroute', () => {
    for (const subroute of Object.keys(SUBROUTES)) {
      const route = { name: subroute };
      const props = { ...DEFAULT_PROPS, route };
      const target = SUBROUTES[subroute];
      const wrapped = wrap(<AimContainer {...props} />);
      expect(wrapped.find(target).length).toBe(1);
    }
  });

  it('renders logout button', () => {
    const wrapped = wrap(<AimContainer {...DEFAULT_PROPS} />);
    expect(wrapped.find('button').text()).toEqual('Log out');
  });
});
