import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import BasicButton from '../../../components/shared/Button';
import {AuthContext} from '../../../context/AuthContext';

const Notifications = () => {
  const {logout} = useContext(AuthContext);

  return (
    <View>
      <Text>Notifications</Text>
      <BasicButton
        text={'logout'}
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
};

export default Notifications;
