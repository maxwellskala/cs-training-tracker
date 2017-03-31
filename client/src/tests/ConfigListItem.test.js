import React from 'react';
import { wrap } from './utils';
import ConfigListItem from '../components/ConfigListItem';

const CONFIG = {
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
};

const DEFAULT_PROPS = {
  config: CONFIG,
  isOpen: false,
  isSelected: false,
  selectable: true,
  onOpenChange: () => {},
  onSelectChange: () => {}
};

describe('<ConfigListItem />', () => {
  it('renders config name', () => {
    const wrapped = wrap(<ConfigListItem {...DEFAULT_PROPS} />);
    expect(wrapped.find('span').text()).toEqual(CONFIG.name);
  });

  it('does not render config details if props.isOpen === false', () => {
    const wrapped = wrap(<ConfigListItem {...DEFAULT_PROPS} />);
    expect(wrapped.find('table').length).toBe(0);
  });

  it('renders config details if props.isOpen === true', () => {
    const props = { ...DEFAULT_PROPS, isOpen: true };
    const wrapped = wrap(<ConfigListItem {...props} />);
    expect(wrapped.find('table').length).toBe(1);
  });

  it('renders a checkbox if props.selectable === true', () => {
    const wrapped = wrap(<ConfigListItem {...DEFAULT_PROPS} />);
    const wrappedInput = wrapped.find('input');
    expect(wrappedInput.length).toBe(1);
    expect(wrappedInput.props().type).toEqual('checkbox');
  });

  it('does not render a checkbox if props.selectable === false', () => {
    const props = { ...DEFAULT_PROPS, selectable: false };
    const wrapped = wrap(<ConfigListItem {...props} />);
    expect(wrapped.find('input').length).toBe(0);
  });

  it('renders an unchecked checkbox if props.selectable === true and props.isSelected === false', () => {
    const wrapped = wrap(<ConfigListItem {...DEFAULT_PROPS} />);
    expect(wrapped.find('input').props().checked).toBe(false);
  });

  it('renders a checked checkbox if props.selectable === true and props.isSelected === true', () => {
    const props = { ...DEFAULT_PROPS, isSelected: true };
    const wrapped = wrap(<ConfigListItem {...props} />);
    expect(wrapped.find('input').props().checked).toBe(true);
  });
});
