import firestore from '@react-native-firebase/firestore';
import deviceStorage from '../../utils/deviceStorage';
import {notification} from '../../components/notification';

export const uploadText = async text => {
  try {
    const userInfoString = await deviceStorage.loadItem('user');
    if (!userInfoString) {
      return null;
    }

    const email = userInfoString?.email;
    firestore()
      .collection('Text')
      .add({
        email: email,
        text: text,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('Text Stored');
        notification(
          (type = 'success'),
          (title = 'Text Uploaded'),
          (textBody = 'Your text has been uploaded successfully!'),
          1000,
        );
      })
      .catch(error => {
        console.log('Error adding document: ', error);
        notification(
          (type = 'error'),
          (title = 'Error'),
          (textBody = 'Error while uploading text'),
          1000,
        );
      });
  } catch (err) {
    console.log(err);
  }
};
