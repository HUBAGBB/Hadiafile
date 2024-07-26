import React from 'react';
import { Form, Input, Button, Layout, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/Header';
import { loginUser } from '../services/firebase';

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await loginUser(values.email, values.password);
      message.success('로그인 되었습니다!');
      navigate('/');
    } catch (error) {
      console.error('로그인 도중 오류 발생:', error);
      message.error('로그인 실패. 다시 시도해주세요!');
    }
  };

  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ margin: '16px 0' }}>
          <Title level={2}>로그인</Title>
          <Form
            name="normal_login"
            className="login-form"
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
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="이메일" />
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
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                로그인
              </Button>
              또는 <a href="/register">회원가입</a>
            </Form.Item>
            <p>업로드 제한 악용 방지를 위한 로그인 절차이며, 모든 로그는 1분내로 서버에서 자동 파기됩니다.</p>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;