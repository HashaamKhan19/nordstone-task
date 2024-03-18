import React, {useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import colors from '../utils/colors';
import {AuthContext} from '../context/AuthContext';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';

function RootNavigator() {
  const {isLoading, token} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token == null ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default RootNavigator;
