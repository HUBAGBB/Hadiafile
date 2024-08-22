import React, { useContext } from 'react';
import { Form, Input, Button, Checkbox, Typography, Layout, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/Header1';
import { registerUser } from '../services/firebase';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AgreementModal from './Agreement';
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

const RegisterCard = styled.div`
  background: #1e1e1e;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: 800px;
  display: flex;
`;

const RegisterForm = styled(Form)`
  padding: 40px;
  flex: 1;
`;

const RegisterImage = styled.div`
  flex: 1;
  background: url('https://iili.io/dlwUCPe.md.jpg') center/cover no-repeat;
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

const Register = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await registerUser(values.email, values.password);
      message.success(`${t.registerSuccessMsg}`);
      navigate('/login');
    } catch (error) {
      console.error(`${t.registerFailMsg}`, error);
      message.error(`${t.registerFailMsg2}`);
    }
  };

  return (
    <PageBackground>
      <RegisterCard>
        <RegisterForm
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Title level={2} style={{ marginBottom: '30px', color: '#ffffff' }}>{t.create}</Title>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <StyledInput prefix={<MailOutlined style={{ color: '#888' }} />} placeholder={t.email} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <StyledInput prefix={<LockOutlined style={{ color: '#888' }} />} placeholder={t.password} />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <StyledInput prefix={<LockOutlined style={{ color: '#888' }} />} placeholder={t.rePassword} />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
          >
            <Checkbox style={{ color: '#888' }}>
            {t.agreement} <Link to="/agreement" style={{ color: '#4a90e2' }}>{t.agreementTerm}</Link>
            </Checkbox>
          </Form.Item>
          
          <Form.Item>
            <StyledButton type="primary" htmlType="submit" block>
              {t.register}
            </StyledButton>
          </Form.Item>
          
          <Text style={{ display: 'block', textAlign: 'center', color: '#888' }}>
            {t.alreadyHaveAccount} <Link to="/login" style={{ color: '#4a90e2' }}>{t.login}</Link>
          </Text>
        </RegisterForm>
      </RegisterCard>
    </PageBackground>
  );
};

export default Register;