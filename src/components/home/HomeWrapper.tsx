import React, { useState } from 'react';
import './Home.css';
import { Layout, Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useLoginDispatch } from 'contexts/LoginContext';

import logo from '../../resource/logo.png';
import CustomerList from './CustomerList';
import firebase from 'firebase';

const { Header, Content, Footer, Sider } = Layout;

type wrapperParam = {
  children: React.ReactNode;
  history: RouteComponentProps;
};

//각각해도 안되고 이상하다 ㅡㅡ 아직 type스크립트 모르겠다..
function HomeWrapper({ history, children }: any) {
  const dispatch = useLoginDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const goUploadForm = () => {
    history.push('/home/upload');
  };

  const logOut = () => {
    //context 에서 날려야함
    dispatch({
      type: 'LOGOUT',
      email: '',
      uid: '',
      maintain: 'F',
    });

    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log('logout success');
        history.push('/');
      })
      .catch(function (error) {
        console.log('logout error', error);
      });
  };
  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <img src={logo} alt="" className="logoImg" />
          </div>
          <CustomerList></CustomerList>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: toggle,
              },
            )}
            <Button onClick={goUploadForm} type="dashed">
              추가
            </Button>
            <Button onClick={logOut} type="dashed">
              로그아웃
            </Button>
          </Header>
          {children}
        </Layout>
      </Layout>
    </div>
  );
}
export default withRouter(HomeWrapper);
