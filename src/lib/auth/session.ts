import { SessionOptions } from 'iron-session';

export interface SessionData {
  token: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  token: '',
  isLoggedIn: false
};

export const sessionOptions: SessionOptions = {
  password:
    'yJUZsaQv0U216ZDDkBVMFyT0boEN6f0z1NLoWrFqLEAF8GRRxq4u4s4v34P5kaWeorMcYc8b6onXbFc2vB7Dyzz8MVjCUaM6cFxf',
  cookieName: 'parloaToken',
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: true
  }
};

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
