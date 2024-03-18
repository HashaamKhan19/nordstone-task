import {StyleSheet, View, SafeAreaView} from 'react-native';
import React from 'react';
import colors from '../../utils/colors';
import dimensions from '../../utils/dimensions';

const StaticContainer = ({
  children,
  backgroundColor = colors.white1,
  paddingDisable = false,
  tab = false,
  height = false,
  customHeight,
}) => {
  return (
    <SafeAreaView
      style={
        styles(backgroundColor, paddingDisable, tab, height, customHeight).root
      }>
      <View style={styles(backgroundColor, paddingDisable, tab).container}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default StaticContainer;

const styles = (backgroundColor, paddingDisable, tab, height, customHeight) =>
  StyleSheet.create({
    root: {
      width: dimensions.Width,
      height: height
        ? dimensions.Height
        : tab
        ? '100%'
        : dimensions.Height * 0.93,
      backgroundColor: backgroundColor,
    },

    container: {
      width: '100%',
      flex: 1,
      paddingHorizontal: paddingDisable ? 0 : dimensions.Width / 30,
    },
  });
