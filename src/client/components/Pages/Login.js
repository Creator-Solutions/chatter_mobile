import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import styles from '../Styling/LoginStyle';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  let Authenticate = () => {

    if (!email || !pass){
      setError('Please fill in all fields');
    }else {

      let api = "http://192.168.0.119/chatter_mobile/src/server/Auth/Authenticate.php";

      let header = {
        'Content-Type':'application/json'
      };

      let data = {
        Email: email,
        Password: pass,
        Type:'Login'
      };

      fetch(api, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
      })
      .then((response) => {
        if (response) return response.json();
        else {
          setError('Response is empty')
          return {};
        }
      })
      .then((data) => {
        switch (data[0].Message){
          case 'Authenticated':
            navigation.navigate('/dash',{
              UUID: data[0].UUID,
              Name: data[0]-Name
            });
            break;
          case 'Incorrect Password':
            setError('Invalid Password');
            break;
          case 'Account Not Found':
            setError('The account was not found');
            break;
        }
      })
      .catch((err) => {
        setError(err.message);
      });

    }

  };

  return (
    <View style={styles.parent}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.errView}>
        <Text style={styles.err}>{error}</Text>
      </View>

      <View style={styles.input}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={e => setEmail(e)}
          style={styles.txtEmail}
        />
        <TextInput
          placeholder="Password"
          value={pass}
          onChangeText={e => setPass(e)}
          style={styles.txtPass}
          secureTextEntry={true}
        />
        <View style={styles.passView}>
          <Text style={styles.forgotPass}>Forgot Password? </Text>
        </View>
      </View>

      <View style={styles.modal}>
        <TouchableOpacity
          onPress={() => Authenticate()}
          style={styles.btnLogin}>
          <Text style={styles.btnCaption}>Login</Text>
        </TouchableOpacity>

        <View style={styles.no_acc}>
          <Text style={styles.acc_txt}>Don't have an account?</Text>
          <Text
            style={styles.reg}
            onPress={() => navigation.navigate('signup')}>
            Create one here
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
