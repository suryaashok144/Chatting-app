import React from "react";
import { Text,View,TouchableOpacity,TextInput,StyleSheet } from "react-native";

let Setnew=({navigation}:any)=>{
    return(
        <View style={{backgroundColor:"white",flex:1}}>
        <View style={{backgroundColor:"#d2e0cc",alignItems:"center",justifyContent:"center",borderWidth:1}}>
            <Text style={{color:"#5e4e4d",fontSize:30,margin:20}}>Set New Password </Text>
        </View>
        <View style={{backgroundColor:"white",flex:1,alignItems:"center",justifyContent:"center"}}>
        <TextInput placeholderTextColor={"#57564b"} placeholder="Enter New Password" style={styles.input}></TextInput>
        <TextInput placeholderTextColor={"#57564b"} placeholder="Enter Conform Password" style={styles.input}></TextInput>
        <TouchableOpacity style={{width:250,height:35,backgroundColor:"#3285a8",borderColor:"black",borderRadius:10,justifyContent:"center",alignItems:"center",marginTop:10}}><Text style={{color:"white",fontSize:20}}>Submit</Text></TouchableOpacity> 
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
        marginVertical:10,
        fontSize:20,
        padding:3,
        color:"blue",
        fontWeight:"bold",
        borderRadius:10}})
export default Setnew ;