import React from 'react';
import { Form, Input, Button, Layout, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/Header';
import { registerUser } from '../services/firebase';

const { Content } = Layout;
const { Title } = Typography;

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await registerUser(values.email, values.password);
      message.success('회원가입 완료. 로그인해주세요!');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 도중 에러 발생:', error);
      message.error('회원가입 실패. 다시 시도해주세요!');
    }
  };

  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ margin: '16px 0' }}>
          <Title level={2}>회원가입</Title>
          <Form
            name="normal_register"
            className="register-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: '이메일을 입력해주세요!' },
                { type: 'email', message: '올바른 이메일 형식으로 입력해주세요!' }
              ]}
            >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="이메일" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="비밀번호"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: '비밀번호 재입력을 해주세요!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('비밀번호가 일치하지 않습니다!'));
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="비밀번호 확인"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="register-form-button">
              회원가입
              </Button>
              이미 계정이 있으신가요? <a href="/login">로그인</a>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default Register;