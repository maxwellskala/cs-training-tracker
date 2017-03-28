import React from 'react';
import ReactDOM from 'react-dom';
import { wrapAndSetState } from './utils';
import { App } from '../containers/App';
import AimContainer from '../containers/AimContainer';
import Loading from '../components/Loading';

const USER_FETCHED_STATE = {
  initialUserFetchCompleted: true
};

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <App />,
      div
    );
  });

  it('renders Loading if initialUserFetchCompleted === false', () => {
    const state = { initialUserFetchCompleted: false };
    const route = { name: 'aim' }; // should be overridden by initialUserFetchCompleted
    const app = wrapAndSetState(<App route={route} />, state);
    expect(app.find(Loading).length).toBe(1);
  });


  it('renders Loading if route.name === "root"', () => {
    const route = { name: 'root' };
    const app = wrapAndSetState(<App route={route} />, USER_FETCHED_STATE);
    expect(app.find(Loading).length).toBe(1);
  });

  xit('renders SignupLoginForm if route.name === "login"', () => {
    const route = { name: 'login' };
    const app = wrapAndSetState(<App route={route} />, USER_FETCHED_STATE);
    expect(app.find('.SignupLoginForm').length).toBe(1);
  });

  xit('renders SignupLoginForm if route.name === "signup"', () => {
    const route = { name: 'signup' };
    const app = wrapAndSetState(<App route={route} />, USER_FETCHED_STATE);
    expect(app.find('.SignupLoginForm').length).toBe(1);
  });

  it('renders AimContainer if route.name === "aim"', () => {
    const route = { name: 'aim' };
    const app = wrapAndSetState(<App route={route} />, USER_FETCHED_STATE);
    expect(app.find(AimContainer).length).toBe(1);
  });
})
