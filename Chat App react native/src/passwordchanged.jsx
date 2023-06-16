import React from "react";
import { View,Text,StyleSheet,TouchableOpacity  } from "react-native";

let Passchanged=({navigation}:any)=>{
  
    return(
       
     <View style={{backgroundColor:"white",flex:1,alignItems:"center",justifyContent:"center"}}>
        <View><Text style={{color:"red",fontSize:20,marginBottom:20}}>Password reset link has been sent to your mail</Text></View>
        <View><Text style={{color:"red",fontSize:20,marginBottom:20}}>Please set new Password and login</Text></View>
        <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={{width:250,height:35,backgroundColor:"#3285a8",borderColor:"black",borderRadius:10,justifyContent:"center",alignItems:"center",marginTop:20}}><Text style={{color:"white",fontSize:20}}>Go back to login page</Text></TouchableOpacity>          
    </View>
            
       

   )

};
export default Passchanged;