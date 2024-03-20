import firestore from '@react-native-firebase/firestore';
import deviceStorage from '../../utils/deviceStorage';

export const uploadText = async text => {
  console.log('text inside service', text);
  try {
    console.log('inside try');
    const userInfoString = await deviceStorage.loadItem('user');
    if (!userInfoString) {
      return null;
    }
    console.log('user info in try', userInfoString);

    const email = userInfoString?.email;
    console.log('email in try', email);
    firestore()
      .collection('Text')
      .add({
        email: email,
        text: text,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('Text Stored');
      })
      .catch(error => {
        console.log('Error adding document: ', error);
      });
  } catch (err) {
    console.log(err);
  }
};
