import React, { Component } from 'react';
import { routeNode } from 'react-router5';
import Client from '../data/Client';
import SignupLoginForm from '../components/SignupLoginForm';

function getAlternateAction(action) {
  return action === 'signup' ? 'login' : 'signup';
}

function getSignupLoginContainer(action) {
  class SignupLoginContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        errors: []
      };

      this.handleSignupLoginResponse = this.handleSignupLoginResponse.bind(this);
      this.changeAction = this.changeAction.bind(this);
    };

    changeAction() {
      this.props.router.navigate(
        getAlternateAction(action)
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
      const clientAction = Client[action];

      return (
        <SignupLoginForm
          action={action}
          onSubmit={clientAction}
          onReceiveUser={this.handleSignupLoginResponse}
          errors={this.state.errors}
          changeAction={this.changeAction}
        />
      );
    };
  }

  SignupLoginContainer.propTypes = {
    onReceiveUser: React.PropTypes.func.isRequired
  };

  return routeNode(action)(SignupLoginContainer);
}

export default getSignupLoginContainer;
