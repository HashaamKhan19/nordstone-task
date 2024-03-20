import {Platform, Linking} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import deviceStorage from '../../utils/deviceStorage';
import {notification} from '../../components/notification';

export const selectFromGallery = async () => {
  try {
    const androidVersion = Platform.constants.Release;
    let permissionToRequest;
    if (androidVersion >= 13) {
      permissionToRequest = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    } else {
      permissionToRequest = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    }
    const permissionResult = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : permissionToRequest,
    );

    if (permissionResult === 'granted') {
      try {
        const response = await ImageCropPicker.openPicker({
          mediaType: 'photo',
          cropping: true,
          cropperCircleOverlay: true,
          forceJpg: true,
          width: 300,
          height: 300,
        });
        if (!response.didCancel && !response.error) {
          return response;
        } else {
          return 'User cancelled Image Selection';
        }
      } catch (error) {
        return error;
      }
    } else if (
      permissionResult === 'denied' ||
      permissionResult === 'blocked'
    ) {
      const previouslyDenied = await deviceStorage.loadItem(
        'galleryPermissionDenied',
      );
      if (previouslyDenied === 'true') {
        if (Platform.OS === 'ios') {
          Linking.openURL('app-settings:');
        } else {
          Linking.openSettings();
        }
      } else {
        await deviceStorage.saveItem('galleryPermissionDenied', 'true');
      }
    }
  } catch (error) {
    return error;
  }
};

export const uploadFromCamera = async () => {
  try {
    const permissionResult = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    if (permissionResult === 'granted') {
      const response = await ImageCropPicker.openCamera({
        mediaType: 'photo',
        cropping: true,
        cropperCircleOverlay: true,
        forceJpg: true,
        width: 300,
        height: 300,
      });

      if (!response.didCancel && !response.error) {
        return response;
      } else {
        return 'Camera launch cancelled or error occurred.';
      }
    } else if (
      permissionResult === 'denied' ||
      permissionResult === 'blocked'
    ) {
      const previouslyDenied = await deviceStorage.loadItem(
        'cameraPermissionDenied',
      );
      if (previouslyDenied === 'true') {
        if (Platform.OS === 'ios') {
          Linking.openURL('app-settings:');
        } else {
          Linking.openSettings();
        }
      } else {
        await deviceStorage.saveItem('cameraPermissionDenied', 'true');
      }
    }
  } catch (error) {
    return error;
  }
};

export const uploadPicture = async (picture, onUploadComplete) => {
  const userInfoString = await deviceStorage.loadItem('user');
  if (!userInfoString) {
    return null;
  }
  const email = userInfoString?.email;
  const uploadUri =
    Platform.OS === 'ios' ? picture?.replace('file://', '') : picture;
  let ref = email + new Date().getTime();
  const task = storage().ref(ref).putFile(uploadUri);
  try {
    await task;
    task.then(() => {
      console.log('Image uploaded to the bucket!');
      notification(
        (type = 'success'),
        (title = 'Success'),
        (textBody = 'Image uploaded successfully!'),
        1000,
      );
    });
    const url = await storage().ref(ref).getDownloadURL();
    try {
      const userImagesRef = firestore().collection('UserImages');
      const querySnapshot = await userImagesRef
        .where('email', '==', email)
        .get();

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async documentSnapshot => {
          const docRef = userImagesRef.doc(documentSnapshot.id);
          await docRef.update({image: url});
          console.log('Image URL updated successfully.');
        });
      } else {
        await userImagesRef.add({
          email: email,
          image: url,
        });
        console.log('New document with image URL created successfully.');
      }
      return url;
    } catch (error) {
      console.error('Error loading picture:', error);
    }
  } catch (e) {
    console.error(e);
  }
};
