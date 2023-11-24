'use client';
import React from 'react';
import background from './components/background.png';
import logo from '@/components/parloa-logo.png';
import Image from 'next/image';
import theme from '@/theme/theme';
import { InputField } from '@/components/generic/InputField';
import Button from '@/components/generic/Button';

const Login = () => {
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
    width: '50%',
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
          <InputField type="password" placeholder="Access Code" />
          <Button
            onClick={() => {
              console.log('login');
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
