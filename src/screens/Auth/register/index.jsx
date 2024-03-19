import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import TextField from '../../../components/shared/TextField';
import BasicButton from '../../../components/shared/Button';
import dimensions from '../../../utils/dimensions';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';

import auth from '@react-native-firebase/auth';
import {notification} from '../../../components/notification';

import Icon from 'react-native-vector-icons/Ionicons';

const Register = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*()-_+=])[A-Za-z0-9!@#$%^&*()-_+=]{5,}$/;

  const handleRegister = async data => {
    setLoading(true);

    if (data.email === '' || data.password === '') {
      setLoading(false);
      notification(
        (type = 'error'),
        (title = 'Error'),
        (textBody = 'All fields are required'),
        1000,
      );
      return;
    }

    if (!emailRegex.test(data.email)) {
      setLoading(false);
      notification(
        (type = 'error'),
        (title = 'Error'),
        (textBody = 'Invalid email'),
        1000,
      );
      return;
    }

    if (!passwordRegex.test(data.password)) {
      setLoading(false);
      notification(
        (type = 'error'),
        (title = 'Error'),
        (textBody =
          'Password must contain at least 8 characters, including at least 1 letter and 1 number'),
        3000,
      );
      return;
    }

    auth()
      .createUserWithEmailAndPassword(data?.email, data?.password)
      .then(() => {
        setLoading(false);

        notification(
          (type = 'success'),
          (title = 'Success'),
          (textBody = 'Congrats! Account Registered Successfully!'),
          700,
        );

        navigation.navigate('Login');
      })
      .catch(error => {
        setLoading(false);
        console.error(error.message);

        // ERROR  [auth/email-already-in-use] The email address is already in use by another account.

        let errorMessage = 'An unknown error occurred.';
        if (error.message.includes('[auth/email-already-in-use]')) {
          errorMessage = 'Email address already in use!';
        } else {
          errorMessage = error.message;
        }

        notification(
          (type = 'error'),
          (title = 'Error'),
          (textBody = errorMessage),
          700,
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.logo}>LOGO</Text>
        <TextField
          value={email}
          label={'Email'}
          onChange={email => setEmail(email)}
        />
        <TextField
          secureTextEntry={true}
          value={password}
          onChange={password => setPassword(password)}
          label={'Password'}
          icon={
            <Icon
              name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={colors.black}
            />
          }
          onIconClick={() => setHidePassword(prevState => !prevState)}
        />
        <BasicButton
          text="Sign Up"
          onPress={() => {
            handleRegister({email, password});
          }}
          loading={loading}
        />
        <Text style={styles.signUp}>
          Already have an account?{' '}
          <Text
            style={{color: colors.primary}}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Sign in
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    textAlign: 'center',
    fontSize: fonts.size.font31,
    fontFamily: 'Urbanist-Bold',
    marginBottom: dimensions.Height * 0.04,
  },
  forgotPswd: {
    color: colors.primary,
    textAlign: 'right',
    fontSize: fonts.size.font15,
    fontFamily: 'Urbanist-Medium',
  },
  signUp: {
    textAlign: 'center',
    fontSize: fonts.size.font15,
    fontFamily: 'Urbanist-Medium',
    marginTop: dimensions.Height * 0.02,
  },
  formContainer: {
    gap: dimensions.Height * 0.01,
  },
});

export default Register;
