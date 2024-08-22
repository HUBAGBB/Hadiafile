import React, { useState } from 'react';
import { Typography, Layout, Row, Col, Form, Input, Button, Card, Divider, message, Alert, Space, Tooltip } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, GithubOutlined, LinkedinOutlined, TwitterOutlined, InfoCircleOutlined, SendOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;
const { TextArea } = Input;

// Styled components
const StyledLayout = styled(Layout)`
  background: #0a0a0a;
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  padding: 80px 50px;
  max-width: 1200px;
  margin: 0 auto;
`;

const GradientTitle = styled(Title)`
  background: linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-size: 48px !important;
`;

const StyledCard = styled(Card)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const SocialIcon = styled.a`
  font-size: 24px;
  color: #ffffff;
  transition: all 0.3s ease;
  &:hover {
    color: #00d2ff;
    transform: translateY(-3px);
  }
`;

const StyledInput = styled(Input)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  &:focus, &:hover {
    border-color: #00d2ff;
    box-shadow: 0 0 0 2px rgba(0, 210, 255, 0.2);
  }
`;

const StyledTextArea = styled(TextArea)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  &:focus, &:hover {
    border-color: #00d2ff;
    box-shadow: 0 0 0 2px rgba(0, 210, 255, 0.2);
  }
`;

const StyledButton = styled(Button)`
  background: linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%);
  border: none;
  border-radius: 8px;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  &:hover, &:focus {
    background: linear-gradient(90deg, #00a8e8 0%, #2f63b3 100%);
  }
`;

const ContactPage = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = (values) => {
    setSubmitting(true);
    // 여기에 실제 폼 제출 로직을 구현합니다.
    console.log('Received values of form: ', values);
    setTimeout(() => {
      message.success('메시지가 성공적으로 전송되었습니다!');
      form.resetFields();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <StyledLayout>
      <StyledContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GradientTitle>Contact Us</GradientTitle>
          <Paragraph style={{ color: '#b3b3b3', fontSize: '18px', textAlign: 'center', marginBottom: '50px' }}>
            궁금한 점이 있으시거나 도움이 필요하신가요? 언제든 연락 주세요!
          </Paragraph>
        </motion.div>

        <Row gutter={[32, 32]}>
          <Col xs={24} lg={10}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <StyledCard>
                <Title level={3} style={{ color: '#ffffff', marginBottom: '30px' }}>연락처 정보</Title>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <Tooltip title="이메일로 문의하기">
                    <Button icon={<MailOutlined />} style={{ width: '100%', textAlign: 'left', height: 'auto', padding: '10px' }}>
                      <Text strong style={{ marginLeft: '10px', color: '#ffffff' }}>contact@hardiafile.com</Text>
                    </Button>
                  </Tooltip>
                  <Tooltip title="전화로 문의하기">
                    <Button icon={<PhoneOutlined />} style={{ width: '100%', textAlign: 'left', height: 'auto', padding: '10px' }}>
                      <Text strong style={{ marginLeft: '10px', color: '#ffffff' }}>+81 (0)6-1234-5678</Text>
                    </Button>
                  </Tooltip>
                  <Tooltip title="오시는 길">
                    <Button icon={<EnvironmentOutlined />} style={{ width: '100%', textAlign: 'left', height: 'auto', padding: '10px' }}>
                      <Text strong style={{ marginLeft: '10px', color: '#ffffff' }}>〒530-0001 大阪府大阪市北区梅田1丁目1-3</Text>
                    </Button>
                  </Tooltip>
                </Space>
                <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)', margin: '30px 0' }} />
                <Title level={4} style={{ color: '#ffffff', marginBottom: '20px' }}>소셜 미디어</Title>
                <Space size="large">
                  <SocialIcon href="https://github.com/hardiafile" target="_blank" rel="noopener noreferrer">
                    <GithubOutlined />
                  </SocialIcon>
                  <SocialIcon href="https://linkedin.com/company/hardiafile" target="_blank" rel="noopener noreferrer">
                    <LinkedinOutlined />
                  </SocialIcon>
                  <SocialIcon href="https://twitter.com/hardiafile" target="_blank" rel="noopener noreferrer">
                    <TwitterOutlined />
                  </SocialIcon>
                </Space>
              </StyledCard>
            </motion.div>
          </Col>
          <Col xs={24} lg={14}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <StyledCard>
                <Title level={3} style={{ color: '#ffffff', marginBottom: '30px' }}>문의하기</Title>
                <Alert
                  message="문의 시 주의사항"
                  description={
                    <ul>
                      <li>개인정보 보호를 위해 민감한 정보는 포함하지 마세요.</li>
                      <li>기술적 문제 보고 시 가능한 자세한 설명을 부탁드립니다.</li>
                      <li>영업 시간 (평일 9:00-18:00 JST) 내 답변을 드리도록 하겠습니다.</li>
                      <li>긴급한 문의는 전화로 연락 주시기 바랍니다.</li>
                    </ul>
                  }
                  type="info"
                  showIcon
                  icon={<InfoCircleOutlined />}
                  style={{ marginBottom: '30px', background: 'rgba(24, 144, 255, 0.1)', border: '1px solid rgba(24, 144, 255, 0.2)' }}
                />
                <Form form={form} name="contact" onFinish={onFinish} layout="vertical">
                  <Form.Item
                    name="name"
                    label={<span style={{ color: '#ffffff' }}>이름</span>}
                    rules={[{ required: true, message: '이름을 입력해주세요' }]}
                  >
                    <StyledInput />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label={<span style={{ color: '#ffffff' }}>이메일</span>}
                    rules={[
                      { required: true, message: '이메일을 입력해주세요' },
                      { type: 'email', message: '올바른 이메일 형식이 아닙니다' }
                    ]}
                  >
                    <StyledInput />
                  </Form.Item>
                  <Form.Item
                    name="message"
                    label={<span style={{ color: '#ffffff' }}>메시지</span>}
                    rules={[{ required: true, message: '메시지를 입력해주세요' }]}
                  >
                    <StyledTextArea rows={4} />
                  </Form.Item>
                  <Form.Item>
                    <StyledButton type="primary" htmlType="submit" loading={submitting} icon={<SendOutlined />}>
                      전송하기
                    </StyledButton>
                  </Form.Item>
                </Form>
              </StyledCard>
            </motion.div>
          </Col>
        </Row>
      </StyledContent>
    </StyledLayout>
  );
};

export default ContactPage;