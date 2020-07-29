import React from 'react';
import './Login.css';
import { RouteComponentProps } from 'react-router-dom';
import logo from '../../resource/logo.png';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { auth } from '../../firebase/FirebaseConfig';
import 'firebase/auth';
import firebase from 'firebase';
// interface Props extends RouteComponentProps {}

function Login({ history }: RouteComponentProps) {
  const provider = new firebase.auth.GoogleAuthProvider();
  const googleLogin = () => {
    // history.push('/home');
    auth.signInWithPopup(provider);
  };

  const facebookLogin = () => {
    history.push('/home');
  };

  return (
    <div className="container">
      <div className="loginForm">
        <img src={logo} alt="" />
        <FacebookLoginButton onClick={facebookLogin} />
        <GoogleLoginButton onClick={googleLogin} />
      </div>
    </div>
  );
}

export default Login;
