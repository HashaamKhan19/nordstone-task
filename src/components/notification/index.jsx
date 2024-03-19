import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export const notification = (type, title, text, close) => {
  return new Promise(resolve => {
    Toast.show({
      type:
        type === 'success'
          ? ALERT_TYPE?.SUCCESS
          : type === 'error'
          ? ALERT_TYPE?.DANGER
          : ALERT_TYPE?.WARNING,
      title: title,
      textBody: text,
      autoClose: 2000,
      onHide: () => {
        resolve();
        if (typeof onPress === 'function') {
          onPress();
        }
      },
    });
  });
};
