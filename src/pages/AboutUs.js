import React from 'react';
import { Typography, Layout, Row, Col, Card, Timeline, Statistic, Avatar, Divider, Button } from 'antd';
import { UserOutlined, TeamOutlined, RocketOutlined, BulbOutlined, SafetyOutlined, GlobalOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';  // React Router의 Link 컴포넌트 import

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const AboutUsPage = () => {
  const companyHistory = [
    { year: 2022, event: '하디아파일 창립' },
    { year: 2022, event: '첫 번째 베타 서비스 출시' },
    { year: 2023, event: '정식 서비스 출시' },
    { year: 2023, event: '글로벌 시장 진출' },
    { year: 2023, event: '월간 활성 사용자 1000명 달성' },
    { year: 2024, event: '월간 활성 사용자 1만 명 달성' },
  ];

  const coreValues = [
    { icon: <SafetyOutlined />, title: '보안', description: '사용자 데이터 보호를 최우선으로 합니다.' },
    { icon: <RocketOutlined />, title: '혁신', description: '끊임없는 발전으로 기술 혁신을 추구합니다.' },
    { icon: <TeamOutlined />, title: '협력', description: '팀워크를 통해 더 나은 결과를 만들어냅니다.' },
    { icon: <GlobalOutlined />, title: '글로벌', description: '전 세계 사용자를 위한 서비스를 지향합니다.' },
  ];

  const teamMembers = [
    { name: 'YunaYuri', role: 'CEO & 공동창업자', avatar: <Avatar size={64} src="https://i.pinimg.com/originals/04/4d/12/044d12b83f0f1aa1012563a4701b0531.gif" /> },
    { name: 'pyosy11', role: 'CTO & 공동창업자', avatar: <Avatar size={64} src="https://cdn-lostark.game.onstove.com/uploadfiles/user/2021/04/06/637533443939931549.png"/>},
    { name: 'ビチャン', role: '수석 UX 디자이너', avatar: <Avatar size={64} src="https://pbs.twimg.com/media/EqU6IqSUUAA1449.jpg" /> },
    { name: 'Koloa', role: '마케팅 책임자', avatar: <Avatar size={64} icon={<UserOutlined />} /> },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#141414' }}>
      <Content style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title style={{ color: '#ffffff', textAlign: 'center' }}>About 하디아파일</Title>
          <Paragraph style={{ color: '#b3b3b3', fontSize: '18px', textAlign: 'center' }}>
            혁신적인 파일 공유 솔루션으로 세상을 연결합니다
          </Paragraph>
        </motion.div>

        <Row gutter={[32, 32]} style={{ marginTop: '50px' }}>
          <Col span={12}>
            <Card style={{ background: '#1f1f1f', borderColor: '#303030' }}>
              <Title level={3} style={{ color: '#ffffff' }}>우리의 미션</Title>
              <Paragraph style={{ color: '#b3b3b3' }}>
                하디아파일은 안전하고 효율적인 파일 공유 플랫폼을 통해 사람들의 협업과 소통을 돕습니다.
                우리는 기술 혁신을 통해 파일 공유의 새로운 패러다임을 만들어가고 있습니다.
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card style={{ background: '#1f1f1f', borderColor: '#303030' }}>
              <Title level={3} style={{ color: '#ffffff' }}>우리의 비전</Title>
              <Paragraph style={{ color: '#b3b3b3' }}>
                글로벌 1위 파일 공유 플랫폼으로 성장하여, 언제 어디서나 누구나 쉽고 안전하게 
                파일을 공유하고 협업할 수 있는 세상을 만들어가겠습니다. 언제나 함께 해주실 거죠?
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <Divider style={{ borderColor: '#303030', margin: '50px 0' }} />

        <Title level={2} style={{ color: '#ffffff', textAlign: 'center', marginBottom: '30px' }}>회사 연혁</Title>
        <Timeline mode="alternate" style={{ color: '#ffffff' }}>
          {companyHistory.map((item, index) => (
            <Timeline.Item key={index} color="#1890ff">
              <Card style={{ background: '#1f1f1f', borderColor: '#303030' }}>
                <Statistic title={<Text style={{ color: '#b3b3b3' }}>{item.year}</Text>} value={item.event} valueStyle={{ color: '#ffffff' }} />
              </Card>
            </Timeline.Item>
          ))}
        </Timeline>

        <Divider style={{ borderColor: '#303030', margin: '50px 0' }} />

        <Title level={2} style={{ color: '#ffffff', textAlign: 'center', marginBottom: '30px' }}>핵심 가치</Title>
        <Row gutter={[16, 16]}>
          {coreValues.map((value, index) => (
            <Col span={6} key={index}>
              <Card style={{ background: '#1f1f1f', borderColor: '#303030', textAlign: 'center' }}>
                {React.cloneElement(value.icon, { style: { fontSize: '36px', color: '#1890ff' } })}
                <Title level={4} style={{ color: '#ffffff', marginTop: '16px' }}>{value.title}</Title>
                <Paragraph style={{ color: '#b3b3b3' }}>{value.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        <Divider style={{ borderColor: '#303030', margin: '50px 0' }} />

        <Title level={2} style={{ color: '#ffffff', textAlign: 'center', marginBottom: '30px' }}>리더십 팀</Title>
        <Row gutter={[16, 16]}>
          {teamMembers.map((member, index) => (
            <Col span={6} key={index}>
              <Card style={{ background: '#1f1f1f', borderColor: '#303030', textAlign: 'center' }}>
                {member.avatar}
                <Title level={4} style={{ color: '#ffffff', marginTop: '16px' }}>{member.name}</Title>
                <Paragraph style={{ color: '#b3b3b3' }}>{member.role}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        <Divider style={{ borderColor: '#303030', margin: '50px 0' }} />

        <Row justify="center">
          <Col span={16}>
            <Card style={{ background: '#1f1f1f', borderColor: '#303030', textAlign: 'center' }}>
              <Title level={3} style={{ color: '#ffffff' }}>함께 성장하는 하디아파일</Title>
              <Paragraph style={{ color: '#b3b3b3' }}>
                우리는 항상 새로운 도전을 환영합니다. 하디아파일과 함께 파일 공유의 미래를 만들어갈
                열정적인 인재를 찾고 있습니다. 우리의 여정에 동참하고 싶다면 언제든 연락주세요.
              </Paragraph>
              <Link to="/careers" target="_blank">  {/* '/career' 경로로 이동하는 Link 컴포넌트 */}
                <Button type="primary" size="large" style={{ marginTop: '20px' }}>
                  채용 정보 보기
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AboutUsPage;