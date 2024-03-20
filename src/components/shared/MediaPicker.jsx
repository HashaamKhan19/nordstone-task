import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import ModalContainer from '../../components/containers/ModalContainer';

import dimensions from '../../utils/dimensions';
import colors from '../../utils/colors';

import Icon from 'react-native-vector-icons/Entypo';
import BasicButton from './Button';

import {
  selectFromGallery,
  uploadFromCamera,
} from '../../services/firebase/pictureUpload';

export default MediaPicker = props => {
  const {Visible, setModalVisible, setImageUrl, setImageSelected} = props;

  const handleGallery = () => {
    setModalVisible(false);
    selectFromGallery().then(image => {
      image.path && setImageUrl(image.path);
      image.path && setImageSelected(true);
    });
  };

  const handlePicture = () => {
    setModalVisible(false);
    uploadFromCamera().then(image => {
      image.path && setImageUrl(image.path);
      image.path && setImageSelected(true);
    });
  };

  return (
    <ModalContainer
      isModalVisible={Visible}
      setModalVisible={setModalVisible}
      height={dimensions.Height * 0.25}
      width={dimensions.Width * 0.85}
      backDropColor="black"
      backDropOpacity={0.4}
      radius={8}
      bgColor="white"
      padding={dimensions.Width * 0.05}>
      <View style={styles.container}>
        <View style={styles.btnCont}>
          <BasicButton
            text={'From Gallery'}
            width={dimensions.Width * 0.6}
            outlined
            onPress={handleGallery}
          />
          <BasicButton
            text={'Take Picture'}
            width={dimensions.Width * 0.6}
            outlined
            onPress={handlePicture}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(false);
        }}
        style={{
          position: 'absolute',
          top: dimensions.Height * 0.015,
          right: dimensions.Width * 0.035,
        }}>
        <Icon
          name="cross"
          size={dimensions.Width * 0.05}
          color={colors.black}
        />
      </TouchableOpacity>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: dimensions.Width * 0.03,
  },
});
