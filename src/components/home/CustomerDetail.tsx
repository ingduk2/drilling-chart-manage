import React, { useState, useEffect } from 'react';

import { Layout, Menu, Upload, Typography } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RouteComponentProps } from 'react-router-dom';
import { firestore } from 'firebase/FirebaseConfig';

const { Title } = Typography;
const { Content, Footer, Sider } = Layout;

interface MatchParams {
  id: string;
}

type data = {
  memo: string;
  name: string;
  phoneNumber: string;
  storageUrl: string;
};

type file = {
  uid: string;
  name: string;
  status: string;
  url: string;
};
function CustomerDetail({ match }: RouteComponentProps<MatchParams>) {
  const [customerData, setCustomerData] = useState<data | undefined>(undefined);

  const [fileLists, setFileList] = useState<any>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: '',
    },
  ]);

  useEffect(() => {
    const id = match.params.id;
    //firestore 가져와야함
    const fetchData = async () => {
      await firestore
        .collection('customer')
        .doc(id)
        .get()
        .then((doc) => {
          // console.log(`${doc.id} => ${doc.data()}`);
          console.log('==========================', doc.data());
          setCustomerData({
            memo: doc.data()?.firestoreData.memo,
            name: doc.data()?.firestoreData.name,
            phoneNumber: doc.data()?.firestoreData.phoneNumber,
            storageUrl: doc.data()?.firestoreData.storageUrl,
          });
          fileLists[0].url = doc.data()?.firestoreData.storageUrl;
          setFileList([
            {
              uid: id,
              name: 'image.png',
              status: 'done',
              url: doc.data()?.firestoreData.storageUrl,
            },
          ]);
        });
    };
    fetchData();
  }, [match]);

  console.log('=================', customerData);
  const showRemoveIcon = {
    showUploadList: {
      showRemoveIcon: false,
    },
  };
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
        {/* <img src={customerData?.storageUrl} alt="" /> */}
        <ImgCrop rotate>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileLists}
            // onChange={onChange}
            // onPreview={onPreview}
            // showRemoveIcon={false}
            {...showRemoveIcon}
          ></Upload>
        </ImgCrop>

        <div>이름</div>
        <Title level={3}>{customerData?.name}</Title>
        <div>전화번호</div>
        <Title level={3}>{customerData?.phoneNumber}</Title>
        <div>메모</div>
        <Title level={3}>{customerData?.memo}</Title>
      </Content>
    </div>
  );
}

export default CustomerDetail;
