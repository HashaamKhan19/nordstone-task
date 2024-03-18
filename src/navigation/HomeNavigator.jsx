import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//ICONS

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
              <View style={focused ? styles.activeStyle : styles.inactiveStyle}>
                {/* <HomeIcon
                  fill={focused ? colors.blue1 : colors.gray}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                /> */}
                <Text style={focused ? styles.activeText : styles.inactiveText}>
                  Notifications
                </Text>
              </View>
            );
          }
          if (route.name === 'PicUpload') {
            return (
              <View style={focused ? styles.activeStyle : styles.inactiveStyle}>
                {/* <RewardsIcon
                  fill={focused ? colors.primary : colors.gray}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                /> */}
                <Text style={focused ? styles.activeText : styles.inactiveText}>
                  Picture Upload
                </Text>
              </View>
            );
          }
          if (route.name === 'TextUpload') {
            return (
              <View style={focused ? styles.activeStyle : styles.inactiveStyle}>
                {/* <SettingsIcon
                  fill={focused ? Colors.blue1 : Colors.gray}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                /> */}
                <Text style={focused ? styles.activeText : styles.inactiveText}>
                  Text Upload
                </Text>
              </View>
            );
          }
          if (route.name === 'Calculator') {
            return (
              <View style={focused ? styles.activeStyle : styles.inactiveStyle}>
                {/* <ResponseIcon
                  fill={focused ? Colors.blue1 : Colors.gray}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                /> */}
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
  },
  inactiveStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeText: {
    color: colors.blue1,
    fontSize: 10,
    fontFamily: fonts.family.Inter,
    fontWeight: fonts.weight.semi,
    marginTop: -10,
  },
  inactiveText: {
    color: colors.gray,
    fontSize: 10,
    fontFamily: fonts.family.Inter,
    fontWeight: fonts.weight.semi,
    marginTop: -10,
  },
});
