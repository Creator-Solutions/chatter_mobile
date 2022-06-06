import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  parent: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  errView:{
    marginTop: 15,
  },  
  err:{
    alignSelf:'center',
    fontSize: 16,
    color: 'red',
  },
  title: {
    fontSize: 28,
    color: '#111',
    textAlign:'center',
    marginTop: 45,
  },

  input:{
    width: '90%',
    height: '27%',
    alignSelf:'center',
    marginTop: 55,
  },
  txtEmail:{
      width: '100%',
      height: 45,
      fontSize: 18,
      marginTop: 15,
      borderWidth: 1,
      borderColor: '#C0C0C0',
      borderRadius: 15,
      padding: 10,
  },
  txtPass:{
    width: '100%',
    height: 45,
    fontSize: 18,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 15,
    padding: 10,
  },
  passView:{
    width: '100%',
    marginTop: 10,
  },
  forgotPass:{
      position:'absolute',
      right: 0,
      color: '#111',
      fontSize: 16,
  },
  modal:{
      position: 'absolute',
      bottom: 0,
      width: '95%',
      height: '50%',
      alignSelf:'center',
  },
  btnLogin:{
      width: '50%',
      height: 40,
      backgroundColor:'#4169e1',
      borderRadius: 15,
      alignSelf:'center',
      marginTop: 15,
      justifyContent:'center',
  },
  btnCaption:{
      color: '#fff',
      fontSize: 18,
      alignSelf:'center',
  },
  no_acc:{
      width: '75%',
      alignSelf:'center',
      display: 'flex',
      flexDirection:'row',
      marginTop: 35,
  },
  acc_txt:{
    color: '#111',
    fontSize: 16,
  },
  reg:{
    color: '#4169e1',
    fontSize: 16,
    marginLeft: 10,
    textDecorationLine:'underline',
  }
});
