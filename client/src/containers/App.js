import React, { Component, createElement } from 'react';
import { withRoute } from 'react-router5';
import Client from '../data/Client';
import SignupLoginContainer from './SignupLoginContainer';
import Loading from '../components/Loading';
import AimContainer from './AimContainer';

const components = {
  loading: Loading,
  signup: SignupLoginContainer('signup'),
  login: SignupLoginContainer('login'),
  aim: AimContainer
};

// @TODO state seems fragile since we can accidentally remove an error key, fix that
class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: null
    };
    // @TODO refactor this garbage once class properties are legit
    this.handleReceiveUser = this.handleReceiveUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  };

  componentDidMount() {
    Client.checkSession((response) => {
      this.handleReceiveUser(response.user);
    });
  };

  handleReceiveUser(user) {
    const { router } = this.props;
    if (user) {
      this.setState(
        { user },
        router.navigate('aim')
      );
    } else {
      router.navigate('login');
    }
  };

  handleLogout() {
    Client.logout(
      (response) => {
        this.setState({ user: null });
        this.props.router.navigate('login');
      }
    );
  };

  renderBody() {
    const { route } = this.props;
    const { user } = this.state;
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

    return createElement(components[segment], props);
  };

  render() {
    return (
      <div className="App">
        {this.renderBody()}
      </div>
    );
  }
}

export default withRoute(App);
