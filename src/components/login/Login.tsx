import React from 'react';
import { Button } from 'antd';
import './Login.css';
import { RouteComponentProps } from 'react-router-dom';
import logo from '../../resource/logo.png';
import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  TwitterLoginButton,
  AmazonLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton,
  MicrosoftLoginButton,
  BufferLoginButton,
} from 'react-social-login-buttons';

// interface Props extends RouteComponentProps {}

function Login({ history }: RouteComponentProps) {
  const googleLogin = () => {
    history.push('/home');
  };

  const facebookLogin = () => {
    history.push('/home');
  };

  return (
    <div className="container">
      <div
        style={{
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          border: '1px solid gray',
        }}
      >
        <img src={logo} alt="" />
        <FacebookLoginButton onClick={facebookLogin} />
        <GoogleLoginButton onClick={googleLogin} />
      </div>
    </div>
  );
}

export default Login;
