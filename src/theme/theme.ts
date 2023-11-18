import { Lexend } from 'next/font/google';

const lexend = Lexend({
  subsets: ['latin'],
  weight: '400'
});

const theme = {
  token: {
    colorSuccess: '#0aad6a',
    colorInfo: '#3f2547',
    colorWarning: '#f6b033',
    colorError: '#f63535',
    colorTextBase: '#24132b',
    borderRadius: 8,
    borderRadiusXS: 8,
    borderRadiusLG: 12,
    colorPrimary: '#3f2547',
    colorBorder: '#dddae0',
    fontFamily: lexend.style.fontFamily
  },
  components: {
    Alert: {
      colorInfo: 'rgb(202, 93, 217)',
      colorInfoBg: 'rgb(251, 234, 255)',
      colorInfoBorder: 'rgb(234, 177, 249)'
    },
    Tag: {
      borderRadiusSM: 24
    }
  }
};

export default theme;
