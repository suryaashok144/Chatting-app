import React,{useEffect, useState} from "react";
import { Text,TextInput,StyleSheet,TouchableOpacity,View,Alert} from "react-native";
import { firebase } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"
import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import firestore from "@react-native-firebase/firestore"

let Sign=({navigation}:any)=>{
    let [email,setemail]=useState("");
    let [name,setname]=useState("");
    let [Password,setpassword]=useState("");
    let [phone,setphone]=useState("");
    
    let[errormsg,seterrormsg]=useState("");

    let[errormsg1,seterrormsg1]=useState("");
    let[errormsg2,seterrormsg2]=useState("");
    let[errormsg3,seterrormsg3]=useState("");
    let[errormsg4,seterrormsg4]=useState("");
    let[errormsg6,seterrormsg6]=useState("");


    let createnew=async()=>{
            //seterrormsg("")
        if(Password==""||email==""||phone==""||name==""){
            seterrormsg("Please Fill All Details")
        }else{
             let usercheck=name.match(/^[A-Z][a-z]+/)
            //console.log(usercheck)
            let passcheck=Password.match( /^[a-zA-Z0-9!@#$%^&*]{6,16}$/)
            //console.log(passcheck)
           let emlcheck=email.match(/[A-Za-z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}/)
           //console.log(emlcheck)
           let mobcheck=phone.match(/[9876][0-9]{9}/)
           
           
          
           if(usercheck==null){seterrormsg1("Name must be contains one capital letter and alphabets only")}
           else if(mobcheck==null){
            seterrormsg2("Please Enter Valid Number")
        }
           else if(emlcheck==null){
            seterrormsg3("Please Valid Email")
            }            
           else if(passcheck==null){
                    seterrormsg4("password should contain atleast one number ")
                    seterrormsg6(" and one special character")
                }
            
                      
            else{
            auth()
              .createUserWithEmailAndPassword(email, Password)
              .then(()=>{firebase.auth().currentUser?.sendEmailVerification({
                    handleCodeInApp:true,
                 url:"http://loginpage2-ca854.firebaseapp.com"

                 
                  })
                 }).then(()=>{
                  //Alert.alert("email verification sent") ;
                navigation.navigate("NewAccount Created")})
              .catch(error => {if(error.code=="auth/email-already-in-use"){
                seterrormsg3("The email address is allready in use");
                
                
            }})
              .then (()=>{
                
                    firebase.firestore().collection("users")
                      .doc(firebase.auth().currentUser?.uid)
                        .set({
                            name,
                            phone,
                            email,
                            Password,
                        })
                   
                      }).catch((error)=>{Alert.alert(error.message)})          
                    }           
          }}
       
    return( <View style={{backgroundColor:"white",flex:1}}>
        
    <View style={{backgroundColor:"white",flex:1,alignItems:"center",justifyContent:"center"}}>
    <View><Text style={{color:"red",marginBottom:20,fontSize:20}}>{errormsg}</Text></View>
    <TextInput value={name} onChangeText={(text)=>{setname(text)
        seterrormsg("")}} placeholderTextColor={"#57564b"} placeholder="Enter Name" style={styles.input}></TextInput>
    <View><Text style={{color:"red"}}>{errormsg1}</Text></View>
    <TextInput value={phone} onChangeText={(text)=>{setphone(text);seterrormsg("")}}placeholderTextColor={"#57564b"} placeholder="Enter MobileNumber" style={styles.input}></TextInput>
    <View><Text style={{color:"red"}}>{errormsg2}</Text></View>
    <TextInput value={email} onChangeText={(text)=>{setemail(text);seterrormsg("")}}placeholderTextColor={"#57564b"} placeholder="Enter Email" style={styles.input}></TextInput>
    <View><Text style={{color:"red"}}>{errormsg3}</Text></View>
    <TextInput value={Password} onChangeText={(text)=>{setpassword(text);seterrormsg("")}} placeholderTextColor={"#57564b"} placeholder="Enter NewPassword" style={styles.input}></TextInput>
    <View><Text style={{color:"red"}}>{errormsg4}</Text></View>
    <View><Text style={{color:"red"}}>{errormsg6}</Text></View>
    
    <TouchableOpacity onPress={()=>{createnew()}} style={{width:250,height:35,backgroundColor:"#3285a8",borderColor:"black",borderRadius:10,justifyContent:"center",alignItems:"center",marginTop:10}}><Text style={{color:"white",fontSize:20}}>Submit</Text></TouchableOpacity> 
    <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={{width:250,height:35,backgroundColor:"#3285a8",borderColor:"black",borderRadius:10,justifyContent:"center",alignItems:"center",marginTop:20}}><Text style={{color:"white",fontSize:20}}>Cancel</Text></TouchableOpacity>          
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
          onPress={() =>navigation.navigate("Home")}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{color: '#5b666b', fontSize: 18}}>
            have you an account ?Please Login 
          </Text>
        </TouchableOpacity>
      </View>
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
    marginVertical:10,
    fontSize:20,
    padding:3,
    color:"blue",
    fontWeight:"bold",
    borderRadius:10}})

export default Sign;