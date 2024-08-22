import React, { useState, useContext } from 'react';
import { Layout, Typography, Button, Space, Checkbox, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../translations';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const PageBackground = styled.div`
  background: #121212;
  min-height: 100vh;
  padding: 50px 20px;
`;

const AgreementCard = styled.div`
  background: #1e1e1e;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const ScrollableContent = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 20px;
  background: #2c2c2c;
  border-radius: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1e1e1e;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
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

const AgreementPage = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAgree = () => {
    if (agreed) {
      message.success('You have agreed to the terms and conditions.');
      navigate('/register');  // Redirect to registration page
    } else {
      message.warning('Please agree to the terms and conditions to proceed.');
    }
  };

  return (
    <PageBackground>
      <AgreementCard>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Link to="/register">
            <Button icon={<ArrowLeftOutlined />} style={{ marginBottom: '20px' }}>
              {t.backToRegister}
            </Button>
          </Link>
          <Title level={2} style={{ color: '#ffffff' }}>{t.termsAndConditions}</Title>
          <ScrollableContent>
            <Paragraph style={{ color: '#cccccc' }}>
            Hadiafile에 오신 것을 환영합니다. 당사 서비스를 이용함으로써 귀하는 본 약관에 동의하게 됩니다. 약관을 주의 깊게 읽어주세요.
            </Paragraph>
            <Title level={2} style={{ color: '#ffffff' }}>이용 약관</Title>
            <Title level={4} style={{ color: '#ffffff' }}>제1조 (목적)</Title>
            <Paragraph style={{ color: '#cccccc' }}>
            이 약관은 hadiafile (이하 "서비스")가 제공하는 서비스의 이용과 관련하여 회사와 이용자 간의 권리와 의무를 규정함을 목적으로 합니다.
            </Paragraph>
            <Title level={4} style={{ color: '#ffffff' }}>제2조 (정의)</Title>
            <Paragraph style={{ color: '#cccccc' }}>
            1. "서비스"란 hadiafile가 제공하는 파일 업로드, 저장, 공유 등의 온라인 파일 호스팅 서비스를 의미합니다.
            </Paragraph>
            <Paragraph style={{ color: '#cccccc' }}>
            2. "이용자"란 이 약관에 동의하고 서비스를 이용하는 개인 또는 법인을 의미합니다.
            </Paragraph>
            <Title level={4} style={{ color: '#ffffff' }}>제3조 (약관의 변경)</Title>
            <Paragraph style={{ color: '#cccccc' }}>
            1. 회사는 약관을 변경할 수 있으며, 변경된 약관은 서비스의 웹사이트에 게시함으로써 효력을 발생합니다.
            </Paragraph>
            <Paragraph style={{ color: '#cccccc' }}>
            2. 이용자는 변경된 약관에 동의하지 않을 경우 회사는 회원가입을 거부할 수 있습니다.
            </Paragraph>
            <Title level={4} style={{ color: '#ffffff' }}>제4조 (서비스의 이용)</Title>
            <Paragraph style={{ color: '#cccccc' }}>
            1. 이용자는 서비스 이용을 위해 회사가 요구하는 정보와 절차를 따라야 합니다.
            </Paragraph>
            <Paragraph style={{ color: '#cccccc' }}>
            2. 이용자는 서비스 이용 시 법령, 약관 및 공서양속을 준수해야 합니다.
            </Paragraph>
            <Title level={4} style={{ color: '#ffffff' }}>제5조 (계정 관리)</Title>
            <Paragraph style={{ color: '#cccccc' }}>
            1. 이용자는 최대 업로드 용량 제한을 일부 완화하기 위해 계정을 생성해야 하며, 계정의 관리와 비밀번호 보안에 대한 책임은 이용자에게 있습니다.
            </Paragraph>
            <Paragraph style={{ color: '#cccccc' }}>
            2. 계정의 불법 사용 또는 해킹에 대한 모든 책임은 이용자에게 있습니다.
            </Paragraph>
            <Title level={4} style={{ color: '#ffffff' }}>제6조 (서비스 이용 제한 및 중지)</Title>
            <Paragraph style={{ color: '#cccccc' }}>
            1. 회사는 다음과 같은 경우 서비스 이용을 제한하거나 중지할 수 있습니다:
            </Paragraph>
            <Paragraph style={{ color: '#cccccc' }}>
            - 이용자가 법령 또는 약관을 위반한 경우
            </Paragraph>
            <Paragraph style={{ color: '#cccccc' }}>
            - 서비스 운영에 지장을 초래하는 경우
            </Paragraph>
            <Paragraph style={{ color: '#cccccc' }}>
            - 음란물을 유포한 경우
            </Paragraph>
            <Title level={4} style={{ color: '#ffffff' }}>제7조 (책임의 한계)</Title>
            <Paragraph style={{ color: '#cccccc' }}>
            1. 회사는 서비스의 안정성이나 정확성에 대해 보증하지 않으며, 서비스 이용으로 인해 발생한 손해에 대해 책임을 지지 않습니다.
            </Paragraph>
            <Paragraph style={{ color: '#cccccc' }}>
            2. 회사는 서비스의 중단, 데이터 손실 등에 대해 책임을 지지 않습니다.
            </Paragraph>
            <Paragraph style={{ color: '#cccccc' }}>
            3. 회사는 이용자가 유포한 모든 파일의 저작권 침해 문제에 대해 책임을 지지 않습니다.
            </Paragraph>
            <Title level={4} style={{ color: '#ffffff' }}>제8조 (기타)</Title>
            <Paragraph style={{ color: '#cccccc' }}>
            1. 이 약관에서 정하지 않은 사항에 대해서는 관련 법령 및 서비스의 정책에 따릅니다.
            </Paragraph>


            <Title level={2} style={{ color: '#ffffff' }}>개인정보 처리 방침</Title>
            <Title level={4} style={{ color: '#ffffff' }}>제1조 (개인정보의 수집 및 이용 목적)</Title>
            <Paragraph style={{ color: '#cccccc' }}>
            1. 회사는 다음과 같은 목적으로 개인정보를 수집하고 이용합니다:
            </Paragraph>
            <Paragraph style={{ color: '#cccccc' }}>
            - 서비스 제공 및 관리
            </Paragraph>
            <Title level={4} style={{ color: '#ffffff' }}>제2조 (수집하는 개인정보 항목)</Title>
            <Paragraph style={{ color: '#cccccc' }}>
            1. 회사는 다음과 같은 개인정보를 수집합니다:
            </Paragraph>
            <Paragraph style={{ color: '#cccccc' }}>
            - 필수 항목: 이메일 주소, 비밀번호
            </Paragraph>
            <Title level={4} style={{ color: '#ffffff' }}>제3조 (개인정보의 보유 및 이용 기간)</Title>
            <Paragraph style={{ color: '#cccccc' }}>
            1. 개인정보는 이용자가 서비스 이용을 종료하거나 회원 탈퇴 시까지 보유합니다.
            </Paragraph>
            <Title level={4} style={{ color: '#ffffff' }}>제4조 (개인정보의 제3자 제공)</Title>
            <Paragraph style={{ color: '#cccccc' }}>
            1. 회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
            </Paragraph>
            <Paragraph style={{ color: '#cccccc' }}>
            2. 회사는 법령에 의한 요구나 이용자의 요청 일지라도 제공하지 않습니다.
            </Paragraph>
            <Title level={4} style={{ color: '#ffffff' }}>제5조 (개인정보의 안전성 확보 조치)</Title>
            <Paragraph style={{ color: '#cccccc' }}>
            1. 회사는 개인정보의 안전성을 확보하기 위해 다음과 같은 조치를 취합니다:
            </Paragraph>
            <Paragraph style={{ color: '#cccccc' }}>
            - 개인정보의 암호화 및 저장
            </Paragraph>
            <Paragraph style={{ color: '#cccccc' }}>
            - 접근 권한 관리
            </Paragraph>
            <Paragraph style={{ color: '#cccccc' }}>
            - 정기적인 보안 점검 및 개선
            </Paragraph>
            <Title level={4} style={{ color: '#ffffff' }}>제6조 (이용자의 권리와 의무)</Title>
            <Paragraph style={{ color: '#cccccc' }}>
            1. 개인정보의 정정이나 삭제를 요청할 경우, 회사는 신속하게 처리합니다.
            </Paragraph>
            <Title level={4} style={{ color: '#ffffff' }}>제7조 (개인정보 처리방침의 변경)</Title>
            <Paragraph style={{ color: '#cccccc' }}>
            1. 개인정보 처리방침의 변경 시, 회사는 변경 사항을 서비스의 웹사이트에 게시하며, 이용자는 이를 확인할 수 있습니다.
            </Paragraph>
          </ScrollableContent>
        </Space>
      </AgreementCard>
    </PageBackground>
  );
};

export default AgreementPage;