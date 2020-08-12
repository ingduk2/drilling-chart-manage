import React from 'react';
import {
  HomeWrapper,
  UploadForm,
  CustomerDetail,
  MainContent,
  UpdateForm,
} from 'components/home';
import { useLoginState } from 'contexts/LoginContext';
import { Route } from 'react-router-dom';
function Home() {
  const Login = useLoginState();
  console.log('loginState', Login);
  return (
    <HomeWrapper>
      {/* <Route path="/home" component={CustomerList}/> */}
      <Route path="/home/main" component={MainContent} />
      <Route path="/home/upload" component={UploadForm} />
      <Route path="/home/detail/:id" component={CustomerDetail} />
      <Route path="/home/update/:id" component={UpdateForm} />
    </HomeWrapper>
  );
}

export default Home;
