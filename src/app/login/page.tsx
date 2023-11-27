'use client';
import React from 'react';
import background from './components/background.png';
import logo from '@/components/parloa-logo.png';
import Image from 'next/image';
import theme from '@/theme/theme';
import { InputField } from '@/components/generic/InputField';
// import Button from '@/components/generic/Button';
import { Button, Form } from 'antd';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [form] = Form.useForm<{ accessCode: string }>();

  const onFinish = () => {
    // TODO: Implement Login feature
    console.log(form.getFieldsValue());
    console.log('Login success');
    router.push('/dashboard');
  };

  const onFinishFailed = () => {
    // TODO: Implement failed login feature
    console.log('Login failed');
  };

  const landingImageBackgroundStyle: React.CSSProperties = {
    zIndex: -1
  };

  const accessCodeContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.white,
    width: '35vw',
    position: 'fixed',
    right: 0,
    top: 0,
    bottom: 0
  };

  const logoStyle: React.CSSProperties = {
    marginBottom: theme.padding.l
  };

  const accessCodeInputStyle: React.CSSProperties = {
    width: '60%',
    minWidth: '200px',
    marginBottom: theme.padding.m
  };

  return (
    <div>
      <Image
        style={landingImageBackgroundStyle}
        src={background}
        alt="background"
        priority={false}
        layout="fill"
        objectFit="cover"
        // objectPosition="center"
      />
      <div style={accessCodeContainerStyle}>
        <Image
          style={logoStyle}
          src={logo}
          alt="logo"
          width={50}
          height={50}
          priority={false}
        />
        <div style={accessCodeInputStyle}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              style={{ marginBottom: theme.padding.m }}
              label="Access Code"
              name="accessCode"
            >
              <InputField type="password" />
            </Form.Item>
            <Form.Item>
              <Button
                // TODO: Change to our general button
                style={{ boxShadow: 'none' }}
                type="primary"
                htmlType="submit"
                block
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
