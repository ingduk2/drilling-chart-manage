import React, { useState } from 'react';
import { AuthWrapper } from 'components/Auth';
import { Route } from 'react-router-dom';
import { Login, Register } from 'containers/Auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  console.log(isLogin);
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        scopes: [],
      },
      {
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        scopes: ['public_profile', 'email'],
      },
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <div>
      {!isLogin && (
        <AuthWrapper>
          {/* <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          /> */}
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
        </AuthWrapper>
      )}
      {isLogin && <p>Welcome</p>}
    </div>
  );
}

export default Auth;
