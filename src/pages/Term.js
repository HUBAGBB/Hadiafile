import React from 'react';
import { Typography, Layout } from 'antd';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const TermsOfServicePage = () => {
  return (
    <Layout>
      <Content style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
        <Title level={1}>이용 약관</Title>
        
        <Title level={2}>제1조 (목적)</Title>
        <Paragraph>
          이 약관은 hadiafile (이하 "서비스")가 제공하는 서비스의 이용과 관련하여 회사와 이용자 간의 권리와 의무를 규정함을 목적으로 합니다.
        </Paragraph>

        <Title level={2}>제2조 (정의)</Title>
        <Paragraph>
          1. "서비스"란 hadiafile가 제공하는 파일 업로드, 저장, 공유 등의 온라인 파일 호스팅 서비스를 의미합니다.<br/>
          2. "이용자"란 이 약관에 동의하고 서비스를 이용하는 개인 또는 법인을 의미합니다.
        </Paragraph>

        <Title level={2}>제3조 (약관의 변경)</Title>
        <Paragraph>
          1. 회사는 약관을 변경할 수 있으며, 변경된 약관은 서비스의 웹사이트에 게시함으로써 효력을 발생합니다.<br/>
          2. 이용자는 변경된 약관에 동의하지 않을 경우 회사는 회원가입을 거부할 수 있습니다.
        </Paragraph>

        <Title level={2}>제4조 (서비스의 이용)</Title>
        <Paragraph>
          1. 이용자는 서비스 이용을 위해 회사가 요구하는 정보와 절차를 따라야 합니다.<br/>
          2. 이용자는 서비스 이용 시 법령, 약관 및 공서양속을 준수해야 합니다.
        </Paragraph>

        <Title level={2}>제5조 (계정 관리)</Title>
        <Paragraph>
          1. 이용자는 최대 업로드 용량 제한을 일부 완화하기 위해 계정을 생성해야 하며, 계정의 관리와 비밀번호 보안에 대한 책임은 이용자에게 있습니다.<br/>
          2. 계정의 불법 사용 또는 해킹에 대한 모든 책임은 이용자에게 있습니다.
        </Paragraph>

        <Title level={2}>제6조 (서비스 이용 제한 및 중지)</Title>
        <Paragraph>
          1. 회사는 다음과 같은 경우 서비스 이용을 제한하거나 중지할 수 있습니다:<br/>
          - 이용자가 법령 또는 약관을 위반한 경우<br/>
          - 서비스 운영에 지장을 초래하는 경우<br/>
          - 음란물을 유포한 경우
        </Paragraph>

        <Title level={2}>제7조 (책임의 한계)</Title>
        <Paragraph>
          1. 회사는 서비스의 안정성이나 정확성에 대해 보증하지 않으며, 서비스 이용으로 인해 발생한 손해에 대해 책임을 지지 않습니다.<br/>
          2. 회사는 서비스의 중단, 데이터 손실 등에 대해 책임을 지지 않습니다.<br/>
          3. 회사는 이용자가 유포한 모든 파일의 저작권 침해 문제에 대해 책임을 지지 않습니다.
        </Paragraph>

        <Title level={2}>제8조 (기타)</Title>
        <Paragraph>
          1. 이 약관에서 정하지 않은 사항에 대해서는 관련 법령 및 서비스의 정책에 따릅니다.
        </Paragraph>
      </Content>
    </Layout>
  );
};

export default TermsOfServicePage;