import React, { useState, useEffect } from 'react';
import { Typography, Layout, Row, Col, Button, Card, Divider, Tag, List, Timeline, Carousel, Statistic, Progress, Tabs, Modal, Form, Input, Select, notification, Tooltip, Badge, Avatar, Rate, Collapse, Steps, message, Spin, Alert, Menu } from 'antd';
import { UserOutlined, EnvironmentOutlined, ClockCircleOutlined, TeamOutlined, MailOutlined, PhoneOutlined, GithubOutlined, LinkedinOutlined, FacebookOutlined, TwitterOutlined, LikeOutlined, DislikeOutlined, CheckCircleOutlined, LoadingOutlined, QuestionCircleOutlined, CodeOutlined, BulbOutlined, RocketOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const { Title, Paragraph, Text } = Typography;
const { Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Step } = Steps;

const RecruitmentPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const jobPostings = [
    { id: 1, title: 'Backend Developer', team: 'Server Development Team', location: 'Osaka', type: 'Full-time', skills: ['Python', 'Django', 'AWS'], description: 'Design and implement scalable backend systems utilizing the latest cloud technologies.' },
    { id: 2, title: 'Frontend Developer', team: 'Web Development Team', location: 'Osaka', type: 'Full-time', skills: ['React', 'TypeScript', 'Next.js'], description: 'Develops intuitive and responsive web applications that are user-centered.' },
    { id: 3, title: 'UX/UI Designer', team: 'Design Team', location: 'Osaka', type: 'Full-time', skills: ['Figma', 'Adobe XD', 'Sketch'], description: 'Improve user experience and design visually appealing interfaces.' },
    { id: 4, title: 'Data Engineer', team: 'Data Team', location: 'Osaka', type: 'Full-time', skills: ['Hadoop', 'Spark', 'SQL'], description: 'Build and optimize large-scale data pipelines to derive insights.' },
    { id: 5, title: 'DevOps Engineer', team: 'インフラーチーム', location: 'Osaka', type: 'Full-time', skills: ['Kubernetes', 'Docker', 'Jenkins'], description: 'Build stable and scalable infrastructure and develop automation pipelines.' },
  ];

  const companyGrowthData = [
    { year: 2019, employees: 10, revenue: 100, users: 10000 },
    { year: 2020, employees: 25, revenue: 250, users: 50000 },
    { year: 2021, employees: 50, revenue: 500, users: 200000 },
    { year: 2022, employees: 100, revenue: 1000, users: 500000 },
    { year: 2023, employees: 200, revenue: 2000, users: 1000000 },
  ];

  const techStack = [
    { name: 'React', level: 90 },
    { name: 'Python', level: 85 },
    { name: 'AWS', level: 80 },
    { name: 'Docker', level: 75 },
    { name: 'GraphQL', level: 70 },
  ];

  const employeeReviews = [
    { id: 1, name: 'Cheoljoo Kim', role: 'Backend Developer', review: 'I am very satisfied with the many innovative projects and growth opportunities', rating: 5 },
    { id: 2, name: 'Younghee Lee', role: 'UX Designer', review: 'I really like the environment where I can let my creativity run wild.', rating: 4.5 },
    { id: 3, name: 'Jisung Park', role: 'Front-end developer', review: 'I enjoy being able to learn and apply the latest technologies all the time.', rating: 4.8 },
  ];

  const recruitmentProcess = [
    { title: 'Document screening', description: 'Review resume and portfolio' },
    { title: 'Coding test', description: 'Evaluate your technical skills' },
    { title: '1st Interview', description: 'Technical interview and cultural fit assessment' },
    { title: 'Second round interview', description: 'Interview with team leaders and management' },
    { title: 'Final acceptance', description: 'Job offer and terms discussion' },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      // 지원 제출 시뮬레이션
      setTimeout(() => {
        setLoading(false);
        notification.success({
          message: '지원 완료',
          description: '성공적으로 지원되었습니다. 곧 연락 드리겠습니다.',
        });
        setIsModalVisible(false);
        form.resetFields();
      }, 2000);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    // 페이지 로드 시 애니메이션 효과
  }, []);

  return (
    <Layout style={{ background: '#141414', minHeight: '100vh' }}>
      <Layout>
        <Content style={{ padding: '0 50px', maxWidth: '1200px', margin: '0 auto', color: '#ffffff' }}>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginTop: '60px', marginBottom: '60px' }}
          >
            <Title level={1} style={{ fontSize: '48px', fontWeight: 'bold', color: '#ffffff' }}>
            Shape the future of <br /> file sharing with HadiaFile
            </Title>
            <Paragraph style={{ fontSize: '18px', marginTop: '20px', color: '#b3b3b3' }}>
            We're creating a new paradigm for file sharing with innovative technology
            </Paragraph>
            <Button type="primary" size="large" onClick={showModal}>Apply now</Button>
          </motion.section>

          <Carousel autoplay effect="fade">
            <div>
              <img src="https://crepe.land/tiptap/w/wg/wg6qr2sunrs4w8xkzd25ikscv44usqpm_%EB%B4%87%EC%B9%98.gif" alt="Office 1" style={{ width: '100%', height: 'auto', borderRadius: '15px' }} />
            </div>
          </Carousel>

          <section style={{ marginTop: '60px', marginBottom: '60px' }}>
            <Tabs defaultActiveKey="1" style={{ color: '#ffffff' }}>
              <TabPane tab="About us" key="1">
                <Row gutter={[32, 32]}>
                  <Col span={12}>
                    <Title level={2} style={{ color: '#ffffff' }}>Our values</Title>
                    <Paragraph style={{ color: '#b3b3b3' }}>
                    At HadiaFile, we stand for innovation, collaboration, and user-centered values. 
                    We believe in the power of technology and want to use it to create a better file sharing experience.
                    </Paragraph>
                  </Col>
                  <Col span={12}>
                    <Title level={2} style={{ color: '#ffffff' }}>Company growth</Title>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={companyGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <RechartsTooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="employees" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" />
                        <Line yAxisId="right" type="monotone" dataKey="users" stroke="#ffc658" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Careers" key="2">
                <Title level={2} style={{ color: '#ffffff' }}>Available positions</Title>
                <List
                  grid={{ gutter: 16, column: 2 }}
                  dataSource={jobPostings}
                  renderItem={(job) => (
                    <List.Item>
                      <Card 
                        hoverable 
                        style={{ background: '#1f1f1f', borderColor: '#303030' }}
                        actions={[
                          <Tooltip title="Apply">
                            <Button type="primary" onClick={showModal}>Apply</Button>
                          </Tooltip>,
                          <Tooltip title="Learn more">
                            <Button onClick={() => message.info(`${job.title}에 대한 상세 정보입니다.`)}>Learn more</Button>
                          </Tooltip>
                        ]}
                      >
                        <Card.Meta
                          title={<Text style={{ color: '#ffffff' }}>{job.title}</Text>}
                          description={
                            <>
                              <Paragraph style={{ color: '#b3b3b3' }}>
                                <TeamOutlined style={{ marginRight: '8px' }} /> {job.team}<br />
                                <EnvironmentOutlined style={{ marginRight: '8px' }} /> {job.location}<br />
                                <ClockCircleOutlined style={{ marginRight: '8px' }} /> {job.type}
                              </Paragraph>
                              <Paragraph style={{ color: '#b3b3b3' }}>{job.description}</Paragraph>
                              <div>
                                {job.skills.map((skill) => (
                                  <Tag color="blue" key={skill}>{skill}</Tag>
                                ))}
                              </div>
                            </>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="Tech stack" key="3">
                <Title level={2} style={{ color: '#ffffff' }}>Our tech stack</Title>
                <Divider style={{ borderColor: '#303030' }} />
                <Title level={3} style={{ color: '#ffffff' }}>Skill distribution</Title>
                <ResponsiveContainer width="100%" height={300}>
<PieChart>
<Pie
                   data={techStack}
                   dataKey="level"
                   nameKey="name"
                   cx="50%"
                   cy="50%"
                   outerRadius={100}
                   fill="#8884d8"
                   label
                 >
</Pie>
<RechartsTooltip />
<Legend />
</PieChart>
</ResponsiveContainer>
</TabPane>
<TabPane tab="Employee reviews" key="4">
<Title level={2} style={{ color: '#ffffff' }}>What employees are saying</Title>
<List
itemLayout="vertical"
dataSource={employeeReviews}
renderItem={(item) => (
<List.Item>
<Card style={{ background: '#1f1f1f', borderColor: '#303030' }}>
<Card.Meta
avatar={<Avatar icon={<UserOutlined />} />}
title={<Text style={{ color: '#ffffff' }}>{item.name} - {item.role}</Text>}
description={
<>
<Rate disabled defaultValue={item.rating} />
<Paragraph style={{ color: '#b3b3b3', marginTop: '10px' }}>{item.review}</Paragraph>
</>
}
/>
</Card>
</List.Item>
)}
/>
</TabPane>
</Tabs>
</section>
<section style={{ marginBottom: '60px', background: '#1f1f1f', padding: '40px', borderRadius: '8px' }}>
        <Title level={2} style={{ color: '#ffffff' }}>Hiring process</Title>
        <Steps current={currentStep} onChange={setCurrentStep}>
          {recruitmentProcess.map((step) => (
            <Step key={step.title} title={step.title} description={step.description} />
          ))}
        </Steps>
        <div style={{ marginTop: '20px' }}>
          <Paragraph style={{ color: '#b3b3b3' }}>
            {recruitmentProcess[currentStep].description}
          </Paragraph>
        </div>
      </section>

      <section style={{ marginBottom: '60px', background: '#1f1f1f', padding: '40px', borderRadius: '8px' }}>
        <Title level={2} style={{ color: '#ffffff' }}>FAQs</Title>
        <Collapse ghost>
          <Panel header="What are your working hours?" key="1">
            <Paragraph style={{ color: '#b3b3b3' }}>
              우리 회사는 유연근무제를 운영하고 있습니다. 코어 타임(1pm-3pm) 외에는 자유롭게 출퇴근 시간을 조절할 수 있습니다.
            </Paragraph>
          </Panel>
          <Panel header="Can I work remotely?" key="2">
            <Paragraph style={{ color: '#b3b3b3' }}>
              네, 우리는 완전 재택근무화가 모토입니다. 모든 근무작업은 온라인(ZOOM)으로 진행됩니다.
            </Paragraph>
          </Panel>
          <Panel header="Can I apply as a fresher?" key="3">
            <Paragraph style={{ color: '#b3b3b3' }}>
              물론입니다. 우리는 열정과 학습 능력을 갖춘 신입 인재를 항상 환영합니다. 주니어 개발자를 위한 멘토링 프로그램도 운영하고 있습니다.
            </Paragraph>
          </Panel>
        </Collapse>
      </section>

      <motion.section 
        style={{ textAlign: 'center', marginBottom: '60px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title level={2} style={{ color: '#ffffff' }}>Ready to grow together?</Title>
        <Paragraph style={{ fontSize: '18px', marginBottom: '30px', color: '#b3b3b3' }}>
        We're waiting for you to shape the future of file sharing with HadiaFile.
        </Paragraph>
        <Button type="primary" size="large" onClick={showModal}>Apply</Button>
      </motion.section>
    </Content>

    <Footer style={{ textAlign: 'center', background: '#1f1f1f', color: '#ffffff' }}>
      <Row justify="center" gutter={16}>
        <Col>
          <MailOutlined /> contact@hardiaafile.com
        </Col>
        <Col>
          <PhoneOutlined /> +81 (0)6-1234-5678
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col>
          <a href="#" style={{ color: '#ffffff', marginRight: '15px' }}><GithubOutlined /></a>
          <a href="#" style={{ color: '#ffffff', marginRight: '15px' }}><LinkedinOutlined /></a>
          <a href="#" style={{ color: '#ffffff', marginRight: '15px' }}><FacebookOutlined /></a>
          <a href="#" style={{ color: '#ffffff' }}><TwitterOutlined /></a>
        </Col>
      </Row>
      <Divider style={{ borderColor: '#303030' }} />
      <Text style={{ color: '#b3b3b3' }}>© 2024 HadiaFile. All rights reserved.</Text>
    </Footer>
  </Layout>

  <Modal
    title="지원하기"
    visible={isModalVisible}
    onOk={handleOk}
    onCancel={handleCancel}
    okText="제출"
    cancelText="취소"
    confirmLoading={loading}
  >
    <Form form={form} layout="vertical">
      <Form.Item name="name" label="이름" rules={[{ required: true, message: '이름을 입력해주세요' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="이메일" rules={[{ required: true, type: 'email', message: '올바른 이메일 주소를 입력해주세요' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="position" label="지원 포지션" rules={[{ required: true, message: '지원 포지션을 선택해주세요' }]}>
        <Select>
          {jobPostings.map(job => (
            <Select.Option key={job.id} value={job.title}>{job.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="experience" label="경력">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="portfolio" label="포트폴리오 링크">
        <Input />
      </Form.Item>
      <Form.Item name="message" label="자기소개">
        <Input.TextArea />
      </Form.Item>
    </Form>
  </Modal>
</Layout>
);
};
export default RecruitmentPage;
