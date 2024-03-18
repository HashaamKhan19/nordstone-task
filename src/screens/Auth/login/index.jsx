import {View, Text} from 'react-native';
import React from 'react';
import TextField from '../../../components/shared/TextField';
import BasicButton from '../../../components/shared/Button';

const Login = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <Text>Login</Text>
      <View>
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
          placeholder="password"
          value={password}
          onChangeText={setPassword}
        />
        <BasicButton text="Login" />
      </View>
    </View>
  );
};

export default Login;
