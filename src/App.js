import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { ConfigProvider, theme } from 'antd';
import UploadPage from './pages/UploadPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import SharedFile from './components/SharedFile';
import AppHeader from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/Home';

const { Content, Footer } = Layout;

const App = () => {
  return (
    <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        colorPrimary: '#1890ff',
        colorBgBase: '#000000',
        colorTextBase: '#ffffff',
      },
    }}
  >
    <AuthProvider>
      <Router>
      <AppHeader />
        <Layout className="layout" style={{ minHeight: '100vh' }}>
          <Content>
            <div className="site-layout-content" style={{ background: '#000000', minHeight: 380 }}>
              <Routes>
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/d/:shareId" element={<SharedFile />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Hadiafile ©2024 Created by YunaYuri™</Footer>
        </Layout>
      </Router>
    </AuthProvider>
    </ConfigProvider>
  );
};

export default App;
