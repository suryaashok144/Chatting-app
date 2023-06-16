import React,{useState,useEffect} from "react";
import {Text,View,TouchableOpacity,TextInput,StyleSheet,Alert} from "react-native";
import auth from "@react-native-firebase/auth"
import { firebase } from "@react-native-firebase/firestore";


let Recovery=({navigation}:any)=>{
        let [email,setemail]=useState("");
        let[error1,seterror1]=useState("");
    let setnewpass=()=>{
        if(email!=""){
     auth().sendPasswordResetEmail(email)
         .then(()=>{Alert.alert("mail has been sent to your mail")
        navigation.navigate("PasswordRecovery")}).catch((error)=>{
          
          if(error.code=="auth/invalid-email"){
            seterror1("Please Enter Valid Mail");
          }
          if(error.code=="auth/user-not-found"){
            seterror1("User Not Found")
          }
            const erorcode=error.code;
            const erormsg=error.message;
            console.log(erorcode,"123456",erormsg,"12345")
        });
        
    }else{
        seterror1("Please Enter Mail")
    }
}

    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     return(onIdTokenChanged(auth, (user) => {
    //         if(user) {
    //             setUser(user);
    //         } else {
    //             setUser(null);
    //         }
    //     }))
    // },[]);
    
return(
    <View style={{backgroundColor:"white",flex:1}}>
    <View style={{backgroundColor:"white",flex:1,alignItems:"center",justifyContent:"center"}}>
    <TextInput value={email} onChangeText={text=>setemail(text)} placeholderTextColor={"#57564b"} placeholder="Enter Email " style={styles.input}></TextInput>
    <View><Text style={{color:"red",fontSize:20,marginBottom:20}}>{error1}</Text></View>
    <TouchableOpacity onPress={()=>setnewpass()} style={{width:250,height:35,backgroundColor:"#3285a8",borderColor:"black",borderRadius:10,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontSize:20}}>Submit</Text></TouchableOpacity> 
    <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={{width:250,height:35,backgroundColor:"#3285a8",borderColor:"black",borderRadius:10,justifyContent:"center",alignItems:"center",marginTop:20}}><Text style={{color:"white",fontSize:20}}>Cancel</Text></TouchableOpacity>          
    </View>
    </View>
   
)
}
let styles=StyleSheet.create({
    input:{
        backgroundColor:"#f0efe9",
        borderColor:"black",
        borderWidth:2,
        width:250,
        height:30,
        marginVertical:20,
        fontSize:20,
        padding:3,
        color:"blue",
        fontWeight:"bold",
        borderRadius:10}})

export default Recovery;


// let setnewpass=()=>{
//   const functions = require('firebase-functions');
//   const fetch = require('node-fetch');
//   const admin = require('firebase-admin');
  
//   const apikey = functions.config().project.apikey;
//   const exchangeCustomTokenEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apikey}`;
//   const sendEmailVerificationEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apikey}`;
  
//   module.exports = functions.auth.user().onCreate(async (user) => {
//     if (!user.emailVerified) {
//       try {
//         const customToken = await admin.auth().createCustomToken(user.uid);
  
//         const { idToken } = await fetch(exchangeCustomTokenEndpoint, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             token: customToken,
//             returnSecureToken: true,
//           }),
//         }).then((res) => res.json());
  
//         const response = await fetch(sendEmailVerificationEndpoint, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             requestType: 'VERIFY_EMAIL',
//             idToken: idToken,
//           }),
//         }).then((res) => res.json());
  
//         // eslint-disable-next-line no-console
//         console.log(`Sent email verification to ${response.email}`);
//       } catch (error) {
//         // eslint-disable-next-line no-console
//         console.log(error);
//       }
//     }
//   });