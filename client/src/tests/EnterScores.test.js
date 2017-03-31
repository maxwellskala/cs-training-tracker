import React from 'react';
import { wrap } from './utils';
import EnterScores from '../components/EnterScores';

const SCORES = [
  {
    id: 1,
    name: 'config1',
    score: 70,
    maximum: 100
  },
  {
    id: 2,
    name: 'config2',
    score: 22,
    maximum: 25
  },
];

const DEFAULT_PROPS = {
  configScores: SCORES,
  onUpdateConfigScore: () => {}
};

describe('<EnterScores />', () => {
  it('renders one tr per score in props.configScores', () => {
    const wrapped = wrap(<EnterScores {...DEFAULT_PROPS} />);
    expect(wrapped.find('tbody').find('tr').length).toBe(SCORES.length);
  });
});
