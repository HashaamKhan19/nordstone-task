import React, {useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import colors from '../utils/colors';
import {AuthContext} from '../context/AuthContext';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';

import {AlertNotificationRoot} from 'react-native-alert-notification';
import {IColors} from '../utils/IColors';

function RootNavigator() {
  const {isLoading, user} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AlertNotificationRoot theme="light" colors={[IColors]}>
        {user != null ? <HomeNavigator /> : <AuthNavigator />}
      </AlertNotificationRoot>
    </NavigationContainer>
  );
}

export default RootNavigator;
