import React, { useState, useEffect } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { storage, firestore } from '../../firebase/FirebaseConfig';
import { Progress } from 'antd';

type props = {
  addImageUpload: Function;
  deleteImageUpload: Function;
  fileList: any | undefined;
};

function ManualUpload(props: props) {
  const [fileList, setFileList] = useState<any>([]);
  const [imageList, setImageList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const { addImageUpload, deleteImageUpload } = props;

  useEffect(() => {
    console.log('useEffect', props.fileList ? props.fileList : []);
    //setFileList from props
    setFileList(props.fileList ? props.fileList : []);

    //setImageList from props.fileList
    const newImageList: string[] = [];
    (props.fileList ? props.fileList : []).map((item: any, index: number) => {
      newImageList.push(item.name);
    });
    setImageList(newImageList);
    // console.log(newImageList);
  }, [props.fileList]);

  /**
   * firestorage Image Save
   * @param image
   */
  const firestorageSave = async (image: File) => {
    console.log('logding');
    await setLoading(true);
    // const uploadTask = storage.ref(`images/${image!.name}`).put(image!);
    // const uploadTask = storage.ref(`images/test.png`).put(image!);
    // await uploadTask.on(
    const fileName = Date.now().toString();
    await storage
      .ref(`images/${fileName}`)
      .put(image!)
      .on(
        'state_changed',
        (snapshot) => {
          // setLoading(true);
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
            .ref(`images`)
            .child(fileName)
            //   .child('test.png')
            .getDownloadURL()
            .then((url) => {
              alert('이미지 업로드 성공');
              console.log(url);
              setLoading(false);
              imageList.push(`/images/${fileName}`);
              addImageUpload(url, `/images/${fileName}`);
            });
        },
      );
    // await setLoading(false);
    console.log('end loading');
  };

  /**
   * antd Upload Props override
   */
  const antdUploadProps: any = {
    listType: 'picture-card',
    // fileList,
    showUploadList: {
      showPreviewIcon: false,
    },
    beforeUpload: (file: any) => {
      setProgress(0);
      console.log('beforeUpload', file);
      firestorageSave(file);
      console.log('afterUpload');
      let count = [];
      let files: Array<any> = [];
      files = fileList;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        file.thumbUrl = e.target?.result;
        file.status = 'done';
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
    onRemove: (file: any) => {
      console.log(file);
      const removeIndex: number = fileList.findIndex(
        (e: any, idx: number) => e.uid === file.uid,
      );
      console.log(removeIndex);
      fileList.splice(removeIndex, 1);

      //img 정보 가져오기 삭제위해서
      const imageRef: string = imageList[removeIndex];
      imageList.splice(removeIndex, 1);
      console.log(imageRef);

      console.log(fileList, imageList);
      deleteImageUpload(removeIndex);
      const deleteref = storage.ref(imageRef);
      deleteref
        .delete()
        .then(() => {
          alert('삭제 성공');
        })
        .catch((error) => {
          alert('삭제 실패');
        });

      const fileObj: any = [];
      fileList.map((item: any, index: number) => {
        fileObj.push({ ...item });
      });
      setFileList(fileObj);
    },
  };

  /**
   * upload Button
   */
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  /**
   * delete Test
   */
  const deleteFiresTore = () => {
    // const deleteref = storage.ref(
    //   `/images/test/스크린샷 2020-07-12 오후 5.31.34.png`,
    // );
    // deleteref
    //   .delete()
    //   .then(() => {
    //     alert('성공');
    //   })
    //   .catch((error) => {
    //     alert('실패');
    //   });
    const storageRef = storage.ref(`/`);

    // Create a reference under which you want to list
    var listRef = storageRef.child('images');

    // Find all the prefixes and items.
    listRef
      .listAll()
      .then(function (res) {
        res.prefixes.forEach(function (folderRef) {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          //   console.log('folderRef', folderRef);
          folderRef.delete();
        });
        res.items.forEach(function (itemRef) {
          console.log('itemRef', itemRef);
          itemRef.delete();
        });
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <>
      <Upload fileList={fileList} {...antdUploadProps}>
        {uploadButton}
      </Upload>
      <button onClick={deleteFiresTore}>firestorage delete</button>
      <div>{fileList.length}</div>
      {/* <Progress type="circle" percent={progress} width={80} /> */}
    </>
  );
}

export default ManualUpload;
