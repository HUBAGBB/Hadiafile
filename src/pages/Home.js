import React from 'react';
import { Layout, Typography, Button, Row, Col, Card, Space, Avatar, Tabs, Statistic, Progress, Collapse,Input } from 'antd';
import { CloudUploadOutlined, SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { 
  SafetyOutlined, 
  TeamOutlined, 
  RocketOutlined,
  ArrowRightOutlined,
  QuestionCircleOutlined,
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AppHeader from '../components/Header1';

const { Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const StyledLayout = styled(Layout)`
  background-color: #121212;
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  padding: 60px 50px;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const StyledTitle = styled(Title)`
  color: #ffffff;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const StyledParagraph = styled(Paragraph)`
  color: #a0a0a0;
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto 40px;
`;

const ActionButton = styled(Button)`
  height: 50px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 25px;
  padding: 0 30px;
`;

const SearchInput = styled(Input)`
  height: 50px;
  border-radius: 25px;
  font-size: 16px;
`;

const FeatureCard = styled(Card)`
  background-color: #1e1e1e;
  border: none;
  border-radius: 12px;
  height: 100%;

  .ant-card-body {
    padding: 24px;
  }

  h3 {
    color: #ffffff;
    font-size: 20px;
    margin-bottom: 12px;
  }

  p {
    color: #a0a0a0;
    font-size: 16px;
  }
`;

const HomePage = () => {
  return (
    <StyledLayout>
      <AppHeader/>
      <StyledContent>
        <HeroSection>
        <Col style={{ textAlign: 'center' }}>
            {/*<img src="https://i.ibb.co/8ct4T7F/hosting-3d-illustration-icon-331343-2486-transformed-removebg.png" alt="Secure file sharing" style={{ maxWidth: '60%', borderRadius: '16px'}} />*/}
            <img src="https://i.pinimg.com/originals/04/4d/12/044d12b83f0f1aa1012563a4701b0531.gif" alt="Secure file sharing" style={{ paddingLeft: "5%", maxWidth: '45%', borderRadius: '16px'}}/>
          </Col>
          <StyledTitle>Simple. Secure. Swift.</StyledTitle>
          <StyledParagraph>
            Upload, store, and share your files with ease. Experience the future of file hosting with HadiaFile.
          </StyledParagraph>
          <Row gutter={16} justify="center">
            <Col>
              <ActionButton type="primary" icon={<CloudUploadOutlined />} size="large">
                Upload File
              </ActionButton>
            </Col>
          </Row>
        </HeroSection>

        <Row gutter={[24, 24]}>
          {[
            {
              title: "Fast Upload",
              description: "Blazing fast upload speeds with our advanced technology."
            },
            {
              title: "Secure Storage",
              description: "Your files are encrypted and stored with top-notch security."
            },
            {
              title: "Easy Sharing",
              description: "Share your files with a simple link, no sign-up required."
            },
            {
              title: "Cross-Platform",
              description: "Access your files from any device, anywhere, anytime."
            }
          ].map((feature, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <FeatureCard>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            </Col>
          ))}
        </Row>
      </StyledContent>
            {/* Footer */}
        <Footer style={{ background: '#0A0A0A', padding: '48px 200px' }}>
        <Row justify="space-between" align="top">
          <Col xs={24} md={6}>
            <Title level={4} style={{ color: '#FFFFFF' }}>HadiaFile</Title>
            <Paragraph style={{ color: '#CCCCCC' }}>
            A file sharing and related platform that protects professionals.
            </Paragraph>
            <Space>
              <Button type="text" icon={<GithubOutlined />} style={{ color: '#FFFFFF' }} />
              <Button type="text" icon={<TwitterOutlined />} style={{ color: '#FFFFFF' }} />
            </Space>
          </Col>
          <Col xs={24} md={4}>
            <Title level={5} style={{ color: '#FFFFFF' }}>Function</Title>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link to="/upload" style={{ color: '#CCCCCC' }}>File Upload</Link></li>
            </ul>
          </Col>
          <Col xs={24} md={4}>
            <Title level={5} style={{ color: '#FFFFFF' }}>Company</Title>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link to="/aboutus" target="_blank" style={{ color: '#CCCCCC' }}>About Us</Link></li>
              <li><Link to="/careers" target="_blank" style={{ color: '#CCCCCC' }}>Career</Link></li>
              <li><Link to="/" style={{ color: '#CCCCCC' }}>Contact</Link></li>
            </ul>
          </Col>
          <Col xs={24} md={4}>
            <Title level={5} style={{ color: '#FFFFFF' }}>Legal</Title>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link to="/" style={{ color: '#CCCCCC' }}>Terms of Use</Link></li>
              <li><Link to="/" style={{ color: '#CCCCCC' }}>Privacy policy</Link></li>
            </ul>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '48px' }}>
          <Col>
            <Text style={{ color: '#CCCCCC' }}>© 2024 Hadiafile || Made in YunaYuri, Japan</Text>
          </Col>
        </Row>
      </Footer>
    </StyledLayout>
  );
};

export default HomePage;