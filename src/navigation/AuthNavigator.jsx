import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Auth/login';
import Register from '../screens/Auth/register';
import ForgotPassword from '../screens/Auth/forgotPassword';

const rootStack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <rootStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        contentStyle: {backgroundColor: 'white'},
      }}>
      <rootStack.Screen name="Login" component={Login} />
      <rootStack.Screen name="Register" component={Register} />
      <rootStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </rootStack.Navigator>
  );
}

export default AuthNavigator;
