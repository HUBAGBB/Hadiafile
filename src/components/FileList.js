import React, { useState } from 'react';
import { List, Avatar, Space, Button, Popconfirm, message, Tooltip, Modal, Input } from 'antd';
import { DeleteOutlined, DownloadOutlined, ShareAltOutlined, FileOutlined, FilePdfOutlined, FileImageOutlined, FileZipOutlined } from '@ant-design/icons';
import { deleteFile, deleteFileFromStorage, auth } from '../services/firebase';
import { shareFile } from '../utils/shareUtils';

const FileItem = ({ file, onDelete }) => {
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const handleDelete = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user logged in');
      }
      await deleteFile(user.uid, file.id);
      await deleteFileFromStorage(user.uid, file.name);
      onDelete(file.id);
      message.success(`${file.name} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting file:', error);
      message.error(`Failed to delete ${file.name}.`);
    }
  };

  const handleShare = async () => {
    try {
      const { shareLink } = await shareFile(file);
      setShareLink(shareLink);
      setIsShareModalVisible(true);
    } catch (error) {
      console.error('Error sharing file:', error);
      message.error(`Failed to share ${file.name}.`);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return <FilePdfOutlined style={{ color: '#ff4d4f' }} />;
    if (fileType.includes('image')) return <FileImageOutlined style={{ color: '#52c41a' }} />;
    if (fileType.includes('zip')) return <FileZipOutlined style={{ color: '#faad14' }} />;
    return <FileOutlined style={{ color: '#1890ff' }} />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <List.Item
      key={file.id}
      actions={[
        <Tooltip title="다운로드">
          <Button icon={<DownloadOutlined />} href={file.url} download={file.name} />
        </Tooltip>,
        <Tooltip title="공유">
          <Button icon={<ShareAltOutlined />} onClick={handleShare} />
        </Tooltip>,
        <Popconfirm
          title="정말로 파일을 삭제하실건가요?"
          onConfirm={handleDelete}
          okText="네"
          cancelText="아니요"
        >
          <Tooltip title="삭제">
            <Button icon={<DeleteOutlined />} danger />
          </Tooltip>
        </Popconfirm>
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar 
            icon={getFileIcon(file.type)} 
            shape="square" 
            size={48} 
            style={{ backgroundColor: '#ffffff0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          />
        }
        title={file.name}
        description={
          <Space>
            <span>{formatFileSize(file.size)}</span>
            <span>•</span>
            <span>{new Date(file.createdAt).toLocaleString()}</span>
          </Space>
        }
      />
      <Modal
        title="파일 공유"
        visible={isShareModalVisible}
        onOk={() => setIsShareModalVisible(false)}
        onCancel={() => setIsShareModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsShareModalVisible(false)}>
            닫기
          </Button>,
          <Button 
            key="copy" 
            type="primary" 
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              message.success('클립보드에 복사되었습니다!');
            }}
          >
            링크 복사
          </Button>
        ]}
      >
        <p>해당 링크로 파일을 공유하세요:</p>
        <Input value={shareLink} readOnly />
      </Modal>
    </List.Item>
  );
};

const FileList = ({ files, setFiles }) => {
  const handleDelete = (fileId) => {
    setFiles(files.filter(file => file.id !== fileId));
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={files}
      renderItem={(file) => <FileItem file={file} onDelete={handleDelete} />}
      style={{ background: '#ffffff0a', borderRadius: '8px', padding: '16px' }}
    />
  );
};

export default FileList;