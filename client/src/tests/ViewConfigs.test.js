import React from 'react';
import { wrap } from './utils';
import { Link } from 'react-router5';
import ViewConfigs from '../components/ViewConfigs';
import ConfigList from '../components/ConfigList';

const DEFAULT_PROPS = {
  configs: []
};

describe('<ViewConfigs />', () => {
  it('renders ConfigList', () => {
    const wrapped = wrap(<ViewConfigs {...DEFAULT_PROPS} />);
    expect(wrapped.find(ConfigList).length).toBe(1);
  });

  it('renders "Add config" link', () => {
    const wrapped = wrap(<ViewConfigs {...DEFAULT_PROPS} />);
    expect(wrapped.find(Link).length).toBe(1);
    expect(wrapped.find(Link).children().text()).toEqual('Add config');
  });
});
