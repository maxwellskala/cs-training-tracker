import React from 'react';
import { Link } from 'react-router5';
import { wrap } from './utils';
import AddConfig, { CONFIG_FIELDS } from '../components/AddConfig';

describe('<AddConfig />', () => {
  it('renders two tds and one input per CONFIG_FIELDS entry', () => {
    const wrapped = wrap(<AddConfig />);
    const numConfigFields = CONFIG_FIELDS.length;
    expect(wrapped.find('td').length).toBe(numConfigFields * 2);
    expect(wrapped.find('input').length).toBe(numConfigFields)
  });

  it('renders "Save" and "Back" buttons', () => {
    const wrapped = wrap(<AddConfig />);
    expect(wrapped.find('button').length).toBe(2);
    expect(wrapped.find('button').at(0).text()).toEqual('Save');
    expect(wrapped.find('button').at(1).text()).toEqual('Back');
    expect(wrapped.find(Link).length).toBe(1);
    expect(wrapped.find(Link).children().text()).toEqual('Back');
  });
});
