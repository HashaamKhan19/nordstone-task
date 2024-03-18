import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import TextField from '../../../components/shared/TextField';
import BasicButton from '../../../components/shared/Button';
import dimensions from '../../../utils/dimensions';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';

import auth from '@react-native-firebase/auth';

const Register = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async data => {
    let info = {email: data.email, password: data.password};
    console.log('ifo', info);
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        setLoading(false);
        console.log('User account created & signed in!');
        navigation.navigate('Login');
      })
      .catch(error => {
        setLoading(false);
        console.error(error.message);
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
        />
        <BasicButton
          text="Sign Up"
          onPress={() => {
            handleLogin({email, password});
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
