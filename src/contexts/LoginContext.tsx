import React, { createContext, Dispatch, useContext, useReducer } from 'react';

export type Login = {
  uid: string;
  email: string | null;
  maintain: string;
};

const LoginContext = createContext<Login | undefined>(undefined);

type Action =
  | { type: 'LOGIN'; email: string | null; uid: string; maintain: string }
  | { type: 'SIGNIN'; email: string | null; uid: string; maintain: string }
  | { type: 'LOGOUT'; email: string | null; uid: string; maintain: string };

type LoginDispatch = Dispatch<Action>;
const LoginDispatchContext = createContext<LoginDispatch | undefined>(
  undefined,
);

function loginReducer(state: Login, action: Action): Login {
  console.log('loginReducer', action.type);
  switch (action.type) {
    case 'LOGIN':
      const loginInfo = {
        email: action.email,
        uid: action.uid,
        maintain: action.maintain,
      };
      localStorage.setItem('LoginInfo', JSON.stringify(loginInfo));
      // window.sessionStorage.setItem('LoginInfo', JSON.stringify(loginInfo));
      return loginInfo;
    case 'SIGNIN':
      console.log('SIGNIN');
    case 'LOGOUT':
      const logoutInfo = {
        email: action.email,
        uid: action.uid,
        maintain: action.maintain,
      };
      localStorage.setItem('LoginInfo', JSON.stringify(logoutInfo));
      return logoutInfo;
    default:
      throw new Error('Unhandled action');
  }
}

export function LoginContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [Login, dispatch] = useReducer(loginReducer, {
    email: '',
    uid: '',
    maintain: '',
  });

  return (
    <LoginDispatchContext.Provider value={dispatch}>
      <LoginContext.Provider value={Login}>{children}</LoginContext.Provider>
    </LoginDispatchContext.Provider>
  );
}

export function useLoginState() {
  const state = useContext(LoginContext);
  if (!state) throw new Error('TodosProvider not found');
  return state;
}

export function useLoginDispatch() {
  const dispatch = useContext(LoginDispatchContext);
  if (!dispatch) throw new Error('TodosProvider not found');
  return dispatch;
}
