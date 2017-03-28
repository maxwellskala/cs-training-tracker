import React from 'react';

import { wrap } from './utils';
import SignupLoginForm from '../components/SignupLoginForm';

const EMPTY_FUNCTION = () => {};
const EMPTY_PROPS = {
  onSubmit: EMPTY_FUNCTION,
  onReceiveUser: EMPTY_FUNCTION,
  changeAction: EMPTY_FUNCTION,
  errors: [],
};
const LOGIN_PROPS = { action: 'login', ...EMPTY_PROPS };
const SIGNUP_PROPS = { action: 'signup', ...EMPTY_PROPS };
const ERRORS = ['This is an error', 'As is this'];
const ERRORS_LENGTH = ERRORS.length;

describe('<SignupLoginForm />', () => {
  it('shows login header when props.action === "login"', () => {
    const signupLoginForm = wrap(
      <SignupLoginForm { ...LOGIN_PROPS } />
    );
    const h3s = signupLoginForm.find('h3');
    expect(h3s.length).toBe(1);
    expect(h3s.text()).toBe('Login');
  });

  it('shows signup toggle when props.action === "login"', () => {
    const signupLoginForm = wrap(
      <SignupLoginForm { ...LOGIN_PROPS } />
    );
    const anchors = signupLoginForm.find('a');
    expect(anchors.length).toBe(1);
    expect(anchors.text()).toBe('Signup');
  });

  it('shows signup header when props.action === "signup"', () => {
    const signupLoginForm = wrap(
      <SignupLoginForm { ...SIGNUP_PROPS } />
    );
    const h3s = signupLoginForm.find('h3');
    expect(h3s.length).toBe(1);
    expect(h3s.text()).toBe('Signup');
  });

  it('shows login toggle when showLogin === false', () => {
    const signupLoginForm = wrap(
      <SignupLoginForm { ...SIGNUP_PROPS } />
    );
    const anchors = signupLoginForm.find('a');
    expect(anchors.length).toBe(1);
    expect(anchors.text()).toBe('Login');
  });

  it('does not render .errors-container when no errors', () => {
    const signupLoginForm = wrap(
      <SignupLoginForm { ...SIGNUP_PROPS } />
    );
    expect(signupLoginForm.find('.errors-container').length).toBe(0);
  });

  it('renders .errors-container when there are errors', () => {
    const errors = ['This is an error'];
    const props = {
      ...LOGIN_PROPS,
      errors
    };
    const signupLoginForm = wrap(
      <SignupLoginForm {...props} />
    );
    expect(signupLoginForm.find('.errors-container').length).toBe(1);
  });

  it('renders multiple errors if there are more than one', () => {
    const props = {
      ...LOGIN_PROPS,
      errors: ERRORS
    };
    const signupLoginForm = wrap(
      <SignupLoginForm {...props} />
    );
    expect(signupLoginForm.find('.errors-container .error').length)
      .toBe(ERRORS_LENGTH);
  });

  it('renders error text correctly', () => {
    const props = {
      ...LOGIN_PROPS,
      errors: ERRORS
    };
    const signupLoginForm = wrap(
      <SignupLoginForm {...props} />
    );
    const errors = signupLoginForm.find('.errors-container .error');
    errors.forEach((error, i) => {
      expect(error.text()).toEqual(ERRORS[i])
    });
  });
});