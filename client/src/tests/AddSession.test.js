import React from 'react';
import { wrap, wrapAndSetState } from './utils';
import AddSession, { STEPS } from '../components/AddSession';
import ConfigList from '../components/ConfigList';
import EnterScores from '../components/EnterScores';

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
  it('renders <ConfigList /> by default', () => {
    const wrapped = wrap(<AddSession configs={CONFIGS} />);
    expect(wrapped.find(ConfigList).length).toBe(1);
  });

  it('renders <ConfigList /> and not <EnterScores /> when state.step === STEPS.chooseConfigs', () => {
    const state = { step: STEPS.chooseConfigs };
    const wrapped = wrapAndSetState(<AddSession configs={CONFIGS} />, state);
    expect(wrapped.find(ConfigList).length).toBe(1);
    expect(wrapped.find(EnterScores).length).toBe(0);
  });

  it('renders <EnterScores /> and not <ConfigList /> when state.step === STEPS.enterCores', () => {
    const state = { step: STEPS.enterScores };
    const wrapped = wrapAndSetState(<AddSession configs={CONFIGS} />, state);
    expect(wrapped.find(EnterScores).length).toBe(1);
    expect(wrapped.find(ConfigList).length).toBe(0);
  });

  it('renders "Clone previous session" button when state.step === STEPS.chooseConfigs', () => {
    const state = { step: STEPS.chooseConfigs };
    const wrapped = wrapAndSetState(<AddSession configs={CONFIGS} />, state);
    expect(wrapped.find('button').at(0).text()).toEqual('Clone previous session');
  });

  it('does not render "Next" button when state.step === STEPS.chooseConfigs and state.selectedConfigs.length === 0', () => {
    const state = { step: STEPS.chooseConfigs, selectedConfigs: [] };
    const wrapped = wrapAndSetState(<AddSession configs={CONFIGS} />, state);
    expect(wrapped.find('button').length).toBe(1);
  });

  it('renders "Next" button when state.step === STEPS.chooseConfigs and state.selectedConfigs.length > 0', () => {
    const state = { step: STEPS.chooseConfigs, selectedConfigs: [1] };
    const wrapped = wrapAndSetState(<AddSession configs={CONFIGS} />, state);
    expect(wrapped.find('button').length).toBe(2);
    expect(wrapped.find('button').at(1).text()).toEqual('Next');
  });

  it('renders "Back" button when state.step === STEPS.enterScores', () => {
    const state = { step: STEPS.enterScores };
    const wrapped = wrapAndSetState(<AddSession configs={CONFIGS} />, state);
    expect(wrapped.find('button').at(0).text()).toEqual('Back');
  });

  it('renders "Save" button when state.step === STEPS.enterScores', () => {
    const state = { step: STEPS.enterScores };
    const wrapped = wrapAndSetState(<AddSession configs={CONFIGS} />, state);
    expect(wrapped.find('button').at(1).text()).toEqual('Save');
  });
});
