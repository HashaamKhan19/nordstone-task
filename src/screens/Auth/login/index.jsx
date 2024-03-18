import {View, Image, StyleSheet, Text} from 'react-native';
import React from 'react';
import TextField from '../../../components/shared/TextField';
import BasicButton from '../../../components/shared/Button';
import dimensions from '../../../utils/dimensions';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';

const Login = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.formContainer}>
        <TextField
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextField
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.forgotPswd}>Forgot Password?</Text>
        <BasicButton text="Login" />
        <Text style={styles.signUp}>
          Don't have an account?{' '}
          <Text style={{color: colors.primary}}>Signup</Text>
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
    width: dimensions.Width * 0.2,
    height: dimensions.Width * 0.2,
    marginBottom: dimensions.Height * 0.04,
  },
  forgotPswd: {
    color: colors.primary,
    textAlign: 'right',
    fontSize: fonts.size.font15,
    fontWeight: fonts.weight.semi,
  },
  signUp: {
    textAlign: 'center',
    fontSize: fonts.size.font15,
    fontWeight: fonts.weight.low,
    marginTop: dimensions.Height * 0.02,
  },
  formContainer: {
    gap: dimensions.Height * 0.01,
  },
});

export default Login;
