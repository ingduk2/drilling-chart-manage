import React from 'react';
import { HomeWrapper, UploadForm, CustomerDetail } from 'components/home';
import { useLoginState } from 'contexts/LoginContext';
import { Route } from 'react-router-dom';
function Home() {
  const Login = useLoginState();
  console.log('loginState', Login);
  return (
    <HomeWrapper>
      {/* <Route path="/home" component={CustomerList}/> */}
      <Route path="/home/upload" component={UploadForm} />
      <Route path="/home/detail/:id" component={CustomerDetail} />
    </HomeWrapper>
  );
}

export default Home;
