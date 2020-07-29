import React, { useState } from 'react';
import { Upload, message, Input, Button, Layout } from 'antd';
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { storage, firestore } from '../../firebase/FirebaseConfig';
import { useLoginState } from 'contexts/LoginContext';
import ManualUpload from './ManualUpload';
const { TextArea } = Input;
const { Content } = Layout;

function getBase64(img: Blob, callback: Function) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: File) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

function UploadForm() {
  const Login = useLoginState();
  // console.log('uploadForm', Login);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [memo, setMemo] = useState('');
  const [storageUrl, setStorageUrl] = useState('');

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
    }
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      let file: any = e.target.files![0];
      console.log('input files', file);
      setImage(file);
    }
  };

  const handleUpload2 = () => {
    const uploadTask = storage.ref(`images/${name}/${image!.name}`).put(image!);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert('이미지 업로드 실패');
      },
      () => {
        storage
          .ref(`images/${name}`)
          .child(image!.name)
          .getDownloadURL()
          .then((url) => {
            setStorageUrl(url);
            alert('이미지 업로드 성공');
          });
      },
    );
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const saveCustomer = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    const firestoreData = {
      name: name,
      phoneNumber: phoneNumber,
      memo: memo,
      storageUrl: storageUrl,
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
        {/* <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </Upload> */}
        {/* <form> */}
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
        {/* <input type="file" onChange={handleChange2} />
        <div>
          <button onClick={handleUpload2}>upload</button>
          <progress value={progress} max="100" />
        </div> */}
        {/* <input type="submit" value="저장" onClick={saveCustomer} /> */}

        <ManualUpload />

        <Button type="primary" onClick={saveCustomer}>
          저장
        </Button>
      </Content>
    </div>
  );
}

export default UploadForm;
