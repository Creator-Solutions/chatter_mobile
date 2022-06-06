import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../Styling/RegisterStyle';

const SignUp = ({navigation}) => {
  const [error, setError] = useState('');
  const [fullname, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [conPass, setConfirmPass] = useState('');

  let Register = () => {
    
    if (!fullname || !email || !pass || !conPass){
        setError('Please fill in all fields');
    }else {
        if (conPass.match(pass)){

            let api = "http://192.168.0.119/chatter_mobile/src/server/Auth/Authenticate.php";

            let header = {
                'Content-Type':'application/json'
              };

            let data = {
                FullName: fullname,
                Email: email,
                Password: pass,
                Type:'Register',
            };

            fetch(api, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(data)
            })
            .then((response) => {
                if (response) return response.json();
                else {
                    setError('Could not send request');
                    return {};
                }
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                setError(err.message);
            });
        }
    }

  };

  return (
    <View style={styles.parent}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.errView}>
        <Text style={styles.err}>{error}</Text>
      </View>

      <View style={styles.input}>
        <TextInput 
        placeholder="Full Name" 
        style={styles.txtFullName} 
        value={fullname}
        onChangeText={(e) => setName(e)}
        />
        <TextInput placeholder="Email" 
        style={styles.txtEmail} 
        value={email}
        onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          placeholder="Password"
          style={styles.txtPass}
          secureTextEntry={true}
          value={pass}
          onChangeText={(e) => setPass(e)}
        />
        <TextInput
          placeholder="Confirm Pass"
          style={styles.txtPass}
          secureTextEntry={true}
          value={conPass}
          onChangeText={(e) => setConfirmPass(e)}
        />
      </View>

      <View style={styles.modal}>
        <TouchableOpacity
          onPress={() => Register()}
          style={styles.btnLogin}>
          <Text style={styles.btnCaption}>Register</Text>
        </TouchableOpacity>

        <View style={styles.acc}>
          <Text style={styles.acc_txt}>Already have an account?</Text>
          <Text style={styles.reg} onPress={() => navigation.navigate('Login')}>
            Sign In
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
