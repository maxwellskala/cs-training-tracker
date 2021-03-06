import React, { Component, createElement } from 'react';
import { routeNode } from 'react-router5';
import Client from '../data/Client';
import SignupLoginContainer from './SignupLoginContainer';
import AimContainer from './AimContainer';
import Loading from '../components/Loading';
import * as RouteNames from '../constants/RouteNames';

const COMPONENTS = {
  [RouteNames.SIGNUP]: SignupLoginContainer(RouteNames.SIGNUP),
  [RouteNames.LOGIN]: SignupLoginContainer(RouteNames.LOGIN),
  [RouteNames.AIM]: AimContainer,
  [RouteNames.ROOT]: Loading
};

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: null,
      initialUserFetchCompleted: false,
      configs: null
    };
    // @TODO refactor this garbage once class properties are legit
    this.handleReceiveUser = this.handleReceiveUser.bind(this);
    this.handleFetchConfigs = this.handleFetchConfigs.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.navigateToAim = this.navigateToAim.bind(this);
  };

  navigateToAim() {
    const { router, route } = this.props;
    const segments = route.name.split('.');
    if (segments[0] === RouteNames.AIM && segments.length >= 2) {
      return; // already at an aim route
    }
    router.navigate(RouteNames.AIM_ADD_SESSION);
  };

  handleReceiveUser(user) {
    const { router } = this.props;
    if (user) {
      this.setState(
        { user },
        this.navigateToAim
      );
    } else {
      router.navigate(RouteNames.LOGIN);
    }
  };

  handleFetchConfigs() {
    const { user } = this.state;
    if (!user) {
      return;
    }
    Client.fetchConfigs(
      user.id,
      (response) => {
        this.setState({ configs: response });
      }
    );
  };

  handleLogout() {
    Client.logout(
      (response) => {
        this.props.router.navigate(RouteNames.LOGIN);
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
          router.navigate(RouteNames.LOGIN);
          this.setState(nextState);
        }
      }),
      2000
    );
  };

  renderBody() {
    const { route } = this.props;
    const { user, initialUserFetchCompleted, configs } = this.state;
    if (!initialUserFetchCompleted) {
      return <Loading />;
    }

    const segment = route.name.split('.')[0];
    const props = {};
    switch (segment) {
      case RouteNames.AIM:
        props.user = user;
        props.fetchConfigs = this.handleFetchConfigs;
        props.configs = configs;
        props.onLogout = this.handleLogout;
        break;
      case RouteNames.SIGNUP:
        props.onReceiveUser = this.handleReceiveUser;
        break;
      case RouteNames.LOGIN:
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

export { App }; // for testing
export default routeNode('')(App);
