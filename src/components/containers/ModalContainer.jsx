import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Modal from 'react-native-modal';

import dimensions from '../../utils/dimensions';

const Height = Dimensions.get('screen').height;

const ModalContainer = props => {
  const {
    isModalVisible,
    setModalVisible,
    type,
    height,
    width,
    backDropColor,
    backDropOpacity,
    bgColor,
    back = true,
    padding,
    radius = 15,
  } = props;
  return (
    <Modal
      deviceHeight={Height}
      backdropColor={backDropColor ? backDropColor : 'black'}
      backdropOpacity={backDropOpacity ? backDropOpacity : 0.9}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={400}
      isVisible={isModalVisible}
      style={[styles().container, type == 'bottom' ? styles().bottom : {}]}
      onBackdropPress={
        back
          ? () => {
              setModalVisible(false);
            }
          : null
      }>
      <View
        style={[
          styles(bgColor, height, width, padding).modal,
          type == 'bottom'
            ? {borderTopLeftRadius: 30, borderTopRightRadius: 30}
            : {borderRadius: radius},
        ]}>
        {props.children}
      </View>
    </Modal>
  );
};

const styles = (bgColor, height, width, padding) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      paddingVertical: padding ? padding : dimensions.Height / 15,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: bgColor ? bgColor : 'white',
      height: height ? height : 600,
      width: width ? width : dimensions.Width,
    },
    bottom: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  });
export default ModalContainer;
