import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Checkbox, Input } from 'antd';

import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
} from 'components/Auth';
import firebase from 'firebase';
import { useLoginDispatch } from 'contexts/LoginContext';

function Login({ history }: RouteComponentProps) {
  const dispatch = useLoginDispatch();

  useEffect(() => {
    // console.log('====login', firebase.auth().currentUser);
    // console.log('====login', firebase.auth().currentUser!.uid);
    const loginInfo: string | null = localStorage.getItem('LoginInfo');
    if (loginInfo !== null) {
      const jsonLoginInfo = JSON.parse(loginInfo);
      console.log(jsonLoginInfo);
      const savedMaintain: string = jsonLoginInfo.maintain;
      if (savedMaintain === 'T') {
        history.push('/home');
      }
    }
  }, []);

  console.log('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMaintain, setIsLoginMaintain] = useState(false);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const login = async () => {
    let isError: boolean = false;
    await firebase
      .auth()
      // .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .setPersistence(
        isLoginMaintain
          ? firebase.auth.Auth.Persistence.LOCAL
          : firebase.auth.Auth.Persistence.SESSION,
      )
      .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        isError = true;
        alert('로그인 실패');
      });
    if (!isError) {
      dispatch({
        type: 'LOGIN',
        email: firebase.auth().currentUser!.email,
        uid: firebase.auth().currentUser!.uid,
        maintain: isLoginMaintain ? 'T' : 'F',
      });
      console.log('====', firebase.auth().currentUser!.email);
      console.log('====', firebase.auth().currentUser!.uid);
      // alert(firebase.auth());
      // alert('로그인 성공');
      console.log('====', firebase.auth());
      history.push('/home');
    }
  };

  const checkChange = () => {
    setIsLoginMaintain(!isLoginMaintain);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      login();
    }
  };
  return (
    <AuthContent title="로그인">
      <InputWithLabel
        label="이메일"
        name="email"
        placeholder="이메일"
        onChange={handleChange}
      />
      <InputWithLabel
        label="비밀번호"
        name="password"
        placeholder="비밀번호"
        type="password"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />

      <Checkbox onChange={checkChange}>로그인 유지</Checkbox>
      <AuthButton onClick={login}>로그인</AuthButton>
      <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
    </AuthContent>
  );
}

export default Login;
