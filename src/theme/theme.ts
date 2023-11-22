import { Lexend } from 'next/font/google';

const lexend = Lexend({
  subsets: ['latin'],
  weight: '400'
});

const theme = {
  color: {
    primary: '#3f2547',
    lightPrimary: '#F7F4F9',
    gray: '#7a7a7a',
    white: '#fff',
    blue: '#277aff',
    pink: '#ca5dd9',
    orange: '#f6b033',
    ligthGray: 'rgba(36, 19, 43, 0.45)'
  },
  padding: {
    xs: 4,
    s: 8,
    m: 12,
    l: 24,
    xl: 48
  },
  borderRadius: {
    xs: 4,
    s: 8,
    m: 12,
    l: 24
  },
  fontSize: 14,
  strokeWidth: {
    xs: 0.5,
    s: 1,
    m: 3,
    l: 6
  },
  /**
   *  AntD:
   **/
  token: {
    colorSuccess: '#0aad6a',
    colorInfo: '#ca5dd9',
    colorWarning: '#f6b033',
    colorError: '#f63535',
    colorTextBase: '#24132b',
    borderRadiusXS: 4,
    borderRadius: 8,
    borderRadiusLG: 24,
    colorPrimary: '#3f2547',
    colorBorder: '#dddae0',
    fontFamily: lexend.style.fontFamily
  },
  components: {
    Alert: {
      colorInfo: 'rgb(202, 93, 217)',
      colorInfoBg: 'rgb(251, 234, 255)',
      colorInfoBorder: 'rgb(234, 177, 249)'
    }
  }
};

export default theme;
