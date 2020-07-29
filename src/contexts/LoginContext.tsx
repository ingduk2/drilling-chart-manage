import React, { createContext, Dispatch, useContext, useReducer } from 'react';

export type Login = {
  uid: string;
  email: string | null;
};

const LoginContext = createContext<Login | undefined>(undefined);

type Action =
  | { type: 'LOGIN'; email: string | null; uid: string }
  | { type: 'SIGNIN'; email: string | null; uid: string }
  | { type: 'LOGOUT'; email: string | null; uid: string };

type LoginDispatch = Dispatch<Action>;
const LoginDispatchContext = createContext<LoginDispatch | undefined>(
  undefined,
);

function loginReducer(state: Login, action: Action): Login {
  switch (action.type) {
    case 'LOGIN':
      const loginInfo = {
        email: action.email,
        uid: action.uid,
      };
      localStorage.setItem('LoginInfo', JSON.stringify(loginInfo));
      return loginInfo;
    case 'SIGNIN':
      console.log('SIGNIN');
    case 'LOGOUT':
      return {
        email: action.email,
        uid: action.uid,
      };
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
