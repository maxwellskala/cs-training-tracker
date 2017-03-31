import React from 'react';
import { wrap } from './utils';
import AddSession from '../components/AddSession';
import ConfigList from '../components/ConfigList';

const CONFIGS = [
  {
    id: 1,
    user: 1,
    name: 'config1',
    weapon: 'AK-47',
    distance: 2,
    count: 100,
    shotsToKill: 1,
    size: '10R',
    delay: 0.25,
    duration: 0.5
  },
  {
    id: 2,
    user: 1,
    name: 'config2',
    weapon: 'AK-47',
    distance: 2,
    count: 25,
    shotsToKill: 5,
    size: '10R',
    delay: 0,
    duration: 1.25
  }
];

describe('<AddSession />', () => {
  it('renders <ConfigList />', () => {
    const wrapped = wrap(<AddSession configs={CONFIGS} />);
    expect(wrapped.find(ConfigList).length).toBe(1);
  });

  it('renders "Clone previous session" button', () => {
    const wrapped = wrap(<AddSession configs={CONFIGS} />);
    expect(wrapped.find('button').at(0).text()).toEqual('Clone previous session');
  });

  it('renders "Next" button', () => {
    const wrapped = wrap(<AddSession configs={CONFIGS} />);
    expect(wrapped.find('button').at(1).text()).toEqual('Next');
  });
});
