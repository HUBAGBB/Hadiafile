import React, { useState, useContext } from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, LoginOutlined, UserAddOutlined, UserOutlined, LogoutOutlined, CloudUploadOutlined, CloudOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../translations';

const { Header } = Layout;

const AppHeader = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  return (
    <Header style={{ 
      width: '100%',
      background: '#001529', // 다크 모드에 맞는 배경색
      top: 0,
      zIndex: 1,
      margin: 0,
      padding: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
      <div className="logo" />
      <Menu mode="horizontal" defaultSelectedKeys={['3']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">{t.home}</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<CloudUploadOutlined />}>
          <Link to="/upload">{t.upload}</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<LoginOutlined />}>
          <Link to="/login">{t.login}</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;