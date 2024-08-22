import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Layout, Button, Typography, message, Spin, Row, Col, 
  Tooltip, Space, Progress, Modal, Input, Tag, Card
} from 'antd';
import { 
  DownloadOutlined, FileOutlined, UserOutlined, CalendarOutlined,
  SafetyOutlined, LinkOutlined, CopyOutlined, EyeOutlined,
  FilePdfOutlined, FileImageOutlined, FileWordOutlined, FileUnknownOutlined,
  CheckCircleOutlined, WarningOutlined, LoadingOutlined
} from '@ant-design/icons';
import { db } from '../services/firebase';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

const { Content } = Layout;
const { Title, Text } = Typography;

const scanAnimation = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const ScanContainer = styled.div`
  background-color: rgba(24, 144, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
`;

const ScanBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  background-color: #1890ff;
  animation: ${scanAnimation} 2s linear;
`;

const ScanContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: relative;
`;

const StyledLoadingOutlined = styled(LoadingOutlined)`
  font-size: 24px;
  color: #1890ff;
`;

const StyledCheckCircleOutlined = styled(CheckCircleOutlined)`
  font-size: 24px;
  color: #52c41a;
`;

const StyledContent = styled(Content)`
  padding: 50px;
  background: #0a0a0a;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileContainer = styled.div`
  background: #1a1a1a;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const FileIconWrapper = styled.div`
  font-size: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 20px;
  background: ${props => props.bgColor};
  color: white;
  margin: 0 auto 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const StyledTitle = styled(Title)`
  color: #ffffff !important;
  text-align: center;
  margin-bottom: 30px !important;
`;

const StyledText = styled(Text)`
  color: #999 !important;
  font-size: 16px;
`;

const StyledStrong = styled(Text)`
  color: #ffffff !important;
  font-size: 18px;
  font-weight: bold;
`;

const StyledProgress = styled(Progress)`
  .ant-progress-inner {
    background-color: #2a2a2a;
  }
  .ant-progress-text {
    color: #ffffff;
  }
`;

const StyledButton = styled(Button)`
  height: 50px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const InfoItem = styled.div`
  text-align: center;
  margin-bottom: 15px;
`;

const ScanResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: ${props => 
    props.scanning ? 'rgba(0, 0, 0, 0.05)' : 
    props.isVirus ? 'rgba(255, 77, 79, 0.1)' : 'rgba(76, 175, 80, 0.1)'};
  color: ${props => 
    props.scanning ? '#666' : 
    props.isVirus ? '#ff4d4f' : '#4CAF50'};
`;

const ScanStatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PoweredByContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PoweredByText = styled(Text)`
  font-size: 12px;
  color: #666;
  margin-right: 5px;
`;

const VirusTotalLogo = styled.img`
  height: 20px;
  width: auto;
`;

