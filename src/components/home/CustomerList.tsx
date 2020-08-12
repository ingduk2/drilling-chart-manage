import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input } from 'antd';
import { UserOutlined, AudioOutlined } from '@ant-design/icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { firestore } from 'firebase/FirebaseConfig';
const { Search } = Input;

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
    console.log('customerList useEffect');
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
        })
        .catch((error) => {
          alert('로그인 하지 않았거나 관리 ID가 아닙니다.');
          history.push('/');
          console.log(error);
        });
      setCustomerData(customerDatas);
    };
    fetchData();
  }, []);
  // console.log('----', customerData);

  /**
   * go detail
   * @param e
   */
  const detail = (e: any | undefined) => {
    console.log(e.key);
    history.push(`/home/detail/${e.key}`);
  };

  /**
   * search
   * @param searchVal
   */
  const search = (searchVal: string) => {
    setSearchVal(searchVal);
  };

  return (
    <div style={{ padding: 10 }}>
      <Search placeholder="input search text" onSearch={search} enterButton />

      {/* <div className="CustomerList"> */}
      <div style={{ height: '500px', overflow: 'auto' }}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
          {customerData!.map((data) => {
            if (searchVal === '' || data.name.includes(searchVal)) {
              return (
                <Menu.Item
                  onClick={detail}
                  key={data.id}
                  icon={<UserOutlined />}
                >
                  {data.name}
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </div>
    </div>
  );
}

export default withRouter(CustomerList);
