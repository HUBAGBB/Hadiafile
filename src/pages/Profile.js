import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Layout, Typography, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const { Content } = Layout;
const { Title } = Typography;

const Profile = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          form.setFieldsValue(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        message.error("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user, form]);

  const onFinish = async (values) => {
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, values);
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ margin: '16px 0' }}>
          <Title level={2}>User Profile</Title>
          <Form
            form={form}
            name="user_profile"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="displayName"
              label="Display Name"
              rules={[{ required: true, message: 'Please input your display name!' }]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
            >
              <Input disabled />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default Profile;