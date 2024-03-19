import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import fonts from '../../../utils/fonts';
import dimensions from '../../../utils/dimensions';
import BasicButton from '../../../components/shared/Button';
import colors from '../../../utils/colors';
import MediaPicker from '../../../components/shared/MediaPicker';

const PicUpload = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.body}>
          {imageUrl ? (
            <Image source={{uri: imageUrl}} style={styles.image} />
          ) : (
            <Image
              source={require(`../../../assets/images/user.jpg`)}
              style={styles.image}
            />
          )}

          <Text style={styles.txt}>
            Upload a picture using the camera or gallery.
          </Text>

          <BasicButton
            text={'Upload Image'}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </View>
      </View>

      <MediaPicker Visible={modalVisible} setModalVisible={setModalVisible} />
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
