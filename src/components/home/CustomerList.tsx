import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  AudioOutlined,
} from '@ant-design/icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { firestore } from 'firebase/FirebaseConfig';
const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;

type data = {
  id: string;
  name: string;
  phoneNumber: string;
  memo: string;
  storageUrl: string;
};

function CustomerList({ history }: any) {
  console.log('CustomerList');
  const [searchVal, setSearchVal] = useState('');
  const [customerData, setCustomerData] = useState<data[] | undefined>([]);
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  useEffect(() => {
    const fetchData = async () => {
      const customerDatas: data[] = [];
      await firestore
        .collection('customer')
        .get()
        .then((data) => {
          // setCustomerData(data);
          data.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            // console.log('==== ', doc.data().firestoreData.name);
            customerDatas.push({
              id: doc.id,
              name: doc.data().firestoreData.name,
              phoneNumber: doc.data().firestoreData.phoneNumber,
              memo: doc.data().firestoreData.memo,
              storageUrl: doc.data().firestoreData.storageUrl,
            });
          });
        });
      setCustomerData(customerDatas);
    };
    fetchData();
  }, []);
  console.log('----', customerData);

  const test = (e: any | undefined) => {
    // console.log('---', e);
    console.log(e.key);
    // console.log();
    history.push(`/home/detail/${e.key}`);
  };
  return (
    <div style={{ padding: 10 }}>
      <Search
        placeholder="input search text"
        onSearch={(searchVal) => console.log(searchVal)}
        enterButton
      />

      {/* <div className="CustomerList"> */}
      <div style={{ height: '500px', overflow: 'auto' }}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
          {customerData!.map((data) => (
            <Menu.Item onClick={test} key={data.id} icon={<UserOutlined />}>
              {data.name}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  );
}

export default withRouter(CustomerList);
