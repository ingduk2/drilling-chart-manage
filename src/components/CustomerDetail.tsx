import React from 'react';

import { Layout, Menu } from 'antd';
import UploadForm from './UploadForm';
const { Content, Footer, Sider } = Layout;
function CustomerDetail() {
  return (
    <div>
      <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 500,
        }}
      >
        <UploadForm />
      </Content>
    </div>
  );
}

export default CustomerDetail;
