import React, { useState } from 'react';
import { Layout, Menu, Input } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  AudioOutlined,
} from '@ant-design/icons';
import { findByLabelText } from '@testing-library/react';
const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;

function CustomerList() {
  const [searchVal, setSearchVal] = useState('');
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  return (
    <div style={{ padding: 10 }}>
      <Search
        placeholder="input search text"
        onSearch={(searchVal) => console.log(searchVal)}
        enterButton
      />

      {/* <div className="CustomerList"> */}
      <div
        style={{ height: '500px', overflow: 'auto', backgroundColor: 'red' }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            박경덕1
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            박경덕2
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            박경덕3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            박경덕4
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            박경덕3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            박경덕4
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            박경덕3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            박경덕4
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            박경덕3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            박경덕4
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            박경덕3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            박경덕4
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            박경덕3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            박경덕4
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            박경덕4
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            박경덕3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            박경덕4
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            박경덕4
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            박경덕3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            박경덕4
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            박경덕4
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            박경덕3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            박경덕4
          </Menu.Item>{' '}
        </Menu>
      </div>
    </div>
  );
}

export default CustomerList;
