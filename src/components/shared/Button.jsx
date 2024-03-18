import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';

import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import dimensions from '../../utils/dimensions';

const BasicButton = ({
  text,
  onPress,
  color,
  alignEnd = false,
  outlined = false,
}) => {
  return (
    <View style={styles(null, alignEnd).button}>
      <TouchableOpacity
        style={styles(color, null, outlined).btn}
        onPress={onPress}>
        <Text style={styles(null, null, outlined).buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasicButton;

const styles = (color, alignEnd, outlined) =>
  StyleSheet.create({
    button: {
      flex: alignEnd ? 1 : null,
      marginTop: alignEnd ? null : dimensions.Height * 0.03,
      alignItems: alignEnd ? 'center' : null,
      justifyContent: alignEnd ? 'flex-end' : null,
      marginBottom: alignEnd ? dimensions.Height * 0.03 : null,
    },
    btn: {
      width: dimensions.Width * 0.9,
      height: dimensions.Height * 0.06,
      backgroundColor: outlined
        ? colors.background
        : color
        ? color
        : colors.primary,
      borderWidth: outlined ? 1 : 0,
      borderColor: outlined ? colors.blue1 : null,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontFamily: fonts.family.Inter,
      fontSize: fonts.size.font14,
      fontWeight: fonts.weight.bold,
      color: outlined ? colors.primary : colors.background,
    },
  });
