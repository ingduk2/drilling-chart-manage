import React, { useState, useEffect } from 'react';
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
  AuthError,
} from 'components/Auth';
import firebase from 'firebase';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      setEmail('');
      setPasswordConfirm('');
      setPassword('');
      setError(null);
    };
  }, []);

  const register = async () => {
    let isError: boolean = false;
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        isError = true;
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (errorCode === 'auth/email-already-in-use') {
          setError('이미 가입되어있는 아이디입니다.');
        }
      });
    if (!isError) setError('가입이 완료되었습니다.');
  };
  const validate: any = {
    email: (value: string) => {
      console.log('validate');
      if (!isEmail(value)) {
        setError('잘못된 이메일 형식 입니다.');
        return false;
      }
      setError(null);
      return true;
    },
    // username: (value: string) => {
    //   if (!isAlphanumeric(value) || !isLength(value, { min: 4, max: 15 })) {
    //     setError('아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.');
    //     return false;
    //   }
    //   return true;
    // },
    password: (value: string) => {
      if (!isLength(value, { min: 6 })) {
        setError('비밀번호를 6자 이상 입력하세요.');
        return false;
      }
      setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
      return true;
    },
    passwordConfirm: (value: string) => {
      console.log('======', password, value);
      if (password !== value) {
        setError('비밀번호확인이 일치하지 않습니다.');
        return false;
      }
      setError(null);
      return true;
    },
  };

  const setData: any = {
    email: (value: string) => {
      setEmail(value);
    },
    password: (value: string) => {
      setPassword(value);
    },
    passwordConfirm: (value: string) => {
      setPasswordConfirm(value);
    },
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(typeof name, name, value);
    setData[name](value);
    const validation = validate[name](value);
    if (name.indexOf('password') > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침
  };

  const clearInfo = () => {
    alert('clear');
    setEmail('');
    setPasswordConfirm('');
    setPassword('');
    setError(null);
  };
  return (
    <AuthContent title="회원가입">
      <InputWithLabel
        label="이메일"
        name="email"
        placeholder="이메일"
        onChange={handleChange}
      />
      {/* <InputWithLabel label="아이디" name="username" placeholder="아이디" /> */}
      <InputWithLabel
        label="비밀번호"
        name="password"
        placeholder="비밀번호"
        type="password"
        onChange={handleChange}
      />
      <InputWithLabel
        label="비밀번호 확인"
        name="passwordConfirm"
        placeholder="비밀번호 확인"
        type="password"
        onChange={handleChange}
      />
      {error && <AuthError>{error}</AuthError>}
      <AuthButton onClick={register}>회원가입</AuthButton>
      <RightAlignedLink onClick={clearInfo} to="/auth/login">
        로그인
      </RightAlignedLink>
    </AuthContent>
  );
}

export default Register;
