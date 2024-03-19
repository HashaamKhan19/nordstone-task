import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import deviceStorage from '../../utils/deviceStorage';
import notifee from '@notifee/react-native';

export const getDeviceInformation = async () => {
  try {
    let fcmToken = await deviceStorage.loadItem('FCMToken');
    if (!fcmToken) {
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
          await messaging().registerDeviceForRemoteMessages();
        } else {
          throw new Error('User has declined permissions');
        }
      }

      fcmToken = await messaging().getToken();

      if (fcmToken) {
        await deviceStorage.saveItem('FCMToken', fcmToken);
      }
    }
    await deviceStorage
      .saveItem('fcmToken', JSON.stringify(fcmToken))
      .then(() => {
        console.log('fcm token', fcmToken);
      });
  } catch (error) {
    console.error('Device information retrieval error:', error);
    throw error;
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

export const getToken = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('Token:', token);
  } catch (error) {
    console.error('Token retrieval error:', error);
    throw error;
  }
};

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export async function onDisplayNotification() {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Hello 👋',
    body: 'How are you? 😊',
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  });
}
