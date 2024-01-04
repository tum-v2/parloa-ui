'use client';
import React from 'react';
import Image from 'next/image';
import theme from '@/theme/theme';
import { InputField } from '@/components/generic/InputField';
// import Button from '@/components/generic/Button';
import { Button, Form } from 'antd';
import { useRouter } from 'next/navigation';
import useLogin from '@/hooks/useLogin';
import { LoginAccessCode } from '@/api/auth';
import { Auth } from '@/api/schemas/auth';
import secureLocalStorage from 'react-secure-storage';

const Login = () => {
  const router = useRouter();

  const loginMutation = useLogin();
  const [form] = Form.useForm<{ accessCode: string }>();

  const onInvalidAccessCode = () => {
    form.setFields([
      {
        name: 'accessCode',
        errors: ['Invalid access code.']
      }
    ]);
  };

  const onLogin = () => {
    const loginAccessCode: LoginAccessCode = form.getFieldsValue();
    loginMutation.mutate(loginAccessCode, {
      onSuccess: (res: Auth) => {
        if (res.succes) {
          router.push('/dashboard');
          secureLocalStorage.setItem('token', res.token);
        } else {
          onInvalidAccessCode();
        }
      },
      onError: () => {
        onInvalidAccessCode();
      }
    });
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
        src="/login-background.png"
        alt="background"
        priority={false}
        layout="fill"
        objectFit="cover"
        // objectPosition="center"
      />
      <div style={accessCodeContainerStyle}>
        <Image
          style={logoStyle}
          src="/parloa-logo.png"
          alt="logo"
          width={50}
          height={50}
          priority={false}
        />
        <div style={accessCodeInputStyle}>
          <Form form={form} layout="vertical" onFinish={onLogin}>
            <Form.Item
              label="Access Code"
              name="accessCode"
              required={false}
              rules={[
                { required: true, message: 'Please input your access code.' }
              ]}
            >
              <InputField type="password" />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ boxShadow: 'none' }}
                type="primary"
                htmlType="submit"
                block
                loading={loginMutation.isPending}
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
