import React from 'react';
import { Layout, Typography, Button, Row, Col, Card, Statistic, Carousel, List, Avatar, Divider, Space } from 'antd';
import { 
  CloudUploadOutlined, 
  SafetyOutlined, 
  TeamOutlined, 
  RocketOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  LockOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

// Styled Components
const GradientBackground = styled.div`
  background: linear-gradient(135deg, #001529 0%, #003a70 100%);
  color: #ffffff;
`;

const HexagonCard = styled(Card)`
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #1f1f1f;
  border: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background: #2a2a2a;
  }
`;

const WaveSection = styled.div`
  position: relative;
  background: #141414;
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: 0;
    width: 100%;
    height: 50px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23141414' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom;
    background-size: cover;
  }
`;

const HomePage = () => {
  const features = [
    { icon: <CloudUploadOutlined style={{ fontSize: '48px', color: '#1890ff' }} />, title: '쉬운 업로드', description: '간편하게 파일을 업로드하고 공유할 수 있습니다' },
    { icon: <SafetyOutlined style={{ fontSize: '48px', color: '#52c41a' }} />, title: '강력한 익명성', description: '고급 암호화로 익명성을 보장받을 수 있습니다' },
    { icon: <TeamOutlined style={{ fontSize: '48px', color: '#faad14' }} />, title: '협력 증진', description: '공유 파일에서 실시간으로 공동 작업을 할 수 있습니다' },
    { icon: <RocketOutlined style={{ fontSize: '48px', color: '#eb2f96' }} />, title: '빠른 전송 속도', description: '전 세계적으로 초고속 파일 전송을 할 수 있습니다' },
  ];

  const testimonials = [
    { name: 'John Doe', avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', company: 'Tech Co.', text: "MegaClone has revolutionized our team's file sharing process." },
    { name: 'Jane Smith', avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', company: 'Design Studio', text: 'The collaboration features are a game-changer for our projects.' },
    { name: 'Mike Johnson', avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', company: 'StartUp Inc.', text: 'Security features give us peace of mind with sensitive documents.' },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#141414' }}>
      <Content>
        {/* Hero Section */}
        <GradientBackground>
          <Row justify="center" align="middle" style={{ minHeight: '90vh', padding: '60px 50px' }}>
            <Col xs={24} md={12}>
              <Title style={{ color: '#ffffff', fontSize: '48px', marginBottom: '24px' }}>전문가를 위한 안전한 파일 공유</Title>
              <Paragraph style={{ color: '#ffffff', fontSize: '18px', marginBottom: '32px' }}>
               하디아파일로 타협 없는 보안 및 익명성을 경험하세요. 
               언제 어디서나 파일을 관리하고 공유할 수 있습니다.
              </Paragraph>
              <Button type="primary" size="large" icon={<CloudUploadOutlined />} style={{ height: '50px', fontSize: '18px' }}>
                <Link to="/upload">무료로 시작하기</Link>
              </Button>
            </Col>
            <Col xs={24} md={12} style={{ textAlign: 'center' }}>
              <img src="https://i.namu.wiki/i/YskFFTUrp5Dp13gDiy8F7SvYJoXBsV1WvNPeRFnYicUg8-2b3Hpl_SaHRv51BKdVj_Eo3Fv6MSM1kheV4fbVVA.webp" alt="Secure file sharing" style={{ maxWidth: '95%' }} />
            </Col>
          </Row>
        </GradientBackground>

        {/* Features Section */}
        <WaveSection>
          <Row justify="center" style={{ padding: '100px 50px 60px' }}>
            <Col span={24} style={{ textAlign: 'center', marginBottom: '60px' }}>
              <Title level={2} style={{ color: '#ffffff' }}>하디아파일을 선택해야 하는 이유</Title>
            </Col>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={6} key={index} style={{ padding: '0 15px', marginBottom: '30px' }}>
                <HexagonCard hoverable>
                  {feature.icon}
                  <Title level={4} style={{ color: '#ffffff', marginTop: '16px' }}>{feature.title}</Title>
                  <Text style={{ color: '#a6a6a6', textAlign: 'center' }}>{feature.description}</Text>
                </HexagonCard>
              </Col>
            ))}
          </Row>
        </WaveSection>

        {/* Statistics Section */}
        <Row justify="center" style={{ padding: '80px 50px', background: '#1f1f1f' }}>
          <Col xs={24} sm={8} style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Statistic title="공유된 파일" value={10000} prefix={<CloudUploadOutlined />} valueStyle={{ color: '#1890ff' }} />
          </Col>
          <Col xs={24} sm={8} style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Statistic title="사용자" value={1000} prefix={<TeamOutlined />} valueStyle={{ color: '#52c41a' }} />
          </Col>
          <Col xs={24} sm={8} style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Statistic title="서비스 제공 국가" value={100} prefix={<GlobalOutlined />} valueStyle={{ color: '#faad14' }} />
          </Col>
        </Row>

        {/* Testimonials Section */}
        <GradientBackground>
          <Row justify="center" style={{ padding: '100px 50px' }}>
            <Col span={24} style={{ textAlign: 'center', marginBottom: '40px' }}>
              <Title level={2} style={{ color: '#ffffff' }}>전문가들의 생생한 평가</Title>
            </Col>
            <Col span={24}>
              <Carousel autoplay effect="fade">
                {testimonials.map((testimonial, index) => (
                  <div key={index}>
                    <Card style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'transparent', padding: '30px', margin: '0 20px' }}>
                      <Paragraph style={{ color: '#ffffff', fontSize: '18px', fontStyle: 'italic' }}>"{testimonial.text}"</Paragraph>
                      <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                      <Space align="center">
                        <Avatar src={testimonial.avatar} size={64} />
                        <div>
                          <Text strong style={{ color: '#ffffff', fontSize: '16px' }}>{testimonial.name}</Text>
                          <br />
                          <Text style={{ color: '#a6a6a6' }}>{testimonial.company}</Text>
                        </div>
                      </Space>
                    </Card>
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>
        </GradientBackground>

        {/* CTA Section */}
        <Row justify="center" align="middle" style={{ padding: '100px 50px', background: '#1f1f1f' }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Title level={2} style={{ color: '#ffffff', marginBottom: '24px' }}>사용할 준비 되셨나요?</Title>
            <Paragraph style={{ color: '#ffffff', fontSize: '18px', marginBottom: '32px' }}>
              하디아파일은 베타 기간에만 모든 사용자에게 제한없는 서비스를 제공합니다. 어서 사용해 보세요!
            </Paragraph>
            <Button type="primary" size="large" icon={<CloudUploadOutlined />} style={{ height: '50px', fontSize: '18px' }}>
              <Link to="/upload">무료로 시작하기</Link>
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default HomePage;