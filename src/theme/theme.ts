import { Lexend } from 'next/font/google';

const lexend = Lexend({
  subsets: ['latin'],
  weight: '400'
});

const theme = {
  color: {
    primary: '#3f2547',
    gray: '#7a7a7a'
  },
  padding: {
    xs: '4px',
    s: '8px',
    m: '12px',
    l: '24px',
    xl: '48px'
  },
  borderRadius: {
    xs: '4px',
    s: '8px',
    m: '12px',
    l: '24px'
  },
  /**
   *  AntD:
   **/
  token: {
    colorSuccess: '#0aad6a',
    colorInfo: '#3f2547',
    colorWarning: '#f6b033',
    colorError: '#f63535',
    colorTextBase: '#24132b',
    borderRadiusXS: 4,
    borderRadius: 8,
    borderRadiusLG: 24,
    colorPrimary: '#3f2547',
    colorBorder: '#dddae0',
    fontFamily: lexend.style.fontFamily,
    colorSelectedNavBar: '#F7F4F9'
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
