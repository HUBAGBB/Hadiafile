import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Layout, Card, Button, Typography, message, Spin, Row, Col, 
  Tag, Tooltip, Space, Progress, Divider, Modal, Input
} from 'antd';
import { 
  DownloadOutlined, FileOutlined, UserOutlined, CalendarOutlined,
  SafetyOutlined, LinkOutlined, CopyOutlined, EyeOutlined
} from '@ant-design/icons';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';

const { Content } = Layout;
const { Title, Text } = Typography;

const SharedFile = () => {
  const { shareId } = useParams();
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [shareModalVisible, setShareModalVisible] = useState(false);

  useEffect(() => {
    const fetchSharedFile = async () => {
      try {
        const fileRef = doc(db, 'sharedFiles', shareId);
        const fileSnap = await getDoc(fileRef);

        if (fileSnap.exists()) {
          setFileData({ id: fileSnap.id, ...fileSnap.data() });
        } else {
          message.error('Shared file not found');
        }
      } catch (error) {
        console.error('Error fetching shared file:', error);
        message.error(`Failed to fetch shared file. Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedFile();
  }, [shareId]);

  const handleDownload = async () => {
    try {
      setDownloadProgress(0);
      
      // 1. axios를 사용하여 파일 다운로드 시도
      const response = await axios.get(fileData.url, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setDownloadProgress(percentCompleted);
        },
      });

      // 2. Blob 생성 및 다운로드 링크 생성
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileData.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      message.success('Download completed successfully!');
      setDownloadProgress(100);
    } catch (error) {
      console.error('Download failed:', error);

      // 4. 대체 다운로드 방법 제공
      try {
        window.open(fileData.url, '_blank');
        message.success('다운로드가 시작되었습니다.');
      } catch (alternativeError) {
      }

      setDownloadProgress(100);
    }
  };

  const copyShareLink = () => {
    const shareLink = `${window.location.origin}/d/${shareId}`;
    navigator.clipboard.writeText(shareLink);
    message.success('공유 링크가 클립보드에 복사되었습니다!');
  };

  const getFileTypeTag = (fileType) => {
    if (fileType.includes('image')) return <Tag color="default">이미지</Tag>;
    if (fileType.includes('pdf')) return <Tag color="default">PDF</Tag>;
    if (fileType.includes('document')) return <Tag color="default">문서</Tag>;
    return <Tag color="default">파일</Tag>;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!fileData) {
    return (
      <Content style={{ padding: '50px' }}>
        <Card style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
          <Title level={3}>Shared File Not Found</Title>
          <Text>The file you're looking for doesn't exist or has been removed.</Text>
        </Card>
      </Content>
    );
  }

  const pageTitle = `Hadiafile - ${fileData.name}`;
  const pageDescription = `Kofile을 통해 공유된 ${fileData.name}을  다운로드하세요! 파일 크기: ${(fileData.size / (1024 * 1024)).toFixed(2)} MB.`;
  const pageUrl = `${window.location.origin}/d/${shareId}`;
  const fileIcon = getFileIcon(fileData.type); // Implement this function to return appropriate icon URL
  const color = getColorForFileType(fileData.type); // Implement this function to return appropriate color

  return (
    <Content style={{ padding: '50px' }}>
<Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={fileIcon} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={fileIcon} />

        {/* Discord */}
        <meta property="discord:color" content={color} />
        <meta property="theme-color" content={color} />
        <meta property="og:site_name" content="MegaClone" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
      </Helmet>

      <Card
        style={{ 
          maxWidth: 700, 
          margin: '0 auto', 
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row gutter={16} align="middle">
            <Col>
              <FileOutlined style={{ fontSize: 48, color: '#1890ff' }} />
            </Col>
            <Col flex="auto">
              <Title level={4} style={{ margin: 0 }}>{fileData.name}</Title>
              <Space size="small">
                {getFileTypeTag(fileData.type)}
                <Tag icon={<SafetyOutlined />} color="green">바이러스 없음</Tag>
              </Space>
            </Col>
          </Row>

          <Divider style={{ margin: '12px 0' }} />

          <Row gutter={16}>
            <Col span={12}>
              <Text type="secondary">크기</Text>
              <br />
              <Text strong>{`${(fileData.size / (1024 * 1024)).toFixed(2)} MB`}</Text>
            </Col>
            <Col span={12}>
              <Text type="secondary">공유 날짜</Text>
              <br />
              <Text strong>{new Date(fileData.sharedAt).toLocaleDateString()}</Text>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Text type="secondary">공유자</Text>
              <br />
              <Text strong>{fileData.sharedBy || 'Anonymous'}</Text>
            </Col>
            <Col span={12}>
              <Text type="secondary">다운로드 횟수</Text>
              <br />
              <Text strong>{fileData.downloadCount || 0}</Text>
            </Col>
          </Row>

          <Divider style={{ margin: '12px 0' }} />

          <Space>
            <Button type="primary" icon={<DownloadOutlined />} onClick={handleDownload}>
              다운로드
            </Button>
            <Button icon={<EyeOutlined />}>미리보기</Button>
            <Button icon={<LinkOutlined />} onClick={() => setShareModalVisible(true)}>
              공유
            </Button>
          </Space>

          {downloadProgress > 0 && (
            <Progress percent={downloadProgress} status="active" />
          )}
        </Space>
      </Card>

      <Modal
        title="파일 공유"
        visible={shareModalVisible}
        onCancel={() => setShareModalVisible(false)}
        footer={null}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input 
            value={`${window.location.origin}/d/${shareId}`}
            readOnly
            addonAfter={
              <Tooltip title="Copy link">
                <CopyOutlined onClick={copyShareLink} style={{ cursor: 'pointer' }} />
              </Tooltip>
            }
          />
          <Text type="secondary">모든 이용자가 해당 링크를 통해 파일을 다운로드 받을 수 있습니다.</Text>
        </Space>
      </Modal>
    </Content>
  );
};

const getFileIcon = (fileType) => {
  // Implement logic to return appropriate icon URL based on file type
  // For example:
  if (fileType.includes('image')) return '/icons/image-icon.png';
  if (fileType.includes('pdf')) return '/icons/pdf-icon.png';
  return '/icons/default-file-icon.png';
};

const getColorForFileType = (fileType) => {
  // Implement logic to return appropriate color based on file type
  // For example:
  if (fileType.includes('image')) return '#4CAF50';
  if (fileType.includes('pdf')) return '#F44336';
  return '#2196F3';
};

export default SharedFile;
