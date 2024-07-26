import React, { useState, useEffect } from 'react';
import { Layout, Typography, Space, Card } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import FileUploader from '../components/FileUploader';
import FileList from '../components/FileList';
import { auth, db } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const { Content } = Layout;
const { Title } = Typography;

const UploadPage = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, 'users', user.uid, 'files'));
        const querySnapshot = await getDocs(q);
        const fetchedFiles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFiles(fetchedFiles);
      }
    };

    fetchFiles();
  }, []);

  const handleFileUploaded = (newFile) => {
    setFiles(prevFiles => [...prevFiles, newFile]);
  };

  return (
    <Layout className="layout" style={{ minHeight: '100vh', background: '#000000' }}>
      <Content>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card>
            <Title level={2} style={{ marginBottom: 0 }}>
              <CloudUploadOutlined /> Hadiafile 대시보드
            </Title>
          </Card>
          
          <Card title="파일 업로드">
            <FileUploader onFileUploaded={handleFileUploaded} />
          </Card>
          
          <Card title="업로드된 파일">
            <FileList files={files} setFiles={setFiles} />
          </Card>
        </Space>
      </Content>
    </Layout>
  );
};

export default UploadPage;