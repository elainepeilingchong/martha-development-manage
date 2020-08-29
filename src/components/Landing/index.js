import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
 
const LandingPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Landing Page </h1>
      </div>
    )}
  </AuthUserContext.Consumer>
);
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(LandingPage);