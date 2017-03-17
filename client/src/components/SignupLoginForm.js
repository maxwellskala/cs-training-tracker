import React, { Component } from 'react';
import './SignupLoginForm.css';

const EMAIL = 'email';
const PASSWORD = 'password';

class SignupLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [EMAIL]: '',
      [PASSWORD]: ''
    };

    this.getFormToggleText = this.getFormToggleText.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  };

  getFormToggleText() {
    const { action, changeAction } = this.props;
    const className = 'toggle-form-text';
    return action === 'login'
      ? (
          <p className={className}>
            Don't have an account? <a onClick={changeAction}>Signup</a>
          </p>
        )
      : (
          <p className={className}>
            Already have an account? <a onClick={changeAction}>Login</a>
          </p>
        );
  };

  getHandleChange(stateKey) {
    return (e) => {
      return this.setState({ [stateKey]: e.target.value });
    };
  };

  renderErrors() {
    const { errors } = this.props;
    if (!errors || !errors.length) {
      return null;
    }
    const errorChildren = errors.map((errorText) => {
      return <p key={errorText} className='error'>{errorText}</p>;
    });
    return (
      <div className='errors-container'>
        {errorChildren}
      </div>
    );
  };

  render() {
    const { action, onSubmit, onReceiveUser } = this.props;
    const { email, password } = this.state;
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(
        email,
        password,
        onReceiveUser
      );
    };
    return (
      <div className='SignupLoginForm'>
        <h3>{action === 'login' ? 'Login' : 'Signup'}</h3>
        {this.getFormToggleText()}
        {this.renderErrors()}
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type='text'
              value={email}
              onChange={this.getHandleChange(EMAIL)}
            />
          </label>
          <label>
            Password:
            <input
              type='text'
              value={password}
              onChange={this.getHandleChange(PASSWORD)}
            />
          </label>
          <button type='submit' value='Submit'>Submit</button>
        </form>
      </div>
    );
  };
}

SignupLoginForm.propTypes = {
  action: React.PropTypes.string.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onReceiveUser: React.PropTypes.func.isRequired,
  changeAction: React.PropTypes.func.isRequired,
  errors: React.PropTypes.array,
};

export default SignupLoginForm;
