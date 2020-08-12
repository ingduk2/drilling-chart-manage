import React from 'react';
import { Layout, Menu, Upload, Typography } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

function MainContent() {
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 500,
      }}
    >
      <div>지공회원관리시스템</div>
    </Content>
  );
}

export default MainContent;
