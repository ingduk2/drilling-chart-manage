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

import logo from '../../resource/logo.png';
import CustomerList from './CustomerList';

const { Header, Content, Footer, Sider } = Layout;

type wrapperParam = {
  children: React.ReactNode;
  history: RouteComponentProps;
};

//각각해도 안되고 이상하다 ㅡㅡ 아직 type스크립트 모르겠다..
function HomeWrapper({ history, children }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const goUploadForm = () => {
    history.push('/home/upload');
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
              사용자 추가
            </Button>
          </Header>
          {children}
        </Layout>
      </Layout>
    </div>
  );
}
export default withRouter(HomeWrapper);
