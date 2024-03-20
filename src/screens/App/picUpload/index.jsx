import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import fonts from '../../../utils/fonts';
import dimensions from '../../../utils/dimensions';
import BasicButton from '../../../components/shared/Button';
import colors from '../../../utils/colors';
import MediaPicker from '../../../components/shared/MediaPicker';
import deviceStorage from '../../../utils/deviceStorage';

import firestore from '@react-native-firebase/firestore';
import {uploadPicture} from '../../../services/firebase/pictureUpload';

const PicUpload = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const loadPicture = async () => {
    setLoading(true);
    const userInfoString = await deviceStorage.loadItem('user');
    if (!userInfoString) {
      setLoading(false);
      return null;
    }
    firestore()
      .collection('UserImages')
      .where('email', '==', userInfoString?.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const userData = documentSnapshot.data();
          setImageUrl(userData?.image);
          setLoading(false);
        });
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
    setLoading(false);
  };

  useEffect(() => {
    loadPicture();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.body}>
          {imageUrl ? (
            <Image source={{uri: imageUrl}} style={styles.image} />
          ) : (
            <Image
              source={require(`../../../assets/images/user.png`)}
              style={styles.image}
            />
          )}

          <Text style={styles.txt}>
            Upload a picture using the camera or gallery.
          </Text>

          {imageSelected && (
            <BasicButton
              outlined
              text={'Upload Image'}
              onPress={async () => {
                await uploadPicture(imageUrl);
              }}
            />
          )}

          <BasicButton
            text={'Select Image'}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </View>
      </View>

      <MediaPicker
        Visible={modalVisible}
        setModalVisible={setModalVisible}
        setImageUrl={setImageUrl}
        setImageSelected={setImageSelected}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: fonts.size.font17,
    fontFamily: 'Urbanist-Medium',
    textAlign: 'center',
    marginTop: dimensions.Height * 0.02,
    paddingHorizontal: dimensions.Width * 0.08,
  },
  image: {
    height: dimensions.Height * 0.3,
    width: dimensions.Height * 0.3,
    borderColor: colors.gray,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: dimensions.Height * 0.02,
  },
});

export default PicUpload;
