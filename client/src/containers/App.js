import React, { Component, createElement } from 'react';
import { routeNode } from 'react-router5';
import Client from '../data/Client';
import SignupLoginContainer from './SignupLoginContainer';
import AimContainer from './AimContainer';
import Loading from '../components/Loading';

const COMPONENTS = {
  signup: SignupLoginContainer('signup'),
  login: SignupLoginContainer('login'),
  aim: AimContainer,
  root: Loading
};

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: null,
      initialUserFetchCompleted: false
    };
    // @TODO refactor this garbage once class properties are legit
    this.handleReceiveUser = this.handleReceiveUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.navigateToAim = this.navigateToAim.bind(this);
  };

  navigateToAim() {
    this.props.router.navigate('aim');
  };

  handleReceiveUser(user) {
    const { router } = this.props;
    if (user) {
      this.setState(
        { user },
        this.navigateToAim
      );
    } else {
      router.navigate('login');
    }
  };

  handleLogout() {
    Client.logout(
      (response) => {
        this.props.router.navigate('login');
        this.setState({ user: null });
      }
    );
  };

  componentDidMount() {
    setTimeout(() =>
      Client.checkSession((response) => {
        const { user } = response;
        const { router } = this.props;
        const nextState = { initialUserFetchCompleted: true };
        if (user) {
          this.setState(
            { ...nextState, user },
            this.navigateToAim
          );
        } else {
          router.navigate('login');
          this.setState(nextState);
        }
      }),
      2000
    );
  };

  renderBody() {
    const { route } = this.props;
    const { user, initialUserFetchCompleted } = this.state;
    if (!initialUserFetchCompleted) {
      return <Loading />;
    }

    const segment = route.name.split('.')[0];
    const props = {};
    switch (segment) {
      case 'aim':
        props.user = user;
        props.onLogout = this.handleLogout;
        break;
      case 'signup':
        props.onReceiveUser = this.handleReceiveUser;
        break;
      case 'login':
        props.onReceiveUser = this.handleReceiveUser;
        break;
      default:
        break;
    }
    return createElement(COMPONENTS[segment], props);
  };

  render() {
    return (
      <div className="App">
        {this.renderBody()}
      </div>
    );
  }
}

export { App };
export default routeNode('')(App);
