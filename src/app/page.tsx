'use client';

import { AuthContext } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';

const Page = () => {
  const { authState } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (authState.isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [authState.isLoggedIn, router]);
  return <></>;
};

export default Page;
