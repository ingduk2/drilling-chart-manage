import React, { useEffect } from 'react';
import './App.css';
import { Link, Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import Home from 'pages/Home';
import Auth from 'pages/Auth';
import { LoginContextProvider } from 'contexts/LoginContext';
function App() {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <LoginContextProvider>
        <Route exact path="/">
          <Redirect to="/auth/login"></Redirect>
        </Route>
        <Route path="/auth" component={Auth} />
        <Route path="/home" component={Home} />
      </LoginContextProvider>
    </div>
  );
}

export default App;
