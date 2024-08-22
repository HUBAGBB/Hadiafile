import React, { useContext } from 'react';
import { Form, Input, Button, Checkbox, Typography, Layout, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/Header1';
import { loginUser } from '../services/firebase';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../translations';


const { Title, Text } = Typography;
const { Content } = Layout;

const PageBackground = styled.div`
  background: #121212;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginCard = styled.div`
  background: #1e1e1e;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: 800px;
  display: flex;
`;

const LoginForm = styled(Form)`
  padding: 40px;
  flex: 1;
`;

const LoginImage = styled.div`
  flex: 1;
  background: url('https://iili.io/dlw1Dge.md.jpg') center/cover no-repeat;
`;

const StyledInput = styled(Input)`
  height: 50px;
  border-radius: 25px;
  background: #2c2c2c;
  border-color: #3a3a3a;
  color: #ffffff;

  &::placeholder {
    color: #888;
  }

  &:hover, &:focus {
    border-color: #4a90e2;
  }
`;

const StyledButton = styled(Button)`
  height: 50px;
  border-radius: 25px;
  background: #4a90e2;
  border-color: #4a90e2;
  &:hover {
    background: #357bd8;
    border-color: #357bd8;
  }
`;

const Login = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await loginUser(values.email, values.password);
      message.success(`${t.loginSuccessMsg}`);
      navigate('/');
    } catch (error) {
      console.error(`${t.loginFailMsg}`, error);
      message.error(`${t.loginFailMsg2}`);
    }
  };

  return (
    <PageBackground>
      <LoginCard>
        <LoginImage />
        <LoginForm
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Title level={2} style={{ marginBottom: '30px', color: '#ffffff' }}>{t.welcome}</Title>
          <Form.Item
            name="email"
            rules={[{ required: true, message: `Please input your ${t.email}!` }]}
          >
            <StyledInput prefix={<UserOutlined />} placeholder={t.email} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: `Please input your ${t.password}!` }]}
          >
            <StyledInput
              prefix={<LockOutlined />}
              type="password"
              placeholder={t.password}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: '#888' }}>{t.rememberMe}</Checkbox>
            </Form.Item>
            <Link to="/forgot-password" style={{ float: 'right', color: '#4a90e2' }}>
              {t.forgotPassword}
            </Link>
          </Form.Item>
          <Form.Item>
            <StyledButton type="primary" htmlType="submit" block>
              {t.login}
            </StyledButton>
          </Form.Item>
          <Text style={{ display: 'block', textAlign: 'center', color: '#888' }}>
            {t.dontHaveAccount} <Link to="/register" style={{ color: '#4a90e2' }}>{t.register}</Link>
          </Text>
        </LoginForm>
      </LoginCard>
    </PageBackground>
  );
};

export default Login;