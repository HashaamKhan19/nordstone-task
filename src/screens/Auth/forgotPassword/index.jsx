import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import TextField from '../../../components/shared/TextField';
import dimensions from '../../../utils/dimensions';
import fonts from '../../../utils/fonts';
import BasicButton from '../../../components/shared/Button';
import auth from '@react-native-firebase/auth';
import {notification} from '../../../components/notification';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../../utils/colors';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const sendResetLink = async data => {
    setLoading(true);

    if (data.email === '') {
      setLoading(false);
      notification(
        (type = 'error'),
        (title = 'Error'),
        (textBody = 'All fields are required'),
        1000,
      );
      return;
    }

    auth()
      .sendPasswordResetEmail(data.email)
      .then(() => {
        setLoading(false);
        notification(
          (type = 'success'),
          (title = 'Success'),
          (textBody = 'Reset link sent to your email!'),
          500,
        );
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1000);
      })
      .catch(error => {
        setLoading(false);
        console.error(error);

        let errorMessage = 'An unknown error occurred.';
        if (error.message.includes('[auth/user-not-found]')) {
          errorMessage = 'User not found';
        } else {
          errorMessage = error.message;
        }

        notification(
          (type = 'error'),
          (title = 'Error'),
          (textBody = errorMessage),
          500,
        );
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.back}>
        <Icon name="arrow-back" size={24} color={colors.primary} />
      </TouchableOpacity>
      <View style={styles.body}>
        <Text style={styles.txt}>
          Forgot your password? No worries, we got you! 🤗
        </Text>

        <View style={styles.form}>
          <TextField
            value={email}
            onChange={setEmail}
            label={'Email Address'}
          />
          <Text style={styles.txtInfo}>
            Enter your email address and we will send you a link to reset your
            password.
          </Text>
        </View>
      </View>
      <BasicButton
        text={'Send Reset Link'}
        onPress={() => {
          sendResetLink({email});
        }}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: dimensions.Height * 0.1,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: dimensions.Width * 0.05,
    width: dimensions.Width * 0.9,
  },
  form: {
    gap: dimensions.Width * 0.05,
  },
  txt: {
    textAlign: 'center',
    fontSize: fonts.size.font18,
    fontFamily: 'Urbanist-Bold',
    color: colors.black,
  },
  txtInfo: {
    textAlign: 'center',
    fontSize: fonts.size.font14,
    fontFamily: 'Urbanist-Medium',
    color: colors.black,
  },
  back: {
    position: 'absolute',
    top: dimensions.Height * 0.05,
    left: dimensions.Width * 0.05,
  },
});

export default ForgotPassword;
