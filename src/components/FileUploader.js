import React, { useState, useContext } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { uploadFile, addFile, auth } from '../services/firebase';
import { v4 as uuidv4 } from 'uuid';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../translations';

const { Dragger } = Upload;

const FileUploader = ({ onFileUploaded }) => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {
    const user = auth.currentUser;
    if (!user) {
      message.error('먼저 로그인 해주세요');
      return false;
    }

    setUploading(true);
    try {
      const fileName = `${uuidv4()}-${file.name}`;
      const { downloadURL } = await uploadFile(file, user.uid, fileName);

      const fileData = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: downloadURL,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      };

      await addFile(user.uid, fileData);
      
      if (typeof onFileUploaded === 'function') {
        onFileUploaded(fileData);
      } else {
        console.warn('onFileUploaded is not a function');
      }
      
      message.success(`${file.name} file uploaded successfully`);
      return true;
    } catch (error) {
      console.error('Error uploading file:', error);
      let errorMessage = `${file.name} file upload failed. `;
      if (error.code === 'storage/unauthorized') {
        errorMessage += 'User doesn\'t have permission to access the object. Please check Firebase Storage rules.';
      } else if (error.code === 'storage/canceled') {
        errorMessage += 'User canceled the upload.';
      } else if (error.code === 'storage/unknown') {
        errorMessage += 'Unknown error occurred, inspect error.serverResponse';
      } else {
        errorMessage += error.message;
      }
      message.error(errorMessage);
      return false;
    } finally {
      setUploading(false);
    }
  };

  const props = {
    name: 'file',
    multiple: true,
    beforeUpload: (file) => {
      const isLt5G = file.size / 1024 / 1024 < 5120;
      if (!isLt5G) {
        message.error('File must be smaller than 5GB!');
      }
      return isLt5G;
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      const success = await handleUpload(file);
      if (success) {
        onSuccess("ok");
      } else {
        onError("upload failed");
      }
    },
  };

  return (
    <Dragger {...props} disabled={uploading}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{t.dragDropText}</p>
      <p className="ant-upload-hint">
      {t.dragDropSubText}
      </p>
    </Dragger>
  );
};

export default FileUploader;