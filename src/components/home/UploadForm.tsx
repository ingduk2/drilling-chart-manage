import React, { useState } from 'react';
import { Input, Button, Layout } from 'antd';
import { firestore } from '../../firebase/FirebaseConfig';
import { useLoginState } from 'contexts/LoginContext';
import ManualUpload from './ManualUpload';
const { TextArea } = Input;
const { Content } = Layout;

type image = {
  imageUrl: string;
  fileName: string;
};

function UploadForm({ history }: any) {
  const Login = useLoginState();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [memo, setMemo] = useState('');
  const [imageList, setImageList] = useState<image[]>([]);

  /**
   * 사용자 정보 firebase 저장
   * @param e
   */
  const saveCustomer = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    // console.log(firestoreData);

    const firestoreData = {
      name: name,
      phoneNumber: phoneNumber,
      memo: memo,
      storageUrl: imageList,
    };

    firestore
      .collection('customer')
      .add({
        firestoreData,
      })
      .then(() => {
        console.log('Success');
        alert('저장 성공');
        //list update 필요.
        history.push('/home');
      })
      .catch((error) => {
        console.error('error');
        alert('저장 실패');
      });
  };

  /**
   * ManualUpload 에서 imageUrl , fileName add
   * @param imageUrl
   * @param fileName
   */
  const addImageUpload = (imageUrl: string, fileName: string) => {
    imageList.push({ imageUrl, fileName });
    setImageList(imageList);
    // console.log('-addeImageUpload', imageList);
  };

  /**
   * ManualUpload 에서 imageUrl , fileName delete
   * @param idx
   */
  const deleteImageUpload = (idx: number) => {
    imageList.splice(idx, 1);
    // console.log('-deleteImageUpload', imageList);
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
        <ManualUpload
          addImageUpload={addImageUpload}
          deleteImageUpload={deleteImageUpload}
          fileList={undefined}
        />
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
