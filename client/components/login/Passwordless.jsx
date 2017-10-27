import request from 'superagent';
import React from 'react';
import swal from 'sweetalert';

// react-md
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';

// Modules
import query from 'lib/url/parse-hash-query';

// Constants
import { XACC } from 'constants/config';

export default class PasswordlessLogin extends React.Component {

  constructor(props) {
    super(props);

    this.state = { sent: false, email: query().email || '' };
  }

  /**
   * Sends the passwordless login link to the provided email.
   */
  onSend() {
    const email = this.state.email;

    request
      .get('api/login/passwordless/' + email)
      .end((err, res) => {
        if (err && res.body.error)
          swal('Error', res.body.message, 'error');
        else
          this.setState({ sent: true });
      });
  }

  /**
   * Attempts to login using the passwordless login authentication token.
   */
  onLogin() {
    const c = this.refs.code.value.split('_');

    location.href = `${XACC}api/login/passwordless/${c[0]}/${c[1]}`;
  }

  render() {
    if (!this.state.sent) {
      return (
        <div className='login-passwordless step-1'>
          <h2>Passwordless Login</h2>
          <p>
            Enter the email you use to login with. Emails that are only linked to a profile and not your actual account will not work.
          </p>

          <form className='md-paper md-paper--1 section flex'>
            <TextField
              id='email--email'
              type='email'
              label='Account Email'
              value={this.state.email}
              onChange={v => this.setState({ email: v })}
              className='md-cell'
            />

            <Button
              raised primary
              onClick={() => this.onSend()}
            >Next</Button>
          </form>
        </div>
      );
    }

    return (
      <div className='login-passwordless step-2'>
        <h2>Passwordless Login</h2>
        <p>
          A message was sent to your email that contains a passwordless login link and an authorization code.
          <br />
          Click the link in the message to bypass this step or copy and paste the authorization code below.
        </p>
        
        <form className='md-paper md-paper--1 section flex'>
          <TextField
            id='text--code'
            ref='code'
            type='text'
            label='Authorization Code'
            className='md-cell'
          />

          <Button
            raised primary
            onClick={() => this.onLogin()}
          >Login</Button>
        </form>
      </div>
    );
  }

}