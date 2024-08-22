import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { ConfigProvider, theme } from 'antd';
import UploadPage from './pages/UploadPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import SharedFile from './components/SharedFile';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/Home';
import AgreementModal from './pages/Agreement';
import { LanguageProvider } from './contexts/LanguageContext';
import RecruitmentPage from './pages/RecruitmentPage';
import AboutUsPage from './pages/AboutUs';
import ContactPage from './pages/Contact';
import TermsOfServicePage from './pages/Term';
import BackgroundMusic from './components/BackgroundMusic';


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
  <LanguageProvider>
    <AuthProvider>
      <Router>
        <Layout className="layout" style={{ minHeight: '100vh' }}>
          <Content>
            <div className="site-layout-content" style={{ background: '#000000', minHeight: 380 }}>
              <Routes>
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/share/:shareId" element={<SharedFile />} />
                <Route path="/agreement" element={<AgreementModal />} />
                <Route path="/careers" element={<RecruitmentPage />} />
                <Route path="/aboutus" element={<AboutUsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/term" element={<TermsOfServicePage />} />
              </Routes>
            </div>
          </Content>
        </Layout>
        <BackgroundMusic />
      </Router>
    </AuthProvider>
    </LanguageProvider>
    </ConfigProvider>
  );
};

export default App;
