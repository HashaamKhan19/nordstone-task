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

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const {setUser} = useContext(AuthContext);

  const handleLogin = async data => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(dataa => {
        setLoading(false);
        setUser(JSON.stringify(dataa.user));
        deviceStorage.saveItem('uid', JSON.stringify(dataa.user.uid));
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.logo}>LOGO</Text>
        <TextField value={email} onChange={setEmail} label={'Email'} />
        <TextField
          secureTextEntry={true}
          value={password}
          onChange={setPassword}
          label={'Password'}
        />
        <Text style={styles.forgotPswd}>Forgot Password?</Text>
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
