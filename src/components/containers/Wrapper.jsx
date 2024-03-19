import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import colors from '../../utils/colors';
import dimensions from '../../utils/dimensions';

const Wrapper = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      {children}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: dimensions.Width * 0.05,
  },
});

export default Wrapper;
