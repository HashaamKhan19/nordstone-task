import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';

import dimensions from '../../utils/dimensions';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';

const TextField = ({
  placeholder,
  icon,
  secureTextEntry,
  onIconClick,
  keyboardType = 'default',
  value = '',
  onChange,
  label,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={styles.input}
          keyboardType={keyboardType}
        />
        {icon && (
          <TouchableOpacity onPress={onIconClick}>{icon}</TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    marginBottom: dimensions.Height * 0.02,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: dimensions.Width * 0.9,
    height: dimensions.Height * 0.06,
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    borderWidth: 0.3,
    borderColor: colors.gray,
    paddingHorizontal: dimensions.Width * 0.05,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    color: colors.black,
  },
  error: {
    color: colors.red,
    fontSize: fonts.size.font12,
    marginTop: dimensions.Height * 0.01,
  },
  label: {
    fontSize: fonts.size.font14,
    color: colors.black,
    fontWeight: fonts.weight.semi,
    marginBottom: dimensions.Height * 0.01,
    fontFamily: 'Urbanist-SemiBold',
  },
});
