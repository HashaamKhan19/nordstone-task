import {View, StyleSheet, Text} from 'react-native';
import React, {useContext} from 'react';
import TextField from '../../../components/shared/TextField';
import BasicButton from '../../../components/shared/Button';
import dimensions from '../../../utils/dimensions';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';

import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../../context/AuthContext';
import deviceStorage from '../../../utils/deviceStorage';
import {notification} from '../../../components/notification';

import Icon from 'react-native-vector-icons/Ionicons';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);

  const {setUser} = useContext(AuthContext);

  React.useEffect(() => {
    return () => {
      setEmail('');
      setPassword('');
    };
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setEmail('');
      setPassword('');
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogin = async data => {
    setLoading(true);

    if (data.email === '' || data.password === '') {
      setLoading(false);
      notification(
        (type = 'error'),
        (title = 'Error'),
        (textBody = 'All fields are required'),
        700,
      );
      return;
    }

    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(dataa => {
        setLoading(false);
        setUser(JSON.stringify(dataa.user));
        deviceStorage.saveItem('user', dataa.user);

        notification(
          (type = 'success'),
          (title = 'Success'),
          (textBody = 'Congrats! You are Signed In'),
          500,
        );
      })
      .catch(error => {
        setLoading(false);
        console.error(error);

        let errorMessage = 'An unknown error occurred.';
        if (error.message.includes('[auth/wrong-password]')) {
          errorMessage = 'The password is invalid';
        } else if (error.message.includes('[auth/user-not-found]')) {
          errorMessage = 'User not found';
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
        <TextField value={email} onChange={setEmail} label={'Email'} />
        <TextField
          secureTextEntry={hidePassword}
          value={password}
          onChange={setPassword}
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
        <Text
          style={styles.forgotPswd}
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          Forgot Password?
        </Text>
        <BasicButton
          text="Login"
          loading={loading}
          onPress={() => {
            handleLogin({email, password});
          }}
        />
        <Text style={styles.signUp}>
          Don't have an account?{' '}
          <Text
            style={{color: colors.primary}}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            Sign up
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

export default Login;
