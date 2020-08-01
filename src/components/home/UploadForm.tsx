import React, { useState } from 'react';
import { Upload, message, Input, Button, Layout } from 'antd';
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { storage, firestore } from '../../firebase/FirebaseConfig';
import { useLoginState } from 'contexts/LoginContext';
import ManualUpload from './ManualUpload';
const { TextArea } = Input;
const { Content } = Layout;

function UploadForm() {
  const Login = useLoginState();
  console.log(
    'uploadForm',
    localStorage.getItem('LoginInfo'),
    '===',
    window.sessionStorage.getItem('LoginInfo'),
  );

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [memo, setMemo] = useState('');
  const [storageUrl, setStorageUrl] = useState('');
  const [imageList, setImageList] = useState<string[]>([]);

  const saveCustomer = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    const firestoreData = {
      name: name,
      phoneNumber: phoneNumber,
      memo: memo,
      storageUrl: imageList,
    };
    console.log(firestoreData);
    firestore
      .collection('customer')
      // .doc('a')
      // .set({
      //   firestoreData,
      // })
      .add({
        firestoreData,
      })
      .then(() => {
        console.log('Success');
        alert('저장 성공');
      })
      .catch((error) => {
        console.error('error');
        alert('저장 실패');
      });
  };

  // console.log('image', image);

  const handleImageUpload = (imageUrl: string) => {
    imageList.push(imageUrl);
    setImageList(imageList);
    console.log('-handleImageUpload', imageList);
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
        <div style={{ width: '50%' }}>
          <div>이름</div>
          <Input
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div>연락처</div>
          <Input
            placeholder="연락처"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div>메모</div>
          <TextArea
            rows={4}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
        <ManualUpload handleImageUpload={handleImageUpload} />
        <div>
          <Button type="primary" onClick={saveCustomer}>
            저장
          </Button>
        </div>
      </Content>
    </div>
  );
}

export default UploadForm;
