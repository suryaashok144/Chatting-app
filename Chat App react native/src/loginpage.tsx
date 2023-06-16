import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import {useEffect, useState} from 'react';
import firebase  from 'firebase/app';
import auth from '@react-native-firebase/auth';

let Login = ({navigation}:any) =>{

  const [email, setEmail] = useState("");
  const [password,setPassword]= useState("");

  const[error1,seterror1]=useState("");
  const[error2,seterror2]=useState("");
  const[error3,seterror3]=useState("");
let log=()=>{
  if(email != "" && password!=""){ 
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      navigation.navigate("WELLCOME")
      Alert.alert('you are loged in');
    })
    .catch(error => {
      if (error.code === 'auth/too-many-requests') {
        seterror1('we have blocked your account temporarily');
      }
      if(error.code=="auth/wrong-password"){
        seterror3('wrong password');
      }
  
      if (error.code === 'auth/invalid-email') {
        seterror2('That email address is invalid!');
      }
      if(error.code=="auth/user-not-found"){
        seterror2('That email address is not fonud ')
      }
  
      //console.error(error);
      
    });

  }else{seterror1("Please give email and password")}}
  

  
let forget = () => {
    navigation.navigate('RECOVERY');
  };
  let newaccount = () => {
    navigation.navigate('REGISTER');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        
      <Image
        source={require('./assets/download1.png')}
        style={{width: 200, height: 100}}
      />
      <View><Text style={{color:"red",fontSize:20}}>{error1}</Text></View>
      <TextInput
        placeholderTextColor={'#57564b'}
        value={email}
        onChangeText={text=>{setEmail(text);seterror1("");seterror2("")}} 
        placeholder="Enter Email "
        style={styles.input}></TextInput>
        <View><Text style={{color:"red"}}>{error2}</Text></View>
      <TextInput
      value={password}
        placeholderTextColor={'#57564b'}
        onChangeText={text=>{setPassword(text);seterror1("");seterror3("")}}
        placeholder="Enter Password"
        style={styles.input} ></TextInput>
        <View><Text style={{color:"red"}}>{error3}</Text></View>
      <TouchableOpacity
        onPress={() => forget()}
        style={{marginLeft: 175, marginBottom: 20}}>
        <Text style={{color: 'blue'}}>Forget Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={log}
        style={{
          width: 250,
          height: 35,
          backgroundColor: '#3285a8',
          borderColor: 'black',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 20}}>Login</Text>
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 40,
          backgroundColor: '#f0efe9',
          borderTopColor: '#868c8f',
          borderTopWidth: 1,
        }}>
        <TouchableOpacity
          onPress={() => newaccount()}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{color: '#5b666b', fontSize: 18}}>
            Don't have an account ? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
let styles = StyleSheet.create({
  input: {
    backgroundColor: '#f0efe9',
    borderColor: 'black',
    borderWidth: 1,
    width: 250,
    height: 30,
    marginVertical: 20,
    fontSize: 20,
    padding: 3,
    color: 'blue',
    fontWeight: 'bold',
    borderRadius: 10,
  },
});
export default Login;
