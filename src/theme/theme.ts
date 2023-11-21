import { Lexend } from 'next/font/google';

const lexend = Lexend({
  subsets: ['latin'],
  weight: '400'
});

const theme = {
  color: {
    primary: '#3f2547',
    gray: '#7a7a7a',
    white: '#fff',
    textBase: 'rgba(36, 19, 43, 0.88)',
    textDescription: 'rgba(36, 19, 43, 0.45)'
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
  chartColors: ['#277aff', '#ca5dd9', '#f6b033'],
  fontSize: 14,
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
