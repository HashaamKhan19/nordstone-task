import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//ICONS
import Icon from 'react-native-vector-icons/Ionicons';

//Screens
import dimensions from '../utils/dimensions';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import Notifications from '../screens/App/notifications';
import PicUpload from '../screens/App/picUpload';
import TextUpload from '../screens/App/textUpload';
import Calculator from '../screens/App/calculator';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Notifications"
      screenOptions={({route, navigation}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: dimensions.Height / 12,
          backgroundColor: colors.background,
        },

        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Notifications') {
            return (
              <View style={styles.activeStyle}>
                <Icon
                  name="notifications"
                  size={24}
                  color={focused ? colors.primary : colors.gray}
                />
                <Text style={focused ? styles.activeText : styles.inactiveText}>
                  Notifications
                </Text>
              </View>
            );
          }
          if (route.name === 'PicUpload') {
            return (
              <View style={styles.activeStyle}>
                <Icon
                  name="camera"
                  size={24}
                  color={focused ? colors.primary : colors.gray}
                />
                <Text style={focused ? styles.activeText : styles.inactiveText}>
                  Picture Upload
                </Text>
              </View>
            );
          }
          if (route.name === 'TextUpload') {
            return (
              <View style={styles.activeStyle}>
                <Icon
                  name="document-text"
                  size={24}
                  color={focused ? colors.primary : colors.gray}
                />
                <Text style={focused ? styles.activeText : styles.inactiveText}>
                  Text Upload
                </Text>
              </View>
            );
          }
          if (route.name === 'Calculator') {
            return (
              <View style={styles.activeStyle}>
                <Icon
                  name="calculator"
                  size={24}
                  color={focused ? colors.primary : colors.gray}
                />
                <Text style={focused ? styles.activeText : styles.inactiveText}>
                  Calculator
                </Text>
              </View>
            );
          }
        },
      })}>
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="PicUpload" component={PicUpload} />
      <Tab.Screen name="TextUpload" component={TextUpload} />
      <Tab.Screen name="Calculator" component={Calculator} />
    </Tab.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({
  activeStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: dimensions.Height * 0.015,
  },
  activeText: {
    color: colors.primary,
    fontSize: fonts.size.font13,
    fontFamily: 'Urbanist-SemiBold',
    marginTop: -10,
  },
  inactiveText: {
    color: colors.gray,
    fontSize: fonts.size.font13,
    fontFamily: 'Urbanist-SemiBold',
    marginTop: -10,
  },
});