const SharedFile = () => {
  const [downloadCount, setDownloadCount] = useState(0);
  const { shareId } = useParams();
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const fetchSharedFile = async () => {
      try {
        const fileRef = doc(db, 'sharedFiles', shareId);
        const fileSnap = await getDoc(fileRef);

        if (fileSnap.exists()) {
          const data = { id: fileSnap.id, ...fileSnap.data() };
          setFileData(data);
          setDownloadCount(data.downloadCount || 0);
          await scanFile(data.url);
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

  const scanFile = async (fileUrl) => {
    try {
      // First, submit the URL to VirusTotal
      const submitResponse = await axios.post('https://www.virustotal.com/api/v3/urls', 
        `url=${encodeURIComponent(fileUrl)}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-apikey': "4944c82e40cfc6644ebbf2a9222264878b690b8ce7c743a5bd31a6398e36b8bc"
          }
        }
      );

      const analysisId = submitResponse.data.data.id;

      // Wait for a few seconds to allow VirusTotal to process the file
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Then, get the analysis results
      const resultResponse = await axios.get(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
        headers: {
          'x-apikey': "4944c82e40cfc6644ebbf2a9222264878b690b8ce7c743a5bd31a6398e36b8bc"
        }
      });

      const result = resultResponse.data.data.attributes;
      
      if (result.stats.malicious > 0) {
        setScanResult({ 
          isVirus: true, 
          message: `백신 59개 중 ${result.stats.malicious}개가 이 파일을 악성으로 탐지했습니다.` 
        });
      } else {
        setScanResult({ isVirus: false, message: '바이러스가 발견되지 않았습니다' });
      }
    } catch (error) {
      console.error('Error scanning file:', error);
      setScanResult({ isVirus: false, message: '바이러스를 스캔할 수 없습니다. 다운로드에 주의하세요!' });
    } finally {
      setScanning(false);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return <FilePdfOutlined />;
    if (fileType.includes('image')) return <FileImageOutlined />;
    if (fileType.includes('word')) return <FileWordOutlined />;
    return <FileUnknownOutlined />;
  };

  const getColorForFileType = (fileType) => {
    if (fileType.includes('pdf')) return '#FF5252';
    if (fileType.includes('image')) return '#2196F3';
    if (fileType.includes('word')) return '#4CAF50';
    return '#FFC107';
  };

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

       // 1. 다운로드 횟수 증가
       const fileRef = doc(db, 'sharedFiles', shareId);
       await updateDoc(fileRef, {
         downloadCount: increment(1)
       });
       setDownloadCount(prevCount => prevCount + 1);
      
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
    const shareLink = `${window.location.origin}/share/${shareId}`;
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
  const pageUrl = `${window.location.origin}/share/${shareId}`;
  const fileIcon = getFileIcon(fileData.type); // Implement this function to return appropriate icon URL
  const color = getColorForFileType(fileData.type); // Implement this function to return appropriate color

  return (
    <StyledContent>
      <Helmet>
        {/* ... (기존 Helmet 내용) */}
      </Helmet>

      <FileContainer>
        <FileIconWrapper bgColor={getColorForFileType(fileData.type)}>
          {getFileIcon(fileData.type)}
        </FileIconWrapper>

        <StyledTitle level={3}>{fileData.name}</StyledTitle>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <InfoItem>
                <StyledText>파일 크기</StyledText>
                <br />
                <StyledStrong>{`${(fileData.size / (1024 * 1024)).toFixed(2)} MB`}</StyledStrong>
              </InfoItem>
            </Col>
            <Col span={12}>
              <InfoItem>
                <StyledText>공유 날짜</StyledText>
                <br />
                <StyledStrong>{new Date(fileData.sharedAt).toLocaleDateString()}</StyledStrong>
              </InfoItem>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col span={12}>
              <InfoItem>
                <StyledText>공유자</StyledText>
                <br />
                <StyledStrong>{fileData.sharedBy || 'Anonymous'}</StyledStrong>
              </InfoItem>
            </Col>
            <Col span={12}>
              <InfoItem>
                <StyledText>다운로드 횟수</StyledText>
                <br />
                <StyledStrong>{downloadCount}</StyledStrong>
              </InfoItem>
            </Col>
          </Row>


          <ScanResult scanning={scanning} isVirus={scanResult?.isVirus}>
          <ScanStatusContainer>
            {scanning ? (
              <>
                <Spin /> 
                <Text style={{ marginLeft: 10 }}>바이러스 검사 중......</Text>
              </>
            ) : scanResult && (
              <>
                {scanResult.isVirus ? <WarningOutlined /> : <CheckCircleOutlined />}
                <Text style={{ marginLeft: 10 }}>{scanResult.message}</Text>
              </>
            )}
          </ScanStatusContainer>
          {scanning && (
            <PoweredByContainer>
              <PoweredByText>Powered by VirusTotal</PoweredByText>
              <VirusTotalLogo src="https://www.svgrepo.com/show/331633/virustotal.svg" alt="VirusTotal" />
            </PoweredByContainer>
          )}
        </ScanResult>


</Space>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {downloadProgress > 0 && (
            <StyledProgress 
              percent={downloadProgress} 
              status="active" 
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }} 
            />
          )}

          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <StyledButton type="primary" icon={<DownloadOutlined />} onClick={handleDownload}>
              다운로드
            </StyledButton>
            <Row gutter={16}>
              <Col span={12}>
                <StyledButton icon={<EyeOutlined />}>미리보기</StyledButton>
              </Col>
              <Col span={12}>
                <StyledButton icon={<LinkOutlined />} onClick={() => setShareModalVisible(true)}>
                  공유
                </StyledButton>
              </Col>
            </Row>
          </Space>
        </Space>
      </FileContainer>
      <Modal
        title="Share File"
        visible={shareModalVisible}
        onCancel={() => setShareModalVisible(false)}
        footer={null}
        style={{ top: 20 }}
        bodyStyle={{ background: '#1a1a1a', color: '#ffffff' }}
        headerStyle={{ background: '#1a1a1a', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input 
            value={`${window.location.origin}/share/${shareId}`}
            readOnly
            style={{ background: '#2a2a2a', color: '#ffffff', borderColor: '#3a3a3a' }}
            addonAfter={
              <Tooltip title="Copy link">
                <CopyOutlined onClick={copyShareLink} style={{ cursor: 'pointer', color: '#ffffff' }} />
              </Tooltip>
            }
          />
          <StyledText>누구나 이 링크로 파일을 다운받을 수 있어요</StyledText>
        </Space>
      </Modal>
    </StyledContent>
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