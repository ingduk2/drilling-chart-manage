import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Layout, Menu, Upload, Typography, Input, Button } from 'antd';
import { firestore } from 'firebase/FirebaseConfig';
import ManualUpload from './ManualUpload';
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

interface MatchParams {
  id: string;
}

type data = {
  memo: string;
  name: string;
  phoneNumber: string;
  // storageUrl: string;
};

type image = {
  imageUrl: string;
  fileName: string;
};
function UpdateForm({ match }: RouteComponentProps<MatchParams>) {
  const id = match.params.id;

  const [fileLists, setFileList] = useState<any[]>([]);

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [memo, setMemo] = useState('');

  const [imageList, setImageList] = useState<image[]>([]);
  useEffect(() => {
    //firestore 가져와야함
    const fetchData = async () => {
      await firestore
        .collection('customer')
        .doc(id)
        .get()
        .then((doc) => {
          // console.log(`${doc.id} => ${doc.data()}`);
          //   console.log('==========================', doc.data());
          //set name , memo , phoneNumber
          setName(doc.data()?.firestoreData.name);
          setMemo(doc.data()?.firestoreData.memo);
          setPhoneNumber(doc.data()?.firestoreData.phoneNumber);

          //set fileList and imageList
          const storageList: image[] = doc.data()?.firestoreData.storageUrl;
          //   console.log('---', storageList);
          const files: any[] = [];
          const newImageList: image[] = [];
          storageList.map((item, idx) => {
            files.push({
              uid: idx,
              name: item.fileName,
              status: 'done',
              url: item.imageUrl,
            });
            newImageList.push({
              imageUrl: item.imageUrl,
              fileName: item.fileName,
            });
          });
          setImageList(newImageList);
          setFileList(files);
        });
    };
    fetchData();
  }, [match]);

  /**
   * 수정된 정보 update
   * @param e
   */
  const saveCustomer = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    const firestoreData = {
      name: name,
      phoneNumber: phoneNumber,
      memo: memo,
      storageUrl: imageList,
    };
    firestore
      .collection('customer')
      .doc(id)
      .set({
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

  /**
   * manualUpload 에서 image 정보 add
   * @param imageUrl
   * @param fileName
   */
  const addImageUpload = (imageUrl: string, fileName: string) => {
    imageList.push({ imageUrl, fileName });
    setImageList(imageList);
    console.log('-upddate addeImageUpload', imageList);
  };

  /**
   * manualUpload 에서 image 정보 delete
   * @param idx
   */
  const deleteImageUpload = (idx: number) => {
    imageList.splice(idx, 1);
    console.log('-update deleteImageUpload', imageList);
  };

  return (
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
        fileList={fileLists}
      />
      <Button type="primary" onClick={saveCustomer}>
        저장
      </Button>
    </Content>
  );
}

export default UpdateForm;
