import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../../context/AuthContext';
import colors from '../../../utils/colors';

import Icon from 'react-native-vector-icons/Ionicons';
import BasicButton from '../../../components/shared/Button';
import {onDisplayNotification} from '../../../services/firebase/notifications';
import dimensions from '../../../utils/dimensions';
import fonts from '../../../utils/fonts';

const Notifications = () => {
  const {logout} = useContext(AuthContext);

  const buttonController = () => {
    onDisplayNotification();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txt}>Hello User 👋</Text>

        <TouchableOpacity onPress={() => logout()}>
          <Icon name="power" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.btn}>
        <BasicButton
          text={'Generate Notification'}
          onPress={buttonController}
          color={colors.red}
        />
        <Text style={styles.notificationText}>
          Press the button to generate a new notification. Remember to allow the
          app to send notifications.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: dimensions.Width * 0.05,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: fonts.size.font15,
    fontFamily: 'Urbanist-Bold',
  },
  notificationText: {
    fontSize: fonts.size.font15,
    fontFamily: 'Urbanist-Medium',
    textAlign: 'center',
    marginTop: dimensions.Height * 0.02,
    paddingHorizontal: dimensions.Width * 0.08,
  },
});

export default Notifications;
