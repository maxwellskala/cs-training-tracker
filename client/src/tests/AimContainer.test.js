import React from 'react';
import { wrap } from './utils';
import { AimContainer, COMPONENTS as SUBROUTES } from '../containers/AimContainer';
import AddSession from '../components/AddSession';
import History from '../components/History';
import ViewConfigs from '../components/ViewConfigs';
import AddConfig from '../components/AddConfig';
import Loading from '../components/Loading';
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

describe('<AimContainer />', () => {
  it('renders AimNav no matter the route', () => {
    for (const subroute of Object.keys(SUBROUTES)) {
      const route = { name: subroute };
      const props = { ...DEFAULT_PROPS, route };
      const wrapped = wrap(<AimContainer {...props} />);
      expect(wrapped.find(AimNav).length).toBe(1);
    }
  });

  it('renders <Loading /> when props.configs === null', () => {
    const props = { ...DEFAULT_PROPS, configs: null };
    const wrapped = wrap(<AimContainer {...props} />);
    expect(wrapped.find(Loading).length).toBe(1);
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
