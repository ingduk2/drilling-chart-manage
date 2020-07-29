import React, { useState } from 'react';
import { Upload, message, Input, Button, Layout } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { storage, firestore } from '../../firebase/FirebaseConfig';

function ManualUpload() {
  const [fileList, setFileList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageList, setImageList] = useState<string[]>([]);

  const firestorageSave = async (image: File) => {
    console.log('logding');
    await setLoading(true);
    const uploadTask = storage.ref(`images/${image!.name}`).put(image!);
    // const uploadTask = storage.ref(`images/test.png`).put(image!);
    // await uploadTask.on(
    await storage
      .ref(`images/${image!.name}`)
      .put(image!)
      .on(
        'state_changed',
        (snapshot) => {
          // setLoading(true);
          //   const progress = Math.round(
          //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          //   );
          //   setProgress(progress);
        },
        (error) => {
          console.log(error);
          alert('이미지 업로드 실패');
        },
        () => {
          storage
            .ref(`images`)
            .child(image!.name)
            //   .child('test.png')
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              setLoading(false);
              imageList.push(url);
              setImageList(imageList);
              console.log(imageList);
              //   alert('이미지 업로드 성공');
            });
        },
      );
    // await setLoading(false);
    console.log('end loading');
  };

  const antdUploadProps: any = {
    listType: 'picture-card',
    fileList,
    // showUploadList: {
    //     showRemoveIcon: false,
    //   },
    beforeUpload: async (file: any) => {
      await console.log('beforeUpload', file);
      await firestorageSave(file);
      await console.log('afterUpload');
      let count = [];
      let files: Array<any> = [];
      files = fileList;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        file.thumbUrl = e.target?.result;
        files.push(file);
        files.map((item: any, index: any) => {
          if (file.name === item.name) {
            count.push(index);
            if (count.length > 1) {
              message.error('error');
              files.splice(index, 1);
              return;
            }
          }
        });
        const fileObj: any = [];
        files.map((item: any, index: number) => {
          fileObj.push({ ...item });
        });
        console.log('result ', [{ ...files }]);
        console.log('result ', fileObj);
        setFileList(fileObj);
      };
      return false;
    },
    // onChange: ({ fileList: newFileList }: any) => {
    //   console.log('newfileList', newFileList);
    //   console.log('fileList', fileList);
    //   setFileList(newFileList);
    // },
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const deleteFiresTore = () => {
    const deleteref = storage.ref(
      `/images/test/스크린샷 2020-07-12 오후 5.31.34.png`,
    );
    deleteref
      .delete()
      .then(() => {
        alert('성공');
      })
      .catch((error) => {
        alert('실패');
      });
    // const storageRef = storage.ref(`/`);

    // Create a reference under which you want to list
    // var listRef = storageRef.child('images');

    // Find all the prefixes and items.
    // listRef
    //   .listAll()
    //   .then(function (res) {
    //     res.prefixes.forEach(function (folderRef) {
    //       // All the prefixes under listRef.
    //       // You may call listAll() recursively on them.
    //       //   console.log('folderRef', folderRef);
    //       folderRef.delete();
    //     });
    //     res.items.forEach(function (itemRef) {
    //       console.log('itemRef', itemRef);
    //       itemRef.delete();
    //     });
    //   })
    //   .catch(function (error) {
    //     alert(error);
    //   });
  };

  return (
    <div>
      <Upload {...antdUploadProps}>{uploadButton}</Upload>
      {/* <button onClick={deleteFiresTore}>firestorage delete</button> */}
    </div>
  );
}

export default ManualUpload;
