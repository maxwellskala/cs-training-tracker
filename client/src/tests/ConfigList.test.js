import React from 'react';
import { wrap } from './utils';
import ConfigList from '../components/ConfigList';
import ConfigListItem from '../components/ConfigListItem';

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

const DEFAULT_PROPS = {
  configs: CONFIGS,
  selectable: true
};

describe('<ConfigList />', () => {
  it('renders as many <ConfigListItem />s as there are props.configs', () => {
    const wrapped = wrap(<ConfigList {...DEFAULT_PROPS} />);
    expect(wrapped.find(ConfigListItem).length).toBe(CONFIGS.length);
  })
})
