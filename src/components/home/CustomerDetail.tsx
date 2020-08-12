import React, { useState, useEffect } from 'react';

import { Layout, Upload, Typography, Button } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RouteComponentProps } from 'react-router-dom';
import { firestore } from 'firebase/FirebaseConfig';

const { Title } = Typography;
const { Content } = Layout;

interface MatchParams {
  id: string;
}

type data = {
  memo: string;
  name: string;
  phoneNumber: string;
  // storageUrl: string;
};

type file = {
  uid: number;
  name: string;
  status: string;
  url: string;
};

type image = {
  imageUrl: string;
  fileName: string;
};

function CustomerDetail({ match, history }: RouteComponentProps<MatchParams>) {
  const [customerData, setCustomerData] = useState<data | undefined>(undefined);

  const [fileLists, setFileList] = useState<any[]>([]);

  useEffect(() => {
    const id = match.params.id;
    //firestore 에서 불러오기 id 로 get
    const fetchData = async () => {
      await firestore
        .collection('customer')
        .doc(id)
        .get()
        .then((doc) => {
          // console.log('==========================', doc.data());
          setCustomerData({
            memo: doc.data()?.firestoreData.memo,
            name: doc.data()?.firestoreData.name,
            phoneNumber: doc.data()?.firestoreData.phoneNumber,
          });

          const imageList: image[] = doc.data()?.firestoreData.storageUrl;
          const files: any[] = [];
          (imageList ? imageList : []).map((item, idx) => {
            files.push({
              uid: idx,
              name: item.fileName,
              status: 'done',
              url: item.imageUrl,
            });
          });
          setFileList(files);
        });
    };
    fetchData();
  }, [match.params.id]);

  /**
   * antd custom
   */
  const showRemoveIcon = {
    showUploadList: {
      showRemoveIcon: false,
    },
  };

  /**
   * go update
   */
  const updateCustomer = () => {
    history.push(`/home/update/${match.params.id}`);
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
        <Button type="primary" onClick={updateCustomer}>
          정보 수정
        </Button>
      </Content>
    </div>
  );
}

export default CustomerDetail;
