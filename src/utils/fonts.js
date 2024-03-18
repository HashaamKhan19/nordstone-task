import metrics from './metrics';

const size = {
  font11: metrics.screenHeight * (11 / metrics.screenHeight),
  font12: metrics.screenHeight * (12 / metrics.screenHeight),
  font13: metrics.screenHeight * (13 / metrics.screenHeight),
  font14: metrics.screenHeight * (14 / metrics.screenHeight),
  font15: metrics.screenHeight * (15 / metrics.screenHeight),
  font16: metrics.screenHeight * (16 / metrics.screenHeight),
  font17: metrics.screenHeight * (17 / metrics.screenHeight),
  font18: metrics.screenHeight * (18 / metrics.screenHeight),
  font20: metrics.screenHeight * (20 / metrics.screenHeight),
  font31: metrics.screenHeight * (31 / metrics.screenHeight),
  font23: metrics.screenHeight * (23 / metrics.screenHeight),
};

const weight = {
  full: '900',
  semi: '600',
  low: '400',
  bold: 'bold',
  normal: 'normal',
};

const family = {
  Mont: 'Montserrat-Regular',
  Inter: 'Inter-Regular',
  IBM: 'IBMPlexSansDevanagari-Regular',
};

export default {
  size,
  weight,
  family,
};
