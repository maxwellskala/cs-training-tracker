import React, { Component } from 'react';
import { routeNode } from 'react-router5';
import Client from '../data/Client';
import SignupLoginForm from '../components/SignupLoginForm';
import * as RouteNames from '../constants/RouteNames';

function getAlternateRoute(route) {
  return route === RouteNames.SIGNUP ? RouteNames.LOGIN : RouteNames.SIGNUP;
}

function getSignupLoginContainer(route) {
  class SignupLoginContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        errors: []
      };

      this.handleSignupLoginResponse = this.handleSignupLoginResponse.bind(this);
      this.changeRoute = this.changeRoute.bind(this);
    };

    changeRoute() {
      this.props.router.navigate(
        getAlternateRoute(route)
      );
    };

    handleSignupLoginResponse(response) {
      const { onReceiveUser } = this.props;
      const validationErrors = response.validationErrors;
      if (validationErrors) {
        this.setState({
          errors: validationErrors
        });
        return;
      }
      const dataErrors = response.errors;
      if (dataErrors) {
        this.setState({
          errors: dataErrors
        });
        return;
      }
      onReceiveUser(response.user);
    }

    render() {
      const clientAction = Client[route];

      return (
        <SignupLoginForm
          action={route}
          onSubmit={clientAction}
          onReceiveUser={this.handleSignupLoginResponse}
          errors={this.state.errors}
          changeAction={this.changeRoute}
        />
      );
    };
  }

  SignupLoginContainer.propTypes = {
    onReceiveUser: React.PropTypes.func.isRequired
  };

  return routeNode(route)(SignupLoginContainer);
}

export default getSignupLoginContainer;
